// ===== Task-/Subtask-Definition mit Soll-Minima (SM/TM) über expected step types =====
// expect: 'tap' | 'strike' | 'any'
const TASKS_CONFIG = {
  music: {
    title: "Musik – Songauswahl & Playback",
    steps: [
      { label: "Playlist öffnen", expect: "tap" },
      { label: "Scrollen durch Liste", expect: "strike" },
      { label: "Song auswählen", expect: "tap" },
      { label: "Play/Pause", expect: "tap" },
      { label: "Next/Prev (optional)", expect: "any" }
    ]
  },
  nav: {
    title: "Navigation – Zielsuche & Zoom",
    steps: [
      { label: "Suchfeld fokussieren", expect: "tap" },
      { label: "Vorschläge scrollen", expect: "strike" },
      { label: "Ziel auswählen", expect: "tap" },
      { label: "Karte verschieben", expect: "strike" },
      { label: "Zoom (langer Swipe als Surrogat)", expect: "strike" }
    ]
  },
  phone: {
    title: "Telefon – Kontakt auswählen & anrufen",
    steps: [
      { label: "Kontaktliste scrollen", expect: "strike" },
      { label: "Kontakt tippen", expect: "tap" },
      { label: "Anrufen", expect: "tap" },
      { label: "Abbruch (optional)", expect: "any" }
    ]
  },
  settings: {
    title: "Einstellungen – Helligkeit/Lautstärke",
    steps: [
      { label: "Slider öffnen", expect: "tap" },
      { label: "Slider bewegen", expect: "strike" },
      { label: "Feinjustage (+/–)", expect: "tap" },
      { label: "Speichern", expect: "tap" }
    ]
  },
  message: {
    title: "Nachricht – Kurztext & Senden",
    steps: [
      { label: "Textfeld fokussieren", expect: "tap" },
      { label: "Scroll im Textfeld (falls nötig)", expect: "strike" },
      { label: "Absenden", expect: "tap" }
    ]
  },
  map: {
    title: "Karte – POI wählen & verschieben",
    steps: [
      { label: "POI-Liste öffnen", expect: "tap" },
      { label: "Liste scrollen", expect: "strike" },
      { label: "POI auswählen", expect: "tap" },
      { label: "Pin verschieben", expect: "strike" }
    ]
  },
  climate: {
    title: "Klima – Temperatur & Modus",
    steps: [
      { label: "Klima öffnen", expect: "tap" },
      { label: "Temperatur +/–", expect: "tap" },
      { label: "Modus Auto/Manuell", expect: "tap" },
      { label: "Gebläse anpassen (Wisch)", expect: "strike" }
    ]
  }
};

// ===== State =====
let isSessionActive = false;
let currentTaskKey = null;
let guidedRunning = false;
let guidedStepIndex = -1;

// Gesten/Events
const ongoing = new Map(); // pointerId -> {downTime, points: [{x,y,t}], upTime}
const gestures = [];        // rohe Gesten (Tap/Strike) für CSV & Features

// Schwellen/Kalibrierung
const TAP_THRESHOLD_MM = 5; // exakt wie im Paper
let pxPerMm = Number(localStorage.getItem("pxPerMm")) || 5.2;

// ===== UI Refs =====
const pad = document.getElementById("pad");
const stepsEl = document.getElementById("steps");
const submenuTitle = document.getElementById("submenuTitle");
const taskInfo = document.getElementById("taskInfo");
const startGuidedBtn = document.getElementById("startGuided");
const finishTaskBtn = document.getElementById("finishTask");
const resetTaskBtn = document.getElementById("resetTask");
const logArea = document.getElementById("logArea");
const featuresArea = document.getElementById("featuresArea");
const pxmmInfoEl = document.getElementById("pxmmInfo");
function updatePxmmInfo(){ pxmmInfoEl.textContent = `px/mm: ${pxPerMm.toFixed(2)}`; }
updatePxmmInfo();

function log(msg){
  const time = new Date().toLocaleTimeString();
  logArea.textContent = `[${time}] ${msg}\n` + logArea.textContent;
}

// ===== Session Controls =====
document.getElementById("startSession").onclick = () => {
  gestures.length = 0;
  isSessionActive = true;
  log("Session gestartet.");
  featuresArea.textContent = "";
};
document.getElementById("endSession").onclick = () => {
  isSessionActive = false;
  log(`Session beendet. ${gestures.length} Gesten aufgezeichnet.`);
};

// ===== Task-Auswahl + Submenu Rendering =====
document.querySelectorAll(".task").forEach(tile=>{
  tile.addEventListener("click", ()=>setTask(tile.dataset.task, tile));
  tile.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); setTask(tile.dataset.task, tile); }});
});

function setTask(key, tile){
  currentTaskKey = key;
  guidedRunning = false;
  guidedStepIndex = -1;
  document.querySelectorAll(".task").forEach(t=>t.classList.remove("active"));
  tile.classList.add("active");
  const cfg = TASKS_CONFIG[key];
  submenuTitle.textContent = cfg.title;
  stepsEl.innerHTML = "";
  cfg.steps.forEach((s,i)=>{
    const div = document.createElement("div");
    div.className = "step";
    div.dataset.index = i;
    const badge = document.createElement("span");
    badge.className = "badge " + s.expect;
    badge.textContent = s.expect.toUpperCase();
    const label = document.createElement("div");
    label.textContent = s.label;
    const right = document.createElement("div");
    right.innerHTML = `<span class="muted">noch offen</span>`;
    div.append(label, badge, right);
    stepsEl.appendChild(div);
  });
  const {SM, TM} = computeSMTM(cfg.steps);
  taskInfo.textContent = `Soll-Minima: SM (Strikes) = ${SM}, TM (Taps) = ${TM}`;
  startGuidedBtn.disabled = false;
  finishTaskBtn.disabled = true;
  resetTaskBtn.disabled = false;
  log(`Task ausgewählt: ${cfg.title}`);
}

startGuidedBtn.onclick = ()=>{
  if(!currentTaskKey) return;
  guidedRunning = true;
  guidedStepIndex = 0;
  markCurrentStep();
  finishTaskBtn.disabled = false;
  log("Geführter Task gestartet.");
};
resetTaskBtn.onclick = ()=>{
  if(!currentTaskKey) return;
  setTask(currentTaskKey, document.querySelector(`.task[data-task="${currentTaskKey}"]`));
};

function markCurrentStep(){
  stepsEl.querySelectorAll(".step").forEach(el=>el.classList.remove("current"));
  const cur = stepsEl.querySelector(`.step[data-index="${guidedStepIndex}"]`);
  if(cur) cur.classList.add("current");
}

// ===== Pointer Events (nur Pad) =====
pad.addEventListener("pointerdown", e=>{
  if(!isSessionActive) return;
  pad.setPointerCapture(e.pointerId);
  const now = Date.now();
  ongoing.set(e.pointerId, { downTime: now, points: [{x:e.clientX,y:e.clientY,t:now}] });
});
pad.addEventListener("pointermove", e=>{
  const s = ongoing.get(e.pointerId);
  if(!s) return;
  s.points.push({x:e.clientX,y:e.clientY,t:Date.now()});
});
pad.addEventListener("pointerup", onUpCancel);
pad.addEventListener("pointercancel", onUpCancel);
pad.addEventListener("lostpointercapture", onUpCancel);

function onUpCancel(e){
  const s = ongoing.get(e.pointerId);
  if(!s) return;
  s.upTime = Date.now();

  const lengthPx = calcStrokeLength(s.points);
  const lengthMm = lengthPx / pxPerMm;
  const isTap = lengthMm <= TAP_THRESHOLD_MM;
  const durationMs = s.upTime - s.downTime;

  const entry = {
    task: currentTaskKey || "none",
    stepIndex: guidedRunning ? guidedStepIndex : null,
    downTime: s.downTime,
    upTime: s.upTime,
    downISO: new Date(s.downTime).toISOString(),
    upISO: new Date(s.upTime).toISOString(),
    durationMs,
    lengthPx: Math.round(lengthPx),
    lengthMm: isTap ? 0 : Number(lengthMm.toFixed(2)),
    isTap,
    type: isTap ? "tap" : "strike",
    pointsCount: s.points.length
  };
  gestures.push(entry);
  ongoing.delete(e.pointerId);

  // Guided mode: Schritt validieren/fortschalten
  if(guidedRunning && currentTaskKey != null){
    const cfg = TASKS_CONFIG[currentTaskKey];
    const step = cfg.steps[guidedStepIndex];
    const ok = (step.expect === "any") || (step.expect === entry.type);
    const stepRow = stepsEl.querySelector(`.step[data-index="${guidedStepIndex}"]`);
    if(stepRow){
      stepRow.querySelector(".muted")?.remove();
      const res = document.createElement("span");
      res.className = ok ? "ok" : "warn";
      res.textContent = ok ? "erfüllt" : `abweichend (${entry.type})`;
      stepRow.appendChild(res);
    }
    if(guidedStepIndex < cfg.steps.length - 1){
      guidedStepIndex++;
      markCurrentStep();
    } else {
      log("Alle Schritte durchlaufen – du kannst 'Task abschließen' klicken.");
    }
  }

  log(`${entry.task || "none"}: ${entry.type.toUpperCase()} – ${entry.lengthMm.toFixed(2)} mm, ${durationMs} ms`);
}

function calcStrokeLength(points){
  let sum = 0;
  for(let i=1;i<points.length;i++){
    const dx = points[i].x - points[i-1].x;
    const dy = points[i].y - points[i-1].y;
    sum += Math.hypot(dx,dy);
  }
  return sum;
}

// ===== Features F1–F10 exakt nach Paper (Shah et al. 2015) =====
// F1: Deviation strikes Sdev = SO - SM
// F2: Deviation taps    Tdev = TO - TM
// F3: Mode of strike length (mm)     (Sliding-Window über Wertebereich)
// F4: Average strike length (mm)
// F5: Mode of strike speed (m/s)     (Sliding-Window)
// F6: Average strike speed (m/s)
// F7: Mode of delay (ms)             (Sliding-Window, delays zwischen Aktionen)
// F8: Average delay (ms)
// F9: Total delay (s)
// F10: Turnaround time (s)

finishTaskBtn.onclick = ()=>{
  if(!currentTaskKey) return;
  const cfg = TASKS_CONFIG[currentTaskKey];
  const {SM, TM} = computeSMTM(cfg.steps);

  // Alle Gesten dieses Tasks in zeitlicher Reihenfolge
  const taskGestures = gestures.filter(g=>g.task===currentTaskKey).sort((a,b)=>a.downTime-b.downTime);
  if(taskGestures.length === 0){
    alert("Für diesen Task wurden noch keine Gesten aufgezeichnet.");
    return;
  }

  const strikes = taskGestures.filter(g=>g.type==="strike");
  const taps    = taskGestures.filter(g=>g.type==="tap");

  const SO = strikes.length;
  const TO = taps.length;

  // Strike-Längen (mm) & -Geschwindigkeiten (m/s)
  const strikeLengthsMm = strikes.map(g=>g.lengthMm);
  const strikeSpeedsMps = strikes.map(g=>{
    const lenM = (g.lengthPx/pxPerMm) / 1000; // mm -> m
    const tS = g.durationMs/1000;
    return tS>0 ? lenM/tS : 0;
  });

  // Delays zwischen Aktionen (ms) – zwischen up(i) und down(i+1) über alle Aktionen (Tap + Strike)
  const delaysMs = [];
  for(let i=0;i<taskGestures.length-1;i++){
    const d = taskGestures[i+1].downTime - taskGestures[i].upTime;
    delaysMs.push(Math.max(0, d));
  }

  // Turnaround
  const turnaroundS = (taskGestures.at(-1).upTime - taskGestures[0].downTime)/1000;

  // Mode-Features via Sliding-Window (wie Paper): Bereich -> Chunks -> Windows 1 .. 10% Range -> höchste Durchschnittsdichte
  const F3_modeStrikeLenMm = computeModeSlidingWindow(strikeLengthsMm, 100); // 100 Chunks
  const F4_avgStrikeLenMm  = avgOr0(strikeLengthsMm);
  const F5_modeStrikeSpeed  = computeModeSlidingWindow(strikeSpeedsMps, 100);
  const F6_avgStrikeSpeed   = avgOr0(strikeSpeedsMps);
  const F7_modeDelayMs      = computeModeSlidingWindow(delaysMs, 100);
  const F8_avgDelayMs       = delaysMs.length ? Math.round(average(delaysMs)) : 0;
  const F9_totalDelayS      = round2(sum(delaysMs)/1000);
  const F10_turnaroundS     = round2(turnaroundS);

  const F1_Sdev = SO - SM;
  const F2_Tdev = TO - TM;

  // Ausgabe in Features-Panel
  const header = "task,SO,TO,SM,TM,F1_Sdev,F2_Tdev,F3_modeStrikeLenMm,F4_avgStrikeLenMm,F5_modeStrikeSpeedMps,F6_avgStrikeSpeedMps,F7_modeDelayMs,F8_avgDelayMs,F9_totalDelayS,F10_turnaroundS";
  const row = [
    currentTaskKey, SO, TO, SM, TM,
    F1_Sdev, F2_Tdev,
    round2(F3_modeStrikeLenMm), round2(F4_avgStrikeLenMm),
    round3(F5_modeStrikeSpeed), round3(F6_avgStrikeSpeed),
    Math.round(F7_modeDelayMs), F8_avgDelayMs,
    F9_totalDelayS, F10_turnaroundS
  ].join(",");
  appendFeatures(header, row);

  log(`Task abgeschlossen: ${cfg.title}. F1–F10 berechnet.`);
  finishTaskBtn.disabled = true;
};

function computeSMTM(steps){
  let SM=0, TM=0;
  for(const s of steps){
    if(s.expect==="strike") SM++;
    if(s.expect==="tap") TM++;
  }
  return {SM, TM};
}

// Sliding-Window-"Mode" nach Paper:
// - Wertebereich r = max - min
// - in 'chunkCount' kleine Intervalle teilen
// - für Fensterbreite w = 1..ceil(0.10 * chunkCount) (entspricht 1..10% des Bereichs)
// - über alle Fenster: Durchschnitt (Summe der Werte im Fenster / Anzahl Werte im Fenster)
// - Modus = Durchschnitt des dichtesten Fensters (max. Durchschnitt)
function computeModeSlidingWindow(values, chunkCount=100){
  if(!values || values.length===0) return 0;
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = maxV - minV;
  if(range === 0) return values[0]; // alle gleich

  const bins = new Array(chunkCount).fill(0).map(()=>({sum:0,count:0}));
  // Bin-Zuordnung
  for(const v of values){
    let idx = Math.floor(((v - minV) / range) * (chunkCount - 1));
    if(idx < 0) idx = 0;
    if(idx >= chunkCount) idx = chunkCount - 1;
    bins[idx].sum += v;
    bins[idx].count += 1;
  }

  const maxWin = Math.max(1, Math.ceil(0.10 * chunkCount));
  let bestAvg = -Infinity;

  for(let w=1; w<=maxWin; w++){
    // initial window
    let wSum = 0, wCount = 0;
    for(let i=0;i<w;i++){ wSum += bins[i].sum; wCount += bins[i].count; }
    if(wCount>0) bestAvg = Math.max(bestAvg, wSum / wCount);
    // slide
    for(let start=1; start<=chunkCount - w; start++){
      wSum += bins[start + w - 1].sum - bins[start - 1].sum;
      wCount += bins[start + w - 1].count - bins[start - 1].count;
      if(wCount>0){
        const avg = wSum / wCount;
        if(avg > bestAvg) bestAvg = avg;
      }
    }
  }
  return (bestAvg === -Infinity) ? 0 : bestAvg;
}

// ===== Export CSVs =====
document.getElementById("exportCSV").onclick = ()=>{
  if(gestures.length===0){ alert("Keine Gesten-Daten."); return; }
  const header = ["task","stepIndex","downISO","upISO","durationMs","lengthPx","lengthMm","type","pointsCount"];
  const rows = gestures.map(g=>header.map(h=>formatCSV(g[h])).join(","));
  downloadCSV("touch_gestures.csv", header.join(",") + "\n" + rows.join("\n"));
};
document.getElementById("exportFeatures").onclick = ()=>{
  const text = featuresArea.textContent.trim();
  if(!text){ alert("Keine Feature-Daten."); return; }
  downloadCSV("touch_features.csv", text);
};

function appendFeatures(header, row){
  if(!featuresArea.textContent.trim()){
    featuresArea.textContent = header + "\n" + row;
  } else {
    featuresArea.textContent += "\n" + row;
  }
}

// ===== Calibration =====
const calDialog = document.getElementById("calDialog");
document.getElementById("calibrate").onclick = ()=>{
  const ruler = document.getElementById("ruler");
  const range = document.getElementById("rulerRange");
  const currPx = document.getElementById("currPx");
  const currPxPerMm = document.getElementById("currPxPerMm");
  const pxFor50 = Math.max(50, Math.min(800, Math.round(pxPerMm*50)));
  range.value = String(pxFor50);
  ruler.style.width = pxFor50 + "px";
  currPx.textContent = String(pxFor50);
  currPxPerMm.textContent = (pxFor50/50).toFixed(2);
  range.oninput = ()=>{
    const val = Number(range.value);
    ruler.style.width = val + "px";
    currPx.textContent = String(val);
    currPxPerMm.textContent = (val/50).toFixed(2);
  };
  calDialog.showModal();
  document.getElementById("saveCal").onclick = ()=>{
    const val = Number(range.value);
    pxPerMm = val/50;
    localStorage.setItem("pxPerMm", String(pxPerMm));
    updatePxmmInfo();
  };
};

// ===== Helpers =====
function average(a){ return a.reduce((s,x)=>s+x,0)/a.length; }
function avgOr0(a){ return a.length ? average(a) : 0; }
function sum(a){ return a.reduce((s,x)=>s+x,0); }
function round2(x){ return Math.round(x*100)/100; }
function round3(x){ return Math.round(x*1000)/1000; }

function formatCSV(v){ if(typeof v==="string"){ if(v.includes(",")||v.includes('"')) return `"${v.replace(/"/g,'""')}"`; } return v ?? ""; }
function downloadCSV(name, text){
  const blob = new Blob([text], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
