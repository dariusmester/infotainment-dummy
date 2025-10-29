// === Globale Variablen ===
let isSessionActive = false;
let strokes = [];
let currentTask = null;
let ongoing = {};
const TAP_THRESHOLD_MM = 5;
let pxPerMm = 26 / 5; // iPad: ca. 26px = 5mm, kannst du kalibrieren

const logArea = document.getElementById("logArea");
function log(msg) {
  logArea.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n` + logArea.textContent;
}

// === Session-Steuerung ===
document.getElementById("startSession").onclick = () => {
  strokes = [];
  isSessionActive = true;
  log("Session gestartet.");
};
document.getElementById("endSession").onclick = () => {
  isSessionActive = false;
  log(`Session beendet. ${strokes.length} Strokes aufgezeichnet.`);
};
document.getElementById("exportCSV").onclick = () => exportCSV();

// === Task-Auswahl ===
document.querySelectorAll(".task").forEach(tile => {
  tile.addEventListener("click", () => {
    currentTask = tile.dataset.task;
    log("Task ausgewählt: " + currentTask);
  });

  tile.addEventListener("touchstart", onTouchStart);
  tile.addEventListener("touchmove", onTouchMove);
  tile.addEventListener("touchend", onTouchEnd);
});

function onTouchStart(e) {
  if (!isSessionActive) return;
  e.preventDefault();
  const t = e.changedTouches[0];
  ongoing[t.identifier] = {
    task: currentTask || "none",
    downTime: Date.now(),
    points: [{ x: t.clientX, y: t.clientY, t: Date.now() }]
  };
}

function onTouchMove(e) {
  if (!isSessionActive) return;
  const t = e.changedTouches[0];
  const s = ongoing[t.identifier];
  if (!s) return;
  s.points.push({ x: t.clientX, y: t.clientY, t: Date.now() });
}

function onTouchEnd(e) {
  if (!isSessionActive) return;
  const t = e.changedTouches[0];
  const s = ongoing[t.identifier];
  if (!s) return;
  s.upTime = Date.now();
  const lengthPx = calcStrokeLength(s.points);
  const lengthMm = lengthPx / (pxPerMm || 5.2);
  const isTap = lengthMm <= TAP_THRESHOLD_MM;
  strokes.push({
    task: s.task,
    downTime: s.downTime,
    upTime: s.upTime,
    durationMs: s.upTime - s.downTime,
    lengthPx,
    lengthMm: isTap ? 0 : lengthMm,
    isTap
  });
  delete ongoing[t.identifier];
  log(`${s.task}: ${isTap ? "Tap" : "Strike"} (${lengthMm.toFixed(2)} mm)`);
}

function calcStrokeLength(points) {
  let sum = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    sum += Math.hypot(dx, dy);
  }
  return sum;
}

// === Export ===
function exportCSV() {
  if (strokes.length === 0) {
    alert("Keine Daten vorhanden.");
    return;
  }
  const header = ["task", "downTime", "upTime", "durationMs", "lengthPx", "lengthMm", "isTap"];
  const rows = strokes.map(s => header.map(h => s[h]).join(","));
  const blob = new Blob([header.join(",") + "\n" + rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "touch_data.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}