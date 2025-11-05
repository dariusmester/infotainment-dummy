/* ===== Konfiguration ===== */
const APPS = [
  { key:"music", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 1024 1024"><path fill="#E498E0" d="M831.5 896Q752 896 696 858.5T640 768t56-90.5T832 640q31 0 64 8V269L384 371v525q0 53-56 90.5T192 1024T56 986.5T0 896t56-90.5T192 768q31 0 64 8V192q0-26 19-45t45-19L960 0q26 0 45 18.5t19 45.5v704q0 53-56.5 90.5t-136 37.5z"/></svg>`
  , label:"Musik" },

{ key:"nav", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20"><path fill="#F04050" d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"/></svg>`
, label:"Navigation" },

{ key:"phone", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48"><path fill="#009688" d="M39.1 7h-3.7C22.2 7.2 7.1 24.1 7 35.4v3.7c0 1 .8 1.9 1.9 1.9l7.5-.1c1 0 1.9-.9 1.9-1.9l.2-8.2l-4.7-4c0-2.6 10.5-13.1 13.2-13.2l4.3 4.7l7.9-.2c1 0 1.9-.9 1.9-1.9L41 8.9c0-1.1-.8-1.9-1.9-1.9z"/></svg>`
, label:"Telefon" },

{ key:"message", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20"><path fill="#20AF60" d="M10 0c5.342 0 10 4.41 10 9.5c0 5.004-4.553 8.942-10 8.942a11.01 11.01 0 0 1-3.43-.546c-.464.45-.623.603-1.608 1.553c-.71.536-1.378.718-1.975.38c-.602-.34-.783-1.002-.66-1.874l.4-2.319C.99 14.002 0 11.842 0 9.5C0 4.41 4.657 0 10 0Zm0 1.4c-4.586 0-8.6 3.8-8.6 8.1c0 2.045.912 3.928 2.52 5.33l.02.017l.297.258l-.067.39l-.138.804l-.037.214l-.285 1.658a2.79 2.79 0 0 0-.03.337v.095c0 .005-.001.007-.002.008c.007-.01.143-.053.376-.223l2.17-2.106l.414.156a9.589 9.589 0 0 0 3.362.605c4.716 0 8.6-3.36 8.6-7.543c0-4.299-4.014-8.1-8.6-8.1ZM5.227 7.813a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998Zm4.998 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998Zm4.997 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998Z"/></svg>`
, label:"Nachricht" },

{ key:"map", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="#FFFFFF"><g fill="none" stroke="#8080FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M15.129 13.747a.906.906 0 0 1-1.258 0c-1.544-1.497-3.613-3.168-2.604-5.595A3.53 3.53 0 0 1 14.5 6c1.378 0 2.688.84 3.233 2.152c1.008 2.424-1.056 4.104-2.604 5.595M14.5 9.5h.009"/><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12M17 21L3 7m7 7l-6 6"/></g></svg>`
, label:"Karte" },

{ key:"climate", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 256 256"><path fill="#4040F0" d="m246.14 81.52l-14.72 4.79l9.1 12.52a12 12 0 1 1-19.42 14.11l-9.1-12.52l-9.1 12.52a12 12 0 1 1-19.42-14.11l9.1-12.52l-14.72-4.79a12 12 0 1 1 7.41-22.82L200 63.48V48a12 12 0 0 1 24 0v15.48l14.73-4.78a12 12 0 1 1 7.41 22.82ZM160 150.69a64 64 0 1 1-104 0V56a52 52 0 0 1 104 0ZM148 188a40 40 0 0 0-9.23-25.55a12 12 0 0 1-2.77-7.68V56a28 28 0 0 0-56 0v98.78a12 12 0 0 1-2.91 7.83A40 40 0 1 0 148 188Zm-28-20.78V120a12 12 0 0 0-24 0v47.22a24 24 0 1 0 24 0Z"/></svg>`
, label:"Klima" },

{ key:"seats", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="#89CFF0"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="#89CFF0" d="M3.468 16.745c.495-.958 1.54-1.6 2.804-1.441a33.75 33.75 0 0 1 3.97.726c2.01.502 3.771 1.467 5.073 2.348l.44.306l.4.295l.358.276l.314.254l.267.226l.22.192c.843.751.27 1.978-.685 2.068l-.112.005H7.923c-1.682 0-3.08-.845-4.104-2.126c-.774-.967-.84-2.183-.35-3.129ZM19 2c.893 0 1.278.84 1.467 1.61l.06.268l.024.128c.144.797.221 1.842.252 2.916c.06 2.125-.062 4.602-.327 5.795c-.462 2.082-1.14 3.529-1.952 4.401c-.826.89-1.942 1.291-2.971.776c-.789-.394-1.26-1.331-1.518-2.13a5.734 5.734 0 0 1 .017-3.58c.21-.632.588-1.142 1.004-1.627l.363-.411c.442-.495.885-.99 1.187-1.593c.44-.88.56-1.843.597-2.81l.014-.58l.009-.56l.006-.138l.02-.28C17.347 3.107 17.716 2 19 2Z"/></g></svg>`
, label:"Sitze" },

{ key:"car", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32"><path fill="#FEB250" d="m29.338 15.934l-7.732-2.779l-3.232-4.058A2.99 2.99 0 0 0 16.054 8H8.058a2.998 2.998 0 0 0-2.48 1.312l-2.712 3.983A4.988 4.988 0 0 0 2 16.107V24a1 1 0 0 0 1 1h2.142a3.98 3.98 0 0 0 7.716 0h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7.125a1 1 0 0 0-.662-.941ZM9 26a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2Zm14 0a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm5-3h-1.142a3.98 3.98 0 0 0-7.716 0h-6.284a3.98 3.98 0 0 0-7.716 0H4v-6.893a2.998 2.998 0 0 1 .52-1.688l2.711-3.981A1 1 0 0 1 8.058 10h7.996a.993.993 0 0 1 .764.354l3.4 4.269a1 1 0 0 0 .444.318L28 17.578Z"/></svg>`
, label:"Fahrzeug" },

{ key:"user", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="#FEB250"><g fill="none" stroke="#FEB250" stroke-width="2.5"><path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7" r="3"/></g></svg>`
, label:"Nutzer" },

{ key:"assistants", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#E498E0" d="M15.15 5h-6.2q-.425 0-.712-.288T7.95 4q0-.425.288-.713T8.95 3h6.2l-.4-.4q-.3-.3-.287-.7t.287-.7q.3-.3.713-.312t.712.287L18.3 3.3q.3.3.3.7t-.3.7l-2.1 2.1q-.3.3-.7.288t-.7-.288q-.3-.3-.313-.712t.288-.713L15.15 5ZM7.5 18q.65 0 1.075-.425T9 16.5q0-.65-.425-1.075T7.5 15q-.65 0-1.075.425T6 16.5q0 .65.425 1.075T7.5 18Zm9 0q.65 0 1.075-.425T18 16.5q0-.65-.425-1.075T16.5 15q-.65 0-1.075.425T15 16.5q0 .65.425 1.075T16.5 18ZM6.85 9l.4.4q.3.3.288.7t-.288.7q-.3.3-.713.313t-.712-.288L3.7 8.7q-.3-.3-.3-.7t.3-.7l2.125-2.125q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7l-.4.4h10.275q.65 0 1.175.375t.725.975l1.875 5.325q.05.15.075.325t.025.35v7.15q0 .625-.438 1.063T19.5 23q-.625 0-1.063-.438T18 21.5V21H6v.5q0 .625-.438 1.063T4.5 23q-.625 0-1.063-.438T3 21.5V14q0-.825.588-1.413T5 12h13.2l-1.05-3H6.85Z"/></svg>`
, label:"Assistenten" },

{ key:"settings", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 416 432"><path fill="#C0C0C0" d="m366 237l45 35q7 6 3 14l-43 74q-4 8-13 4l-53-21q-18 13-36 21l-8 56q-1 9-11 9h-85q-9 0-11-9l-8-56q-19-8-36-21l-53 21q-9 3-13-4L1 286q-4-8 3-14l45-35q-1-12-1-21t1-21L4 160q-7-6-3-14l43-74q5-8 13-4l53 21q18-13 36-21l8-56q2-9 11-9h85q10 0 11 9l8 56q19 8 36 21l53-21q9-3 13 4l43 74q4 8-3 14l-45 35q2 12 2 21t-2 21zm-158.5 54q30.5 0 52.5-22t22-53t-22-53t-52.5-22t-52.5 22t-22 53t22 53t52.5 22z"/></svg>`
, label:"Einstellungen" },

{ key:"info", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 432 432"><path fill="#CFCF50" d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zM235 323V195h-43v128h43zm0-171v-43h-43v43h43z"/></svg>`
, label:"Info" },

{ key:"drivemode", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="#20F0F0"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="#20F0F0" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2ZM8.313 14.781c-1.044-.835-2.46-1.158-4.108-.972a8.01 8.01 0 0 0 6.254 6.043c-.193-2.625-1.056-4.2-2.146-5.07Zm7.374 0c-1.09.872-1.953 2.446-2.146 5.07a8.01 8.01 0 0 0 6.253-6.042c-1.647-.186-3.063.137-4.107.972ZM12 10c-.95 0-1.732.37-2.306.778l-.498.347c-.524.355-1.126.72-1.801.96a6.435 6.435 0 0 1 2.167 1.134c1.124.9 1.953 2.187 2.438 3.859c.485-1.672 1.314-2.96 2.438-3.859a6.434 6.434 0 0 1 2.167-1.133c-.675-.241-1.277-.606-1.801-.961l-.498-.347C13.732 10.37 12.95 10 12 10Zm0-6a8.003 8.003 0 0 0-7.862 6.513l-.043.248l2.21-.442c.582-.116 1.135-.423 1.753-.84l.477-.332C9.332 8.581 10.513 8 12 8c1.388 0 2.509.506 3.3 1.034l.642.445c.54.365 1.032.645 1.536.788l.217.052l2.21.442A8.002 8.002 0 0 0 12 4Z"/></g></svg>`
, label:"Fahrprofil" },
];


const TASKS_CONFIG = {
  music:   { title:"Musik – Songauswahl & Playback",
    steps:[{label:"Playlist öffnen",expect:"tap"},{label:"Scrollen",expect:"strike"},{label:"Song auswählen",expect:"tap"},{label:"Play/Pause",expect:"tap"}] },
  nav:     { title:"Navigation – Zielsuche & Zoom",
    steps:[{label:"Suchfeld fokussieren",expect:"tap"},{label:"Vorschläge scrollen",expect:"strike"},{label:"Ziel auswählen",expect:"tap"},{label:"Karte verschieben",expect:"strike"}] },
  phone:   { title:"Telefon – Kontakt auswählen & anrufen",
    steps:[{label:"Kontaktliste scrollen",expect:"strike"},{label:"Kontakt tippen",expect:"tap"},{label:"Anrufen",expect:"tap"}] },
  message: { title:"Nachricht – Kurztext & Senden",
    steps:[{label:"Textfeld fokussieren",expect:"tap"},{label:"Scrollen im Textfeld",expect:"strike"},{label:"Absenden",expect:"tap"}] },
  settings:{ title:"Einstellungen – Helligkeit/Lautstärke",
    steps:[{label:"Panel öffnen",expect:"tap"},{label:"Slider bewegen",expect:"strike"},{label:"Feinjustage",expect:"tap"}] },
  map:     { title:"Karte – POI wählen & verschieben",
    steps:[{label:"POI-Liste öffnen",expect:"tap"},{label:"Liste scrollen",expect:"strike"},{label:"POI auswählen",expect:"tap"},{label:"Pin verschieben",expect:"strike"}] },
  climate: { title:"Klima – Temperatur & Modus",
    steps:[{label:"Klima öffnen",expect:"tap"},{label:"Temperatur +/–",expect:"tap"},{label:"Gebläse (Wisch)",expect:"strike"}] },
  info:    { title:"Fahrzeug – Info", steps:[] },
};

/* ===== State ===== */
let isSessionActive = false;
let currentTaskKey = null;
let guidedStepIndex = 0;

const TAP_THRESHOLD_MM = 5;
let pxPerMm = Number(localStorage.getItem("pxPerMm")) || 5.2;

const appContent = document.getElementById("appContent");
const instruction = document.getElementById("instruction");
const featuresArea = document.getElementById("featuresArea");
const pxmmInfoEl = document.getElementById("pxmmInfo");
function updatePxmmInfo(){ pxmmInfoEl.textContent = `px/mm ${pxPerMm.toFixed(2)}`; }
updatePxmmInfo();

/* ===== Session & Export ===== */
document.getElementById("startSession").onclick = ()=>{ gestures.length=0; isSessionActive=true; featuresArea.textContent=""; };
document.getElementById("endSession").onclick   = ()=>{ isSessionActive=false; };
document.getElementById("exportCSV").onclick     = exportGesturesCSV;
document.getElementById("exportFeatures").onclick= ()=>{ if(!featuresArea.textContent.trim()){ alert("Keine Feature-Daten."); return; } downloadCSV("touch_features.csv", featuresArea.textContent.trim()); };

/* ===== Kalibrierung ===== */
const calDialog = document.getElementById("calDialog");
document.getElementById("calibrate").onclick = ()=>{
  const ruler=document.getElementById("ruler"), range=document.getElementById("rulerRange"), currPx=document.getElementById("currPx"), currPxPerMm=document.getElementById("currPxPerMm");
  const pxFor50 = Math.max(50, Math.min(800, Math.round(pxPerMm*50)));
  range.value=String(pxFor50); ruler.style.width=pxFor50+"px"; currPx.textContent=String(pxFor50); currPxPerMm.textContent=(pxFor50/50).toFixed(2);
  range.oninput=()=>{ const v=Number(range.value); ruler.style.width=v+"px"; currPx.textContent=String(v); currPxPerMm.textContent=(v/50).toFixed(2); };
  calDialog.showModal();
  document.getElementById("saveCal").onclick=()=>{ const v=Number(range.value); pxPerMm=v/50; localStorage.setItem("pxPerMm", String(pxPerMm)); updatePxmmInfo(); };
};
/* ===== Ebene 1: Kachel-Grid mit Pager (2 Seiten) ===== */
let homePageIndex = 0;

function renderHome(){
  currentTaskKey = null;
  guidedStepIndex = 0;
  instruction.textContent = "Wische nach links/rechts oder tippe eine Kachel.";

  // in 2 Seiten splitten: 8 Kacheln auf Seite 1, Rest auf Seite 2
  const pages = [
    APPS.slice(0, 8),
    APPS.slice(8)
  ];

  appContent.innerHTML = `
    <div class="pager" id="pager" data-x="0">
      ${pages.map((apps,pi)=>`
        <section class="page" data-page="${pi}">
          <div class="grid-wrap">
            ${apps.map(a=>`
              <div class="tile" data-app="${a.key}">
                <div class="icon-box">${a.icon}</div>
                <span class="menu-label">${a.label}</span>
              </div>
            `).join("")}
          </div>
        </section>
      `).join("")}
    </div>
    <div class="pager-dots" id="pagerDots">
      ${pages.map((_,i)=>`<button class="dot ${i===homePageIndex?'active':''}" data-i="${i}" aria-label="Seite ${i+1}"></button>`).join("")}
    </div>
  `;

  // Tile-Klicks
  appContent.querySelectorAll(".tile").forEach(t=>{
    t.addEventListener("click", ()=> openApp(t.dataset.app));
  });

  // Dots-Klicks
  appContent.querySelectorAll(".pager-dots .dot").forEach(d=>{
    d.addEventListener("click", ()=> goToHomePage(Number(d.dataset.i), true));
  });

  // initial Position
  setPagerX(-homePageIndex * appContent.clientWidth, false);

  // Swipe-Handling
  enableHomeSwipe();
}

function goToHomePage(i, animate=true){
  const max = 1; // wir haben genau 2 Seiten (0 und 1)
  homePageIndex = Math.max(0, Math.min(max, i));
  const targetX = -homePageIndex * appContent.clientWidth;
  setPagerX(targetX, animate);
  // Dots aktualisieren
  appContent.querySelectorAll(".pager-dots .dot").forEach((d,di)=>{
    d.classList.toggle("active", di===homePageIndex);
  });
}

function setPagerX(x, animate){
  const pager = document.getElementById("pager");
  if(!pager) return;
  pager.style.transition = animate ? "transform .28s ease" : "none";
  pager.style.transform = `translateX(${x}px)`;
  pager.dataset.x = String(x);
}

function enableHomeSwipe(){
  const pager = document.getElementById("pager");
  if(!pager) return;

  let dragging=false, startX=0, lastX=0, baseX=0, vx=0, startT=0, anim=null;

  function rubberClamp(offset, width){
    // etwas „Gummi“ am Rand, damit es sich natürlich anfühlt
    const min = -1 * (width); // nur eine zweite Seite
    const max = 0;
    if(offset > max){
      return max + (offset-max) * 0.35;
    }else if(offset < min){
      return min + (offset-min) * 0.35;
    }
    return offset;
  }

  function onDown(e){
    pager.setPointerCapture(e.pointerId);
    dragging=true;
    cancelAnimationFrame(anim);
    startX=e.clientX;
    lastX=e.clientX;
    startT=performance.now();
    baseX=Number(pager.dataset.x || "0");
    pager.style.transition="none";
  }

  function onMove(e){
    if(!dragging) return;
    const dx = e.clientX - startX;
    const width = appContent.clientWidth;
    const next = rubberClamp(baseX + dx, width);
    pager.style.transform = `translateX(${next}px)`;
    pager.dataset.x = String(next);
    vx = e.clientX - lastX;
    lastX = e.clientX;
  }

  function onUp(e){
    if(!dragging) return;
    dragging=false;
    const dx = e.clientX - startX;
    const dt = Math.max(1, performance.now() - startT);
    const vpxms = vx / dt; // grobe Geschwindigkeit

    const width = appContent.clientWidth;
    const threshold = Math.min(160, width * 0.25); // 25% oder max 160px
    let target = homePageIndex;

    if (dx <= -threshold || vpxms < -0.35) target = homePageIndex + 1;  // nach links gewischt → nächste Seite
    if (dx >=  threshold || vpxms >  0.35) target = homePageIndex - 1;  // nach rechts gewischt → vorige Seite

    goToHomePage(target, true);
  }

  pager.addEventListener("pointerdown", onDown);
  pager.addEventListener("pointermove", onMove);
  pager.addEventListener("pointerup", onUp);
  pager.addEventListener("pointercancel", onUp);

  // Auf Resize reagieren (z.B. wenn das Fenster die Breite ändert)
  window.addEventListener("resize", ()=> {
    setPagerX(-homePageIndex * appContent.clientWidth, false);
  }, { passive:true });
}


/* ===== Ebene 2+: App öffnen mit Zurück-Pfeil ===== */
function openApp(key){
  currentTaskKey = key;
  guidedStepIndex = 0;
  const title = TASKS_CONFIG[key]?.title || "App";
  instruction.textContent = title;

  // App-Shell
  appContent.innerHTML = `
    <div class="pad-toolbar" id="toolbar">
      <button id="inappBack" title="Zurück">←</button>
      <div id="title" style="margin-left:6px; font-weight:700;">${title}</div>
      <div style="flex:1"></div>
    </div>
    <div class="pad-content" id="padArea"></div>
    <div class="pad-footer" id="footer"></div>
  `;
  document.getElementById("inappBack").onclick = renderHome;

  // Untermenü der App laden
  switch(key){
    case "music":   renderMusic();   break;
    case "nav":     renderNav();     break;
    case "phone":   renderPhone();   break;
    case "message": renderMessage(); break;
    case "settings":renderSettings();break;
    case "map":     renderMap();     break;
    case "climate": renderClimate(); break;
    case "info":    renderInfo();    break;
    case "seats":   renderSeats();   break;
    case "assistants": renderAssistants(); break;
    case "user":    renderUser();    break;
  }
}

/* ===== Pointer-Logging auf dem gesamten App-Content ===== */
const ongoing = new Map();
const gestures = [];
appContent.addEventListener("pointerdown", e=>{
  if(!isSessionActive) return;
  appContent.setPointerCapture(e.pointerId);
  const now = Date.now();
  ongoing.set(e.pointerId, { downTime: now, points:[{x:e.clientX,y:e.clientY,t:now}] });
});
appContent.addEventListener("pointermove", e=>{
  const s=ongoing.get(e.pointerId); if(!s) return;
  s.points.push({x:e.clientX,y:e.clientY,t:Date.now()});
});
["pointerup","pointercancel","lostpointercapture"].forEach(ev=>appContent.addEventListener(ev, onUpCancel));

function onUpCancel(e){
  const s=ongoing.get(e.pointerId); if(!s) return;
  s.upTime=Date.now();
  const lengthPx = calcStrokeLength(s.points);
  const lengthMm = lengthPx / pxPerMm;
  const isTap = lengthMm <= TAP_THRESHOLD_MM;
  const durationMs = s.upTime - s.downTime;
  gestures.push({
    task: currentTaskKey || "home",
    stepIndex: guidedStepIndex,
    downTime:s.downTime, upTime:s.upTime,
    downISO:new Date(s.downTime).toISOString(), upISO:new Date(s.upTime).toISOString(),
    durationMs, lengthPx:Math.round(lengthPx),
    lengthMm: isTap ? 0 : Number(lengthMm.toFixed(2)),
    isTap, type: isTap ? "tap" : "strike",
    pointsCount: s.points.length
  });
  ongoing.delete(e.pointerId);
}
function calcStrokeLength(pts){ let s=0; for(let i=1;i<pts.length;i++){ const dx=pts[i].x-pts[i-1].x, dy=pts[i].y-pts[i-1].y; s+=Math.hypot(dx,dy);} return s; }

/* ===== Features F1–F10 (Shortcut F9) ===== */
document.addEventListener("keydown",(e)=>{ if(e.key==="F9") finishCurrentTaskRun(); });
function finishCurrentTaskRun(){
  if(!currentTaskKey){ alert("Keine App gewählt."); return; }
  const steps = TASKS_CONFIG[currentTaskKey]?.steps || [];
  const {SM,TM} = computeSMTM(steps);
  const g = gestures.filter(x=>x.task===currentTaskKey).sort((a,b)=>a.downTime-b.downTime);
  if(!g.length){ alert("Keine Gesten für diese App."); return; }

  const strikes = g.filter(x=>x.type==="strike");
  const taps    = g.filter(x=>x.type==="tap");
  const SO = strikes.length, TO = taps.length;

  const strikeLengthsMm = strikes.map(x=>x.lengthMm);
  const strikeSpeedsMps = strikes.map(x=>{
    const lenM=(x.lengthPx/pxPerMm)/1000, tS=x.durationMs/1000; return tS>0 ? lenM/tS : 0;
  });

  const delaysMs=[]; for(let i=0;i<g.length-1;i++) delaysMs.push(Math.max(0, g[i+1].downTime - g[i].upTime));
  const turnaroundS=(g.at(-1).upTime - g[0].downTime)/1000;

  const F3=computeModeSlidingWindow(strikeLengthsMm), F4=avg(strikeLengthsMm);
  const F5=computeModeSlidingWindow(strikeSpeedsMps), F6=avg(strikeSpeedsMps);
  const F7=computeModeSlidingWindow(delaysMs),       F8=delaysMs.length?Math.round(avg(delaysMs)):0;
  const F9=Math.round((sum(delaysMs)/1000)*100)/100, F10=Math.round(turnaroundS*100)/100;
  const F1=SO-SM, F2=TO-TM;

  const header="task,SO,TO,SM,TM,F1_Sdev,F2_Tdev,F3_modeStrikeLenMm,F4_avgStrikeLenMm,F5_modeStrikeSpeedMps,F6_avgStrikeSpeedMps,F7_modeDelayMs,F8_avgDelayMs,F9_totalDelayS,F10_turnaroundS";
  const row=[currentTaskKey,SO,TO,SM,TM,F1,F2,round2(F3),round2(F4),round3(F5),round3(F6),Math.round(F7),F8,F9,F10].join(",");
  appendFeatures(header,row);
}
function computeSMTM(steps){ let SM=0,TM=0; for(const s of steps){ if(s.expect==="strike") SM++; if(s.expect==="tap") TM++; } return {SM,TM}; }
function computeModeSlidingWindow(values, chunkCount=100){
  if(!values.length) return 0;
  const minV=Math.min(...values), maxV=Math.max(...values), range=maxV-minV;
  if(range===0) return values[0];
  const bins=new Array(chunkCount).fill(0).map(()=>({sum:0,count:0}));
  for(const v of values){ let i=Math.floor(((v-minV)/range)*(chunkCount-1)); i=Math.max(0,Math.min(chunkCount-1,i)); bins[i].sum+=v; bins[i].count++; }
  const maxWin=Math.max(1,Math.ceil(0.10*chunkCount)); let best=-Infinity;
  for(let w=1; w<=maxWin; w++){
    let s=0,c=0; for(let i=0;i<w;i++){ s+=bins[i].sum; c+=bins[i].count; }
    if(c>0) best=Math.max(best, s/c);
    for(let st=1; st<=chunkCount-w; st++){ s+=bins[st+w-1].sum - bins[st-1].sum; c+=bins[st+w-1].count - bins[st-1].count; if(c>0) best=Math.max(best, s/c); }
  }
  return best===-Infinity?0:best;
}
function avg(a){ return a.length ? a.reduce((s,x)=>s+x,0)/a.length : 0; }
function sum(a){ return a.reduce((s,x)=>s+x,0); }
function round2(x){ return Math.round(x*100)/100; }
function round3(x){ return Math.round(x*1000)/1000; }
function appendFeatures(header,row){ if(!featuresArea.textContent.trim()){ featuresArea.textContent = header+"\n"+row; } else { featuresArea.textContent += "\n"+row; } }
function exportGesturesCSV(){
  if(!gestures.length){ alert("Keine Gesten-Daten."); return; }
  const header=["task","stepIndex","downISO","upISO","durationMs","lengthPx","lengthMm","type","pointsCount"];
  const rows=gestures.map(g=>header.map(h=>formatCSV(g[h])).join(","));
  downloadCSV("touch_gestures.csv", header.join(",")+"\n"+rows.join("\n"));
}
function formatCSV(v){ if(typeof v==="string"&&(v.includes(",")||v.includes('"'))) return `"${v.replace(/"/g,'""')}"`; return v ?? ""; }
function downloadCSV(name,text){ const blob=new Blob([text],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

/* ===== Realistische Widgets (Scroll, Map, Slider) ===== */
function makeInertiaScroll(container){
  const inner=container.querySelector(".inner");
  let dragging=false,lastY=0,vy=0,anim=null,startY=0,startTop=0;
  function setTop(y){ const max=Math.max(0, inner.scrollHeight - container.clientHeight); y=Math.min(max,Math.max(0,y)); inner.style.top=(-y)+"px"; container.dataset.scrollY=y; }
  container.addEventListener("pointerdown", e=>{
    container.setPointerCapture(e.pointerId);
    dragging=true; vy=0; startY=e.clientY; startTop=Number(container.dataset.scrollY||0); lastY=e.clientY; cancelAnimationFrame(anim);
  });
  container.addEventListener("pointermove", e=>{
    if(!dragging) return;
    const dy=e.clientY-startY; setTop(startTop - dy);
    vy = (e.clientY - lastY); lastY = e.clientY;
  });
  function fling(){ setTop(Number(container.dataset.scrollY||0) - vy); vy*=0.92; if(Math.abs(vy)>0.5) anim=requestAnimationFrame(fling); }
  function end(){ if(!dragging) return; dragging=false; anim=requestAnimationFrame(fling); }
  container.addEventListener("pointerup", end); container.addEventListener("pointercancel", end);
}
function makeMapPan(el){
  let dragging=false,vx=0,vy=0,anim=null,ox=0,oy=0,lx=0,ly=0;
  function setOff(x,y){ ox=x; oy=y; el.style.backgroundPosition=`${x}px ${y}px`; }
  el.addEventListener("pointerdown", e=>{ el.setPointerCapture(e.pointerId); dragging=true; vx=vy=0; lx=e.clientX; ly=e.clientY; cancelAnimationFrame(anim); });
  el.addEventListener("pointermove", e=>{
    if(!dragging) return; const dx=e.clientX-lx, dy=e.clientY-ly; setOff(ox+dx,oy+dy); vx=dx; vy=dy; lx=e.clientX; ly=e.clientY;
  });
  function fling(){ setOff(ox+vx,oy+vy); vx*=0.93; vy*=0.93; if(Math.hypot(vx,vy)>0.4) anim=requestAnimationFrame(fling); }
  function end(){ if(!dragging) return; dragging=false; anim=requestAnimationFrame(fling); }
  el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
}

/* ===== App-Untermenüs ===== */
function renderMusic(){
  const pad=document.getElementById("padArea"), footer=document.getElementById("footer");
  pad.innerHTML = `
    <div class="pad-toolbar"><button id="openPlaylist">Playlist</button><button id="openNowPlaying">Now Playing</button></div>
    <div class="pad-content" id="musicBody"></div>
  `;
  footer.innerHTML = `<button>⏮︎</button><button>⏯︎</button><button>⏭︎</button>`;
  document.getElementById("openPlaylist").onclick = ()=>{
    const body=document.getElementById("musicBody");
    body.innerHTML = `<div id="list" class="scroll"><div class="inner"></div></div><div class="loading" id="loading">Lade Playlist …</div>`;
    const list=body.querySelector("#list"), inner=list.querySelector(".inner"), loading=body.querySelector("#loading");
    setTimeout(()=>{ loading.remove(); inner.innerHTML = Array.from({length:80},(_,i)=>`<div class="row-item"><span>Track ${i+1}</span><span class="muted">${(3+Math.random()*3).toFixed(1)} min</span></div>`).join(""); }, 300);
    inner?.addEventListener("click", ()=>{ /* ausw. */ });
    makeInertiaScroll(list);
  };
  document.getElementById("openNowPlaying").onclick = ()=>{
    document.getElementById("musicBody").innerHTML = `
      <div style="display:grid; place-items:center; height:100%;">
        <div style="text-align:center;">
          <div style="font-size:48px; margin-bottom:8px;">🎵</div>
          <div class="slider" style="margin-top:12px;">
            <span class="muted">Scrub</span>
            <div class="track"><div class="thumb" id="scrub" style="left:20%"></div></div>
          </div>
        </div>
      </div>`;
    const track=document.querySelector(".track"), thumb=document.getElementById("scrub");
    track.addEventListener("pointerdown", e=>{
      track.setPointerCapture(e.pointerId);
      function move(ev){ const r=track.getBoundingClientRect(); const p=((ev.clientX-r.left)/r.width)*100; thumb.style.left=Math.max(0,Math.min(100,p))+"%"; }
      function up(){ track.removeEventListener("pointermove",move); track.removeEventListener("pointerup",up); }
      track.addEventListener("pointermove",move); track.addEventListener("pointerup",up,{once:true});
    });
  };
}

function renderNav(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar"><input id="navSearch" type="text" placeholder="Ziel eingeben…"><button id="navGo">Suchen</button></div>
    <div class="pad-content">
      <div id="map" class="map"><div class="pin" style="left:50%; top:50%"></div></div>
      <div id="suggest" class="suggest" hidden><div class="inner"></div></div>
    </div>`;
  const suggest=pad.querySelector("#suggest"), inner=suggest.querySelector(".inner"), map=pad.querySelector("#map");
  document.getElementById("navGo").onclick = ()=>{
    suggest.hidden=false; inner.innerHTML=`<div class="row-item">Lade Vorschläge…</div>`;
    setTimeout(()=>{ inner.innerHTML=["Hbf","Alexanderplatz","Potsdamer Platz","Brandenburger Tor","Mitte"].map(t=>`<div class="row-item">${t}</div>`).join(""); }, 400);
  };
  inner.addEventListener("click", ()=>{ suggest.hidden=true; });
  makeMapPan(map);
}

function renderPhone(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar"><button id="btnContacts">Kontakte</button></div>
    <div class="pad-content"><div id="list" class="scroll"><div class="inner"></div></div><div class="loading" id="loading" hidden>Lade …</div></div>`;
  const list=pad.querySelector("#list"), inner=list.querySelector(".inner"), loading=pad.querySelector("#loading");
  document.getElementById("btnContacts").onclick = ()=>{
    loading.hidden=false;
    setTimeout(()=>{ loading.hidden=true; inner.innerHTML=Array.from({length:150},(_,i)=>`<div class="row-item"><span>Kontakt ${(i+1).toString().padStart(3,"0")}</span><span class="muted">+49 30 ${100000+i}</span></div>`).join(""); }, 300);
  };
  makeInertiaScroll(list);
}

function renderMessage(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar"><button id="compose">Neue Nachricht</button><button id="inbox">Posteingang</button></div>
    <div class="pad-content" id="msgBody"></div>`;
  document.getElementById("compose").onclick = ()=>{
    document.getElementById("msgBody").innerHTML = `
      <div id="area" class="scroll"><div class="inner">
        <div contenteditable="true" style="min-height:160px; padding:12px;">Nachricht hier eingeben …</div>
        <div style="height:600px"></div>
      </div></div>`;
    makeInertiaScroll(document.getElementById("area"));
  };
  document.getElementById("inbox").onclick = ()=>{
    document.getElementById("msgBody").innerHTML = `
      <div id="list" class="scroll"><div class="inner">
        ${Array.from({length:40},(_,i)=>`<div class="row-item"><span>Nachricht #${i+1}</span><span class="muted">${(new Date()).toLocaleTimeString()}</span></div>`).join("")}
      </div></div>`;
    makeInertiaScroll(document.getElementById("list"));
  };
}

function renderSettings(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar"><button id="openPanel">Display & Sound</button></div>
    <div class="pad-content" id="setBody"></div>`;
  document.getElementById("openPanel").onclick = ()=>{
    document.getElementById("setBody").innerHTML=`
      <div class="slider" style="margin:16px;">
        <span class="muted">Helligkeit</span>
        <div class="track"><div class="thumb" id="brightThumb" style="left:50%"></div></div>
        <span id="brightVal">50%</span>
      </div>
      <div style="display:flex; gap:8px; padding:0 16px 12px;">
        <button id="dec">−</button><button id="inc">＋</button>
      </div>`;
    const track=document.querySelector(".track"), thumb=document.getElementById("brightThumb"), val=document.getElementById("brightVal"); let pct=50;
    function setPct(p){ pct=Math.max(0,Math.min(100,p)); thumb.style.left=pct+"%"; val.textContent=pct+"%"; }
    track.addEventListener("pointerdown", e=>{
      track.setPointerCapture(e.pointerId);
      function move(ev){ const r=track.getBoundingClientRect(); setPct(((ev.clientX-r.left)/r.width)*100); }
      function up(){ track.removeEventListener("pointermove", move); track.removeEventListener("pointerup", up); }
      track.addEventListener("pointermove", move); track.addEventListener("pointerup", up, {once:true});
    });
    document.getElementById("dec").onclick=()=>setPct(pct-5);
    document.getElementById("inc").onclick=()=>setPct(pct+5);
  };
}

function renderMap(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar"><button id="openPOI">POIs</button></div>
    <div class="pad-content">
      <div id="poi" class="scroll" style="display:none;"><div class="inner"></div></div>
      <div id="map2" class="map"><div class="pin" style="left:50%; top:50%"></div></div>
    </div>`;
  const poi=pad.querySelector("#poi"), inner=poi.querySelector(".inner"), map=pad.querySelector("#map2");
  document.getElementById("openPOI").onclick=()=>{
    inner.innerHTML=Array.from({length:40},(_,i)=>`<div class="row-item">POI #${i+1}</div>`).join("");
    poi.style.display="block";
  };
  inner.addEventListener("click", ()=>{ poi.style.display="none"; });
  makeInertiaScroll(poi); makeMapPan(map);
}

function renderClimate(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar"><button id="openCl">Klima</button></div>
    <div class="pad-content" id="clBody"></div>`;
  document.getElementById("openCl").onclick=()=>{
    document.getElementById("clBody").innerHTML=`
      <div style="padding:12px; display:flex; gap:10px; align-items:center;">
        <button id="tDec">−</button>
        <div id="tVal" style="min-width:60px; text-align:center; font-weight:700;">21.0 °C</div>
        <button id="tInc">＋</button>
        <button id="mode">Auto</button>
      </div>
      <div class="slider"><span class="muted">Gebläse</span><div class="track"><div class="thumb" id="fanThumb" style="left:30%"></div></div></div>`;
    let t=21.0, auto=true; const track=document.querySelector(".track"), thumb=document.getElementById("fanThumb"); let pct=30;
    document.getElementById("tDec").onclick=()=>{ t=Math.max(16,t-0.5); document.getElementById("tVal").textContent=t.toFixed(1)+" °C"; };
    document.getElementById("tInc").onclick=()=>{ t=Math.min(28,t+0.5); document.getElementById("tVal").textContent=t.toFixed(1)+" °C"; };
    document.getElementById("mode").onclick=(e)=>{ auto=!auto; e.target.textContent=auto?"Auto":"Manuell"; };
    function setPct(p){ pct=Math.max(0,Math.min(100,p)); thumb.style.left=pct+"%"; }
    track.addEventListener("pointerdown", e=>{
      track.setPointerCapture(e.pointerId);
      function move(ev){ const r=track.getBoundingClientRect(); setPct(((ev.clientX-r.left)/r.width)*100); }
      function up(){ track.removeEventListener("pointermove", move); track.removeEventListener("pointerup", up); }
      track.addEventListener("pointermove", move); track.addEventListener("pointerup", up, {once:true});
    });
  };
}

function renderInfo(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `<div style="display:grid; place-items:center; height:100%;"><div>Fahrzeug-Infos (Dummy)</div></div>`;
}

function renderSeats(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `<div style="display:grid; place-items:center; height:100%;"><div>Fahrzeug-Infos (Dummy)</div></div>`;
}

function renderAssistants(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `<div style="display:grid; place-items:center; height:100%;"><div>Fahrzeug-Infos (Dummy)</div></div>`;
}

function renderUser(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `<div style="display:grid; place-items:center; height:100%;"><div>Fahrzeug-Infos (Dummy)</div></div>`;
}

/* ===== Start mit Kacheln ===== */
renderHome();
