/* ===== Konfiguration ===== */
const APPS = [
  { key:"music",   label:"🎵 Musik" },
  { key:"nav",     label:"🗺️ Navigation" },
  { key:"phone",   label:"📞 Telefon" },
  { key:"message", label:"💬 Nachricht" },
  { key:"settings",label:"⚙️ Einstellungen" },
  { key:"map",     label:"🧭 Karte" },
  { key:"climate", label:"🌡️ Klima" },
  { key:"info",    label:"ℹ️ Fahrzeug" },
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

/* ===== Ebene 1: Kachel-Grid rendern ===== */
function renderHome(){
  currentTaskKey = null;
  guidedStepIndex = 0;
  instruction.textContent = "Tippe eine Kachel an, um das Untermenü zu öffnen.";
  appContent.innerHTML = `
    <div class="grid-home">
      <div class="grid-wrap">
        ${APPS.map(a=>`<div class="tile" data-app="${a.key}">${a.label}</div>`).join("")}
      </div>
    </div>
  `;
  appContent.querySelectorAll(".tile").forEach(t=>{
    t.addEventListener("click", ()=> openApp(t.dataset.app));
  });
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

/* ===== Start mit Kacheln ===== */
renderHome();
