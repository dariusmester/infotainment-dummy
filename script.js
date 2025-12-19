/* ===== Hilfsfunktion: Entferne Nutzer-Name aus System ===== */
function removeUserNameFromSystem(userName) {
  if (!userName) return;
  
  // 1. Prüfe und entferne Bluetooth-Verbindung wenn der Name vorkommt
  const BT_KEY = 'bluetooth_active_v1';
  const activeBluetoothDevice = localStorage.getItem(BT_KEY);
  if (activeBluetoothDevice && activeBluetoothDevice.includes(userName)) {
    localStorage.removeItem(BT_KEY);
    console.log(`Bluetooth-Gerät mit Namen "${userName}" entfernt`);
  }
  
  // 2. Prüfe und entferne aktiven Nutzer wenn es der Name ist
  const ACTIVE_USER_KEY = 'active_user_v1';
  const activeUser = localStorage.getItem(ACTIVE_USER_KEY);
  if (activeUser && activeUser.includes(userName)) {
    localStorage.removeItem(ACTIVE_USER_KEY);
    console.log(`Aktiver Nutzer "${userName}" entfernt`);
  }
}

/* ===== Hintergrundmusik ===== */
const backgroundMusic = document.getElementById("backgroundMusic");

// Bedingungskonfiguration
const CONDITIONS = {
  A: {
    images: [
      'images/Beach 1.jpg',
      'images/Dog 6.jpg',
      'images/Fireworks 2.jpg',
      'images/Lake 9.jpg',
      'images/Rainbow 2.jpg'
    ],
    song: 'Songs/2019.mp3'
  },
  B: {
    images: [
      'images/Bed 1.jpg',
      'images/Keys 1.jpg',
      'images/Roofing 1.jpg',
      'images/Storage 2.jpg',
      'images/Office supplies 1.jpg'
    ],
    song: 'Songs/2049.mp3'
  },
  C: {
    images: [
      'images/Destruction 4.jpg',
      'images/Dirt 1.jpg',
      'images/Fire 9.jpg',
      'images/Garbage dump 2.jpg',
      'images/Garbage dump 4.jpg'
    ],
    song: 'Songs/2012.mp3'
  }
};

let selectedCondition = 'A'; // Standard-Bedingung

function startBackgroundMusic() {
  if (backgroundMusic) {
    // Song basierend auf gewählter Bedingung laden
    const songPath = CONDITIONS[selectedCondition].song;
    backgroundMusic.src = songPath;
    backgroundMusic.volume = 0.3; // Leise Hintergrundmusik (30%)
    backgroundMusic.play().catch(err => {
      console.log("Autoplay blockiert - Musik wird beim ersten User-Interaction gestartet");
    });
  }
}

/* ===== Willkommens-Formular mit Multi-Page ===== */
function initWelcomeForm() {
  const modal = document.getElementById("welcomeModal");
  const nameInput = document.getElementById("userNameInput");
  const conditionSelect = document.getElementById("conditionSelect");
  const page1 = document.getElementById("welcomePage1");
  const page2 = document.getElementById("welcomePage2");
  const pageImages = document.getElementById("welcomePageImages");
  const page3 = document.getElementById("welcomePage3");
  const nextBtn1 = document.getElementById("nextPageBtn1");
  const prevBtn2 = document.getElementById("prevPageBtn2");
  const nextBtn2 = document.getElementById("nextPageBtn2");
  const prevBtn3 = document.getElementById("prevPageBtn3");
  const nextBtn3 = document.getElementById("nextPageBtn3");
  
  if (!modal) {
    console.error("Welcome modal not found!");
    return;
  }
  
  // Event-Listener für Bedingungsauswahl
  if (conditionSelect) {
    conditionSelect.addEventListener("change", (e) => {
      selectedCondition = e.target.value;
      console.log("Bedingung gewählt:", selectedCondition);
    });
  }
  
  // Navigation Seite 1 → Seite 2
  if (nextBtn1) {
    nextBtn1.addEventListener("click", () => {
      const userName = nameInput?.value?.trim();
      if (!userName) {
        alert("Bitte geben Sie Ihren Namen ein.");
        return;
      }
      
      // Ausgewählte Bedingung speichern
      localStorage.setItem("selected_condition_v1", selectedCondition);
      
      // Session-ID generieren basierend auf aktuellem Datum und Uhrzeit
      const now = new Date();
      const sessionId = now.toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
      
      // Name und Session-ID speichern
      localStorage.setItem("user_name_v1", userName);
      localStorage.setItem("session_id_v1", sessionId);
      
      // Entferne alle Bluetooth-Geräte und aktiven Nutzer mit diesem Namen
      removeUserNameFromSystem(userName);
      
      // Starte Hintergrundmusik
      startBackgroundMusic();
      
      // Zu Seite 2 wechseln
      if (page1 && page2) {
        page1.style.display = "none";
        page2.style.display = "flex";
      }
    });
  }
  
  // Navigation Seite 2 → Seite 1
  if (prevBtn2) {
    prevBtn2.addEventListener("click", () => {
      if (page1 && page2) {
        page2.style.display = "none";
        page1.style.display = "flex";
      }
    });
  }
  
  // Navigation Seite 2 → Bildergalerie
  if (nextBtn2) {
    nextBtn2.addEventListener("click", () => {
      // Starte Bildergalerie-Diashow
      if (page2 && pageImages) {
        page2.style.display = "none";
        pageImages.style.display = "flex";
        startImageSlideshow();
      }
    });
  }
  
  // Bildergalerie-Funktion
  function startImageSlideshow() {
    // Bilder basierend auf gewählter Bedingung laden
    const images = CONDITIONS[selectedCondition].images;
    
    const imgElement = document.getElementById("slideshowImage");
    let currentIndex = 0;
    
    function showNextImage() {
      if (currentIndex < images.length) {
        imgElement.src = images[currentIndex];
        imgElement.style.opacity = '0';
        
        // Fade-in Animation
        setTimeout(() => {
          imgElement.style.transition = 'opacity 0.5s ease-in-out';
          imgElement.style.opacity = '1';
        }, 50);
        
        currentIndex++;
        
        if (currentIndex < images.length) {
          // Nächstes Bild nach 5 Sekunden
          setTimeout(showNextImage, 5000);
        } else {
          // Alle Bilder gezeigt - gehe zu Seite 3
          setTimeout(() => {
            const pageImages = document.getElementById("welcomePageImages");
            const page3 = document.getElementById("welcomePage3");
            if (pageImages && page3) {
              pageImages.style.display = "none";
              page3.style.display = "flex";
            }
          }, 5000); // Letztes Bild auch 5 Sekunden anzeigen
        }
      }
    }
    
    showNextImage();
  }
  
  // Navigation Seite 3 → Seite 2
  if (prevBtn3) {
    prevBtn3.addEventListener("click", () => {
      if (page2 && page3) {
        page3.style.display = "none";
        page2.style.display = "flex";
      }
    });
  }
  
  // Seite 3 abschließen (Starten-Button) - Emotionen vorher speichern und Session starten
  if (nextBtn3) {
    nextBtn3.addEventListener("click", () => {
      const emotionBefore = document.querySelector('input[name="emotion_before"]:checked');
      const activationBefore = document.querySelector('input[name="activation_before"]:checked');
      
      if (!emotionBefore || !activationBefore) {
        alert("Bitte beantworten Sie beide Fragen.");
        return;
      }
      
      // Emotionale Daten (vorher) speichern
      localStorage.setItem("emotion_before_v1", emotionBefore.value);
      localStorage.setItem("activation_before_v1", activationBefore.value);
      
      // Modal verbergen
      modal.style.display = "none";
      
      // Hinweis anzeigen für 5 Sekunden
      const taskStartHint = document.getElementById("taskStartHint");
      if (taskStartHint) {
        taskStartHint.style.display = "flex";
        
        setTimeout(() => {
          taskStartHint.style.display = "none";
          
          // Session automatisch starten (nach Hinweis)
          loadTestDefaults(); // Lade Test-Einstellungen, die von Aufgaben abweichen
          gestures.length=0; 
          touchInputLog.length=0;
          isSessionActive=true;
          currentTaskIndex = 0;
          taskStateStartTime = null;
          // Farbe zurücksetzen
          instruction.style.color = INSTRUCTION_DEFAULT_COLOR;
          updateTaskDisplay();
          if(featuresArea) featuresArea.textContent=""; 
        }, 5000);
      }
    });
  }
  
  // Modal beim Laden anzeigen, wenn kein Name gespeichert
  // Um die Seite zu testen, localStorage löschen: localStorage.removeItem("user_name_v1")
  const savedName = localStorage.getItem("user_name_v1");
  console.log("Saved name:", savedName);
  
  if (!savedName) {
    console.log("Showing welcome modal");
    modal.style.display = "flex";
    if (page1 && page2 && page3) {
      page1.style.display = "flex";
      page2.style.display = "none";
      page3.style.display = "none";
    }
  } else {
    console.log("Hiding welcome modal, user:", savedName);
    modal.style.display = "none";
    if (nameInput) nameInput.value = savedName;
  }
  
  // Event-Listener für Emotions-Modal (nachher) -> Thank You Modal
  const continueToThankYouBtn = document.getElementById("continueToThankYou");
  if (continueToThankYouBtn) {
    continueToThankYouBtn.addEventListener("click", () => {
      const emotionAfter = document.querySelector('input[name="emotion_after"]:checked');
      const activationAfter = document.querySelector('input[name="activation_after"]:checked');
      
      if (!emotionAfter || !activationAfter) {
        alert("Bitte beantworten Sie beide Fragen.");
        return;
      }
      
      // Emotionale Daten (nachher) speichern
      localStorage.setItem("emotion_after_v1", emotionAfter.value);
      localStorage.setItem("activation_after_v1", activationAfter.value);
      
      // Zeige Demographics Modal
      const emotionModalAfter = document.getElementById("emotionModalAfter");
      const demographicsModal = document.getElementById("demographicsModal");
      if (emotionModalAfter) emotionModalAfter.style.display = "none";
      if (demographicsModal) demographicsModal.style.display = "flex";
    });
  }

  // Navigation Demographics → Thank You
  const continueToDemographicsToThankYouBtn = document.getElementById("continueToDemographicsToThankYou");
  if (continueToDemographicsToThankYouBtn) {
    continueToDemographicsToThankYouBtn.addEventListener("click", () => {
      const ageInput = document.getElementById("userAgeInput");
      const genderRadio = document.querySelector('input[name="gender"]:checked');
      const occupationInput = document.getElementById("userOccupationInput");
      const digitalAffinityRadio = document.querySelector('input[name="digital_affinity"]:checked');
      
      const age = ageInput?.value?.trim();
      const gender = genderRadio?.value;
      const occupation = occupationInput?.value;
      const digitalAffinity = digitalAffinityRadio?.value;
      
      if (!age || !gender || !occupation || !digitalAffinity) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
      }
      
      // Demographische Daten speichern
      localStorage.setItem("user_age_v1", age);
      localStorage.setItem("user_gender_v1", gender);
      localStorage.setItem("user_occupation_v1", occupation);
      localStorage.setItem("user_digital_affinity_v1", digitalAffinity);
      
      // Zeige Thank You Modal
      const demographicsModal = document.getElementById("demographicsModal");
      const thankYouModal = document.getElementById("thankYouModal");
      if (demographicsModal) demographicsModal.style.display = "none";
      if (thankYouModal) thankYouModal.style.display = "flex";
    });
  }
}

// Willkommens-Formular beim Laden initialisieren
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWelcomeForm);
} else {
  initWelcomeForm();
}

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
{ key:"bluetooth", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 768 1026"><path fill="#65f3deff" d="M750 335q-11 11-30 15L471 513l279 183q18 18 18 43.5T750 783q-13 13-35 16l-347 205q-3 1-10 5.5t-11.5 7.5t-11 5.5t-13.5 2.5q-28 2-48.5-18T257 956V653l-152 99q-18 18-43.5 18T18 752T0 708.5T18 665l232-152L18 361Q0 343 0 317.5T18 274t43.5-18t43.5 18l152 99V70q-4-31 16.5-51T322 1q5 0 10 1t10 4t8 4.5t9.5 6T368 23l382 225q18 18 18 43.5T750 335zM385 855l205-120l-205-134v254zm0-684v254l205-134z"/></svg>`
, label:"Bluetooth" },
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

/* ===== Fahrerassistenz: Definition ===== */
const ASSISTANTS_DEF = [
  { id:"acc",    name:"ACC (Abstandsregeltempomat)", defaults:{ enabled:true,  distance:2, maxSpeed:130, restartAssist:true } },
  { id:"lka",    name:"Spurhalte",                   defaults:{ enabled:true,  sensitivity:"Mittel", laneCentering:true } },
  { id:"bsm",    name:"Totwinkel",                   defaults:{ enabled:true,  alertType:"Visuell + Ton", assistWhenMerging:true } },
  { id:"tsr",    name:"Verkehrszeichen",             defaults:{ enabled:true,  warnOnOverspeed:true, offset:5 } },
  { id:"park",   name:"Parkassistent",               defaults:{ enabled:false, autoPark:false, side:"rechts" } },
  { id:"camera", name:"Kamera",                      defaults:{ enabled:true,  autoViewAtReverse:true, guidelines:"dynamisch" } },
];

/* Deep-Clone ohne structuredClone (max. simple Werte) */
function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }

const AS_KEY = "assistants_state_v1";

function loadAssistState(){
  const base = Object.fromEntries(ASSISTANTS_DEF.map(a => [a.id, deepClone(a.defaults)]));
  const raw = localStorage.getItem(AS_KEY);
  if(!raw) return base;
  try {
    const s = JSON.parse(raw);
    // merge: unbekannte Keys aus Defaults ergänzen
    for(const a of ASSISTANTS_DEF){
      s[a.id] = { ...deepClone(a.defaults), ...(s[a.id] ?? {}) };
    }
    return s;
  } catch {
    return base;
  }
}
function saveAssistState(state){ localStorage.setItem(AS_KEY, JSON.stringify(state)); }

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
let currentTaskIndex = 0;
let taskStateStartTime = null; // Timestamp, wann der korrekte Zustand begonnen hat
let taskStartTime = null; // Timestamp, wann die aktuelle Aufgabe begonnen hat
let skipButtonTimeout = null; // Timer für den Skip-Button

const TAP_THRESHOLD_PX = 26; // ~5mm bei typischen Displays

const appContent = document.getElementById("appContent");
const instruction = document.getElementById("instruction");
const skipTaskBtn = document.getElementById("skipTaskBtn");
const featuresArea = document.getElementById("featuresArea");
// Farben für Aufgaben-Feedback
const INSTRUCTION_DEFAULT_COLOR = getComputedStyle(instruction).color;
const INSTRUCTION_SUCCESS_COLOR = "#21c45a"; // Grün während 1s Bestätigungsphase

/* ===== Aufgaben Definition ===== */
const TASKS = [
  {
    id: 1,
    text: "Wähle dein Nutzerprofil",
    check: () => {
      const enteredName = localStorage.getItem('user_name_v1');
      const activeUser = localStorage.getItem('active_user_v1');
      if (!enteredName) {
        // Fallback to Karl Fischer if no name was entered
        return activeUser === 'Karl Fischer';
      }
      return activeUser === enteredName;
    }
  },
  {
    id: 2,
    text: "Spiele den Song 'Golden Hour' und spule vor bis ca. Minute 2",
    check: () => {
      const musicState = JSON.parse(localStorage.getItem('music_player_v1') || '{}');
      // Golden Hour ist Index 10 in der Song-Liste
      // Korrekt zwischen 1:30 (90s) und 2:30 (150s)
      return musicState.currentTrackIdx === 10 && musicState.progressSec >= 90 && musicState.progressSec <= 150;
    }
  },
  {
    id: 3,
    text: "Stelle die Fahrer Temperatur auf 25° und die Gebläsestärke auf 7",
    check: () => {
      const climateState = JSON.parse(localStorage.getItem('climate_state_v3') || '{}');
      return climateState.temp?.driver === 25 && 
             climateState.fan?.level === 7;
    }
  },
  {
    id: 4,
    text: "Stelle deine Massagefunktion auf Stufe 3, schalte die Sitzheizung aus und stelle die Sitzbelüftung auf Mittel",
    check: () => {
      const seatsState = JSON.parse(localStorage.getItem('seats_state_v1') || '{}');
      return seatsState.driver?.massage?.strength === 3 && 
             seatsState.driver?.heating === 0 && 
             seatsState.driver?.ventilation === 2; // Mittel = Stufe 2
    }
  },
  {
    id: 5,
    text: "Verbinde dein Handy mit Bluetooth und rufe Hannah Klein an",
    check: () => {
      const enteredName = localStorage.getItem('user_name_v1');
      const btActive = localStorage.getItem('bluetooth_active_v1');
      const phoneState = localStorage.getItem('phone_call_active');
      const expectedDevice = enteredName ? `Handy – ${enteredName}` : 'iPhone SE – Julia';
      return btActive === expectedDevice && phoneState === 'Hannah Klein';
    }
  },
  {
    id: 6,
    text: "Schreibe Nico Wolf 'Hallo'",
    check: () => {
      const messageState = localStorage.getItem('message_sent_to');
      return messageState === 'Nico Wolf';
    }
  },
  {
    id: 7,
    text: "Öffne den Kofferraum, stelle die Innenraumhelligkeit auf die höchste Stufe und aktiviere den Alarm",
    check: () => {
      const carState = JSON.parse(localStorage.getItem('car_state_v1') || '{}');
      return carState.locks?.trunk === true && 
             carState.lights?.interiorLevel === 100 && 
             carState.locks?.alarm === true;
    }
  },
  {
    id: 8,
    text: "Wähle das Fahrprofil Sport aus und stelle die Rekuperationsstärke auf die höchste Stufe",
    check: () => {
      const driveMode = JSON.parse(localStorage.getItem('drivermode_state_v1') || '{}');
      return driveMode.profile === 'Sport' && driveMode.regenerativeBraking === 100;
    }
  },
  {
    id: 9,
    text: "Stelle den Abstandsregeltempomat auf die höchste Abstandsstufe und aktiviere den Spurhalteassistenten",
    check: () => {
      const assistState = JSON.parse(localStorage.getItem('assistants_state_v1') || '{}');
      return assistState.acc?.distance === 10 && assistState.lka?.enabled === true;
    }
  }
];

// Funktion zum Laden von Test-Einstellungen, die von den Aufgaben abweichen
function loadTestDefaults() {
  // Get the entered user name for Task 1
  const enteredName = localStorage.getItem('user_name_v1') || 'Anna Müller';
  
  // Task 1: Use different user than the entered name (so task isn't accidentally complete)
  // If entered name is Anna Müller, use Karl Fischer; otherwise use Anna Müller
  const testUser = enteredName === 'Anna Müller' ? 'Karl Fischer' : 'Anna Müller';
  localStorage.setItem('active_user_v1', testUser);
  
  // Task 2: Erwartet "Golden Hour" (Index 10) bei 90-150s → Setze anderen Song/Position
  const musicState = {
    isPlaying: false,
    currentTrackIdx: 0, // "Midnight Echo" statt "Golden Hour"
    progressSec: 0
  };
  localStorage.setItem('music_player_v1', JSON.stringify(musicState));
  
  // Task 3: Erwartet driver=25, fan=7 → Setze andere Werte
  const climateState = {
    temp: { enabled: true, driver: 22.0, passenger: 22.0, rear: 21.0, sync: false },
    fan: { enabled: true, level: 1, acOn: true, airflow: { face: true, feet: false, windshield: false, rear: false } }
  };
  localStorage.setItem('climate_state_v3', JSON.stringify(climateState));
  
  // Task 4: Erwartet massage=3, heating=0, ventilation=2 → Setze andere Werte
  const seatsState = {
    driver: { enabled: true, heating: 2, ventilation: 0, lumbar: 0, massage: { strength: 1 } },
    passenger: { enabled: true, heating: 0, ventilation: 0, lumbar: 0, massage: { strength: 3 } },
    rear: { enabled: false, heating: 0, ventilation: 0 }
  };
  localStorage.setItem('seats_state_v1', JSON.stringify(seatsState));
  
  // Task 5: Erwartet iPhone SE – Julia verbunden + Anruf mit Hannah Klein
  localStorage.removeItem('bluetooth_active_v1');
  localStorage.removeItem('phone_call_active');
  
  // Task 6: Erwartet Nachricht "Hallo" an Nico Wolf
  localStorage.removeItem('message_sent_to');
  
  // Task 7: Erwartet trunk=true, interiorLevel=100, alarm=true → Setze andere Werte
  const carState = {
    locks: { locked: true, alarm: false, trunk: false },
    lights: { headlightsAuto: true, interior: false, interiorLevel: 30 },
    status: { charging: false, batteryPercent: 78, range: 340 },
    drive: { gear: "P", handbrake: true }
  };
  localStorage.setItem('car_state_v1', JSON.stringify(carState));
  
  // Task 8: Erwartet profile=Sport, regenerativeBraking=100 → Setze andere Werte
  const driveModeState = {
    profile: "Comfort",
    adaptiveSuspension: "Komfort",
    steeringAssistance: "Normal",
    regenerativeBraking: 50
  };
  localStorage.setItem('drivermode_state_v1', JSON.stringify(driveModeState));
  
  // Task 9: Erwartet acc.distance=3, lka.enabled=true → Setze andere Werte
  const assistState = {
    acc: { enabled: true, distance: 1, maxSpeed: 130, restartAssist: true },
    lka: { enabled: false, sensitivity: "Mittel", laneCentering: true },
    bsm: { enabled: true, alertType: "Visuell + Ton", assistWhenMerging: true },
    tsr: { enabled: true, warnOnOverspeed: true, offset: 5 },
    park: { enabled: false, autoPark: false, side: "rechts" },
    camera: { enabled: true, autoViewAtReverse: true, guidelines: "dynamisch" }
  };
  localStorage.setItem('assistants_state_v1', JSON.stringify(assistState));
}

function updateTaskDisplay() {
  // immer Standardfarbe setzen, außer die 1s-Phase färbt sie grün
  instruction.style.color = INSTRUCTION_DEFAULT_COLOR;

  if (!isSessionActive) {
    instruction.textContent = "Tippe eine Kachel an, um das Untermenü zu öffnen.";
    hideSkipButton();
    return;
  }

  if (currentTaskIndex >= TASKS.length) {
    instruction.textContent = "Alle Aufgaben abgeschlossen";
    hideSkipButton();
    return;
  }
  
  const task = TASKS[currentTaskIndex];
  
  // Text mit dynamischem Namen anpassen (falls vorhanden)
  let taskText = task.text;
  const userName = localStorage.getItem('user_name_v1');
  if (userName && task.id === 1) {
    // Für Aufgabe 1: "Wähle dein Nutzerprofil" → "Wähle dein Nutzerprofil (NAME)"
    taskText = `Wähle dein Nutzerprofil (${userName})`;
  }
  if (userName && task.id === 5) {
    // Für Aufgabe 5: "Verbinde dein Handy..." → "Verbinde dein Handy (Handy - NAME)..."
    const deviceName = `Handy – ${userName}`;
    taskText = `Verbinde dein Handy (${deviceName}) mit Bluetooth und rufe Hannah Klein an`;
  }
  
  instruction.textContent = `Aufgabe ${task.id}/9: ${taskText}`;
  
  // Starte Timer für Skip-Button (15 Sekunden)
  startSkipButtonTimer();
}

function startSkipButtonTimer() {
  // Bestehenden Timer löschen
  if (skipButtonTimeout) {
    clearTimeout(skipButtonTimeout);
  }
  
  // Skip-Button verstecken
  if (skipTaskBtn) skipTaskBtn.style.display = "none";
  
  // Neuen Timer starten - zeige Button nach 15 Sekunden
  skipButtonTimeout = setTimeout(() => {
    if (skipTaskBtn && isSessionActive && currentTaskIndex < TASKS.length) {
      skipTaskBtn.style.display = "inline-block";
    }
  }, 15000); // 15 Sekunden
}

function hideSkipButton() {
  if (skipButtonTimeout) {
    clearTimeout(skipButtonTimeout);
    skipButtonTimeout = null;
  }
  if (skipTaskBtn) {
    skipTaskBtn.style.display = "none";
  }
}

function checkTaskCompletion() {
  if (!isSessionActive || currentTaskIndex >= TASKS.length) {
    taskStateStartTime = null;
    return;
  }
  
  const task = TASKS[currentTaskIndex];
  const isCorrect = task.check();
  
  if (isCorrect) {
    // Zustand ist korrekt
    if (taskStateStartTime === null) {
      // Zustand wurde gerade korrekt → Timer starten
      taskStateStartTime = Date.now();
      // Visuelles Feedback: Grün während der Wartezeit
      instruction.style.color = INSTRUCTION_SUCCESS_COLOR;
    } else {
      // Prüfen, ob Zustand seit 1 Sekunde korrekt ist
      const elapsed = Date.now() - taskStateStartTime;
      if (elapsed >= 1000) {
        // Task ist erfüllt!
        taskStateStartTime = null;
        // Farbe zurücksetzen
        instruction.style.color = INSTRUCTION_DEFAULT_COLOR;
        currentTaskIndex++;
        
        if (currentTaskIndex >= TASKS.length) {
          // Alle Aufgaben abgeschlossen - zeige Emotions-Modal (nachher)
          updateTaskDisplay();
          // Warte kurz, dann zeige Emotion Modal After
          setTimeout(() => {
            const emotionModalAfter = document.getElementById("emotionModalAfter");
            if (emotionModalAfter) {
              emotionModalAfter.style.display = "flex";
            }
          }, 500);
        } else {
          updateTaskDisplay();
        }
      } else {
        // Noch in der 1s-Phase: grün halten
        instruction.style.color = INSTRUCTION_SUCCESS_COLOR;
      }
    }
  } else {
    // Zustand ist nicht korrekt → Timer zurücksetzen
    taskStateStartTime = null;
    // Farbe zurück auf Standard
    instruction.style.color = INSTRUCTION_DEFAULT_COLOR;
  }
}

// Prüfe Aufgabenfortschritt regelmäßig
setInterval(() => {
  if (isSessionActive) {
    checkTaskCompletion();
  }
}, 500);

/* ===== Session & Export ===== */
// Navigation: Thank You → Export Modal
document.getElementById("continueToExport").onclick = () => {
  const thankYouModal = document.getElementById("thankYouModal");
  const exportModal = document.getElementById("exportModal");
  if (thankYouModal) thankYouModal.style.display = "none";
  if (exportModal) exportModal.style.display = "flex";
};

// Export User Data Button
document.getElementById("exportUserDataBtn").onclick = () => {
  try {
    const sessionId = localStorage.getItem("session_id_v1") || "unknown";
    const demographics = {
      session_id: sessionId,
      age: localStorage.getItem("user_age_v1") || "",
      gender: localStorage.getItem("user_gender_v1") || "",
      occupation: localStorage.getItem("user_occupation_v1") || "",
      digital_affinity: localStorage.getItem("user_digital_affinity_v1") || "",
      emotion_before: localStorage.getItem("emotion_before_v1") || "",
      activation_before: localStorage.getItem("activation_before_v1") || "",
      emotion_after: localStorage.getItem("emotion_after_v1") || "",
      activation_after: localStorage.getItem("activation_after_v1") || ""
    };
    exportUserDataCSV(demographics);
    
    // Visuelles Feedback
    const btn = document.getElementById("exportUserDataBtn");
    const originalText = btn.textContent;
    btn.textContent = "✓ User Data heruntergeladen";
    btn.style.background = "#10b981";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "#08a0f7";
    }, 2000);
  } catch(e) {
    console.error("User data export error:", e);
    alert("Fehler beim Export der User-Daten: " + e.message);
  }
};

// Export Touch Data Button
document.getElementById("exportTouchDataBtn").onclick = () => {
  try {
    const sessionId = localStorage.getItem("session_id_v1") || "unknown";
    if(gestures.length === 0) {
      alert("Keine Touch-Daten erfasst.");
      return;
    }
    exportTouchDataCSV(sessionId);
    
    // Visuelles Feedback
    const btn = document.getElementById("exportTouchDataBtn");
    const originalText = btn.textContent;
    btn.textContent = "✓ Touch Data heruntergeladen";
    btn.style.background = "#10b981";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "#08a0f7";
    }, 2000);
  } catch(e) {
    console.error("Touch data export error:", e);
    alert("Fehler beim Export der Touch-Daten: " + e.message);
  }
};

// "Fertig"-Button im Export Modal
document.getElementById("finishBtn").onclick = () => {
  // Einfach die Seite schließen oder zurücksetzen
  if (confirm("Studie abgeschlossen! Möchten Sie die Seite neu laden?")) {
    location.reload();
  }
};

document.getElementById("resetUser").onclick = () => {
  if (confirm("Möchten Sie wirklich alle Daten löschen und von vorne beginnen?")) {
    // Alle Daten löschen
    localStorage.removeItem("user_name_v1");
    localStorage.removeItem("user_age_v1");
    localStorage.removeItem("user_gender_v1");
    localStorage.removeItem("user_occupation_v1");
    localStorage.removeItem("user_digital_affinity_v1");
    localStorage.removeItem("session_id_v1");
    localStorage.removeItem("emotion_before_v1");
    localStorage.removeItem("activation_before_v1");
    localStorage.removeItem("emotion_after_v1");
    localStorage.removeItem("activation_after_v1");
    localStorage.removeItem("active_user_v1");
    localStorage.removeItem("music_player_v1");
    localStorage.removeItem("climate_state_v3");
    localStorage.removeItem("seats_state_v1");
    localStorage.removeItem("bluetooth_active_v1");
    localStorage.removeItem("phone_call_active");
    localStorage.removeItem("message_sent_to");
    localStorage.removeItem("car_state_v1");
    localStorage.removeItem("drivermode_state_v1");
    localStorage.removeItem("assistants_state_v1");
    
    // Session-Daten zurücksetzen
    isSessionActive = false;
    currentTaskIndex = 0;
    taskStateStartTime = null;
    gestures.length = 0;
    touchInputLog.length = 0;
    
    // UI zurücksetzen
    instruction.style.color = INSTRUCTION_DEFAULT_COLOR;
    updateTaskDisplay();
    
    // Welcome-Modal anzeigen und Seite neuladen
    setTimeout(() => {
      location.reload();
    }, 500);
  }
};

// "Aufgabe überspringen"-Button
document.getElementById("skipTaskBtn").onclick = () => {
  if (!isSessionActive || currentTaskIndex >= TASKS.length) return;
  
  const task = TASKS[currentTaskIndex];
  const sessionId = localStorage.getItem("session_id_v1") || "unknown";
  
  // Erstelle einen speziellen "Skip"-Eintrag in den Gestures
  const skipEntry = {
    session_id: sessionId,
    currentTaskNumber: task.id,
    screen: "TASK_SKIPPED",
    downISO: new Date().toISOString(),
    upISO: new Date().toISOString(),
    durationMs: 0,
    lengthPx: 0,
    type: "skip",
    pathDeviationPx: 0,
    directDistancePx: 0,
    minSpeedPxMs: 0,
    maxSpeedPxMs: 0
  };
  
  gestures.push(skipEntry);
  console.log(`Task ${task.id} übersprungen:`, skipEntry);
  
  // Gehe zur nächsten Aufgabe
  taskStateStartTime = null;
  currentTaskIndex++;
  
  if (currentTaskIndex >= TASKS.length) {
    // Alle Aufgaben abgeschlossen - zeige Emotions-Modal (nachher)
    hideSkipButton();
    updateTaskDisplay();
    setTimeout(() => {
      const emotionModalAfter = document.getElementById("emotionModalAfter");
      if (emotionModalAfter) {
        emotionModalAfter.style.display = "flex";
      }
    }, 500);
  } else {
    updateTaskDisplay();
  }
};

function exportAllData(){
  if(touchInputLog.length === 0 && gestures.length === 0){
    alert("Keine Touch-Daten erfasst.");
    return;
  }
  
  // Session-ID und Demographische Daten abrufen (ohne Name)
  const sessionId = localStorage.getItem("session_id_v1") || "unknown";
  const demographics = {
    session_id: sessionId,
    age: localStorage.getItem("user_age_v1") || "",
    gender: localStorage.getItem("user_gender_v1") || "",
    occupation: localStorage.getItem("user_occupation_v1") || "",
    digital_affinity: localStorage.getItem("user_digital_affinity_v1") || "",
    emotion_before: localStorage.getItem("emotion_before_v1") || "",
    activation_before: localStorage.getItem("activation_before_v1") || "",
    emotion_after: localStorage.getItem("emotion_after_v1") || "",
    activation_after: localStorage.getItem("activation_after_v1") || ""
  };
  
  // Export 1: Nutzerdaten CSV
  exportUserDataCSV(demographics);
  
  // Export 2: Touch-Daten CSV (mit längerem Delay für Safari/iPad Kompatibilität)
  if(gestures.length > 0){
    setTimeout(() => {
      exportTouchDataCSV(sessionId);
    }, 1000);
  } else {
    alert("Keine Touch-Daten erfasst.");
  }
}

/* ===== Ebene 1: Kachel-Grid mit Pager (2 Seiten) ===== */
let homePageIndex = 0;

/* ===== Klima (Accordion) ===== */
const CLIMATE_KEY = "climate_state_v3";
const CLIMATE_DEFAULTS = {
  temp: { enabled: true, driver: 21.0, passenger: 21.0, rear: 21.0, sync: true },
  fan:  { enabled: true, level: 30, acOn: true, airflow: { face:true, feet:false, windshield:false, rear:false } } // Mehrfachauswahl
};

function loadClimate(){
  const raw = localStorage.getItem(CLIMATE_KEY);
  if(!raw) return JSON.parse(JSON.stringify(CLIMATE_DEFAULTS));
  try {
    const s = JSON.parse(raw);
    return {
      temp: {
        ...CLIMATE_DEFAULTS.temp,
        ...(s.temp||{})
      },
      fan: {
        ...CLIMATE_DEFAULTS.fan,
        ...(s.fan||{}),
        airflow: { ...CLIMATE_DEFAULTS.fan.airflow, ...((s.fan||{}).airflow||{}) }
      }
    };
  } catch { return JSON.parse(JSON.stringify(CLIMATE_DEFAULTS)); }
}
function saveClimate(s){ localStorage.setItem(CLIMATE_KEY, JSON.stringify(s)); }

/* ===== Sitze (Accordion) ===== */
const SEATS_KEY = "seats_state_v1";
const SEATS_DEFAULTS = {
  driver: { enabled: true, heating: 0, ventilation: 0, lumbar: 0, massage: { strength: 3 } },
  passenger: { enabled: true, heating: 0, ventilation: 0, lumbar: 0, massage: { strength: 3 } },
  rear: { enabled: false, heating: 0, ventilation: 0 }
};

function loadSeats(){
  const raw = localStorage.getItem(SEATS_KEY);
  if(!raw) return JSON.parse(JSON.stringify(SEATS_DEFAULTS));
  try {
    const s = JSON.parse(raw);
    return {
      driver: {
        ...SEATS_DEFAULTS.driver,
        ...(s.driver||{})
      },
      passenger: {
        ...SEATS_DEFAULTS.passenger,
        ...(s.passenger||{})
      },
      rear: {
        ...SEATS_DEFAULTS.rear,
        ...(s.rear||{})
      }
    };
  } catch { return JSON.parse(JSON.stringify(SEATS_DEFAULTS)); }
}
function saveSeats(s){ localStorage.setItem(SEATS_KEY, JSON.stringify(s)); }

function clamp(n,min,max){ return Math.min(max, Math.max(min, n)); }

/* ===== Fahrprofil (Drive Mode) ===== */
const DRIVERMODE_KEY = "drivermode_state_v1";
const DRIVERMODE_DEFAULTS = {
  profile: "Comfort", // Eco | Comfort | Sport
  adaptiveSuspension: "Komfort", // Komfort | Ausgewogen | Sport
  steeringAssistance: "Normal", // Leicht | Normal | Sportlich
  regenerativeBraking: 100 // 0-100%
};

function loadDriveMode(){
  const raw = localStorage.getItem(DRIVERMODE_KEY);
  if(!raw) return JSON.parse(JSON.stringify(DRIVERMODE_DEFAULTS));
  try { const s = JSON.parse(raw); return { ...DRIVERMODE_DEFAULTS, ...s };
  } catch { return JSON.parse(JSON.stringify(DRIVERMODE_DEFAULTS)); }
}
function saveDriveMode(s){ localStorage.setItem(DRIVERMODE_KEY, JSON.stringify(s)); }

/* ===== Fahrzeug (Vehicle) ===== */
const CAR_KEY = "car_state_v1";
const CAR_DEFAULTS = {
  locks: { locked: true, alarm: false, trunk: false },
  lights: { headlightsAuto: true, interior: false, interiorLevel: 50 },
  status: { fuelPct: 68, rangeKm: 420, tirePressure: { fl: 2.3, fr: 2.3, rl: 2.4, rr: 2.4 } },
  drive: { mode: "Comfort" } // Eco | Comfort | Sport
};

function loadCar(){
  const raw = localStorage.getItem(CAR_KEY);
  if(!raw) return JSON.parse(JSON.stringify(CAR_DEFAULTS));
  try { const s = JSON.parse(raw); return { locks: { ...CAR_DEFAULTS.locks, ...(s.locks||{}) }, lights: { ...CAR_DEFAULTS.lights, ...(s.lights||{}) }, status: { ...CAR_DEFAULTS.status, ...(s.status||{}) }, drive: { ...CAR_DEFAULTS.drive, ...(s.drive||{}) } };
  } catch { return JSON.parse(JSON.stringify(CAR_DEFAULTS)); }
}
function saveCar(s){ localStorage.setItem(CAR_KEY, JSON.stringify(s)); }

function renderHome(){
  currentTaskKey = null;
  guidedStepIndex = 0;
  updateTaskDisplay();

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
  const title = (APPS.find(a => a.key === key)?.label) || "App";

  // App-Shell
  appContent.innerHTML = `
    <div class="pad-toolbar" id="toolbar">
      <button id="inappBack" class="buttonBack" title="Zurück">←</button>
      <div id="title" style="margin-left:60px; font-weight:700;">${title}</div>
      <div style="flex:1"></div>
    </div>
    <div class="pad-content" id="padArea"></div>
  `;
  document.getElementById("inappBack").onclick = renderHome;

  // Untermenü der App laden
  switch(key){
    case "music":     renderMusic();    break;
    case "nav":       renderNav();      break;
    case "phone":     renderPhone();    break;
    case "message":   renderMessage();  break;
    case "settings":  renderSettings(); break;
    case "bluetooth": renderBluetooth();break;
    case "car":       renderCar();      break;
    case "climate":   renderClimate();  break;
    case "info":      renderInfo();     break;
    case "seats":     renderSeats();    break;
    case "drivemode": renderDriveMode();break;
    case "assistants":renderAssistants();break;
    case "user":      renderUser();     break;
  }
    // bisheriges Verhalten für alle anderen Apps
    //renderSubmenu(key);
}

/* ===== Pointer-Logging auf dem gesamten App-Content ===== */
const ongoing = new Map();
const gestures = [];
const touchInputLog = []; // Detailliertes Log für JSON-Export

appContent.addEventListener("pointerdown", e=>{
  if(!isSessionActive) return;
  const now = Date.now();
  ongoing.set(e.pointerId, { 
    downTime: now, 
    downPos: { x: e.clientX, y: e.clientY },
    points:[{x:e.clientX,y:e.clientY,t:now}] 
  });
}, {passive: true});
appContent.addEventListener("pointermove", e=>{
  if(!isSessionActive) return;
  const s=ongoing.get(e.pointerId); if(!s) return;
  s.points.push({x:e.clientX,y:e.clientY,t:Date.now()});
}, {passive: true});
["pointerup","pointercancel","lostpointercapture"].forEach(ev=>appContent.addEventListener(ev, onUpCancel, {passive: true}));

function onUpCancel(e){
  if(!isSessionActive) return;
  const s=ongoing.get(e.pointerId); if(!s) return;
  s.upTime=Date.now();
  const lengthPx = calcStrokeLength(s.points);
  const isTap = lengthPx <= TAP_THRESHOLD_PX;
  const durationMs = s.upTime - s.downTime;
  
  // Berechne direkte Distanz zwischen Start und End
  const directDistancePx = isTap ? 0 : Math.hypot(
    e.clientX - s.downPos.x,
    e.clientY - s.downPos.y
  );
  
  const directionChanges = isTap ? 0 : calcDirectionChanges(s.points);
  const pathDeviation = isTap ? 0 : calcPathDeviation(s.points);
  
  // Berechne Min/Max Geschwindigkeit
  const speedStats = isTap ? { min: 0, max: 0 } : calcSpeedMinMax(s.points);
  
  // Aktuelle Funktion ermitteln (welche App/View ist aktiv)
  const currentFunction = getCurrentFunction();
  
  // Aktuelle Aufgabe ermitteln
  const currentTask = isSessionActive && currentTaskIndex < TASKS.length 
    ? TASKS[currentTaskIndex].id 
    : null;
  
  gestures.push({
    task: currentTaskKey || "home",
    currentTaskNumber: currentTask,
    screen: currentFunction,
    stepIndex: guidedStepIndex,
    downTime:s.downTime, upTime:s.upTime,
    downISO:new Date(s.downTime).toISOString(), upISO:new Date(s.upTime).toISOString(),
    durationMs, lengthPx:Math.round(lengthPx),
    isTap, type: isTap ? "tap" : "swipe",
    pathDeviationPx: Math.round(pathDeviation),
    directDistancePx: Math.round(directDistancePx),
    minSpeedPxMs: Number(speedStats.min.toFixed(3)),
    maxSpeedPxMs: Number(speedStats.max.toFixed(3))
  });
  
  // Detailliertes Log für JSON-Export
  touchInputLog.push({
    type: isTap ? "tap" : "swipe",
    current_task: currentTask,
    screen: currentFunction,
    function: currentFunction,
    down: {
      time: new Date(s.downTime).toISOString(),
      timestamp: s.downTime,
      position_px: {
        x: Math.round(s.downPos.x),
        y: Math.round(s.downPos.y)
      }
    },
    up: {
      time: new Date(s.upTime).toISOString(),
      timestamp: s.upTime,
      position_px: {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY)
      }
    },
    duration_ms: durationMs,
    length_px: Math.round(lengthPx),
    direct_distance_px: Math.round(directDistancePx),
    direction_changes: directionChanges,
    path_deviation_px: Math.round(pathDeviation),
    min_speed_px_ms: Number(speedStats.min.toFixed(3)),
    max_speed_px_ms: Number(speedStats.max.toFixed(3))
  });
  
  ongoing.delete(e.pointerId);
}

function calcStrokeLength(pts){ 
  let s=0; 
  for(let i=1;i<pts.length;i++){ 
    const dx=pts[i].x-pts[i-1].x, dy=pts[i].y-pts[i-1].y; 
    s+=Math.hypot(dx,dy);
  } 
  return s; 
}

function calcDirectionChanges(pts){
  if(pts.length < 3) return 0;
  
  let changes = 0;
  let prevAngle = null;
  
  for(let i=1; i<pts.length; i++){
    const dx = pts[i].x - pts[i-1].x;
    const dy = pts[i].y - pts[i-1].y;
    const distance = Math.hypot(dx, dy);
    
    // Ignoriere sehr kleine Bewegungen (Rauschen)
    if(distance < 2) continue;
    
    const angle = Math.atan2(dy, dx);
    
    if(prevAngle !== null){
      let angleDiff = Math.abs(angle - prevAngle);
      // Normalisiere auf 0-π
      if(angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;
      
      // Zähle als Richtungsänderung wenn > 30 Grad (π/6)
      if(angleDiff > Math.PI / 6){
        changes++;
      }
    }
    
    prevAngle = angle;
  }
  
  return changes;
}

function calcPathDeviation(pts){
  // Berechnet die durchschnittliche Abweichung von der idealen geraden Linie
  // zwischen Start- und Endpunkt
  if(pts.length < 3) return 0;
  
  const start = pts[0];
  const end = pts[pts.length - 1];
  
  // Direktdistanz zwischen Start und End
  const directDist = Math.hypot(end.x - start.x, end.y - start.y);
  
  // Wenn Start und End fast identisch sind, keine sinnvolle Linie
  if(directDist < 5) return 0;
  
  let totalDeviation = 0;
  
  // Berechne für jeden Punkt die Distanz zur idealen Linie
  for(let i=1; i<pts.length-1; i++){
    const p = pts[i];
    
    // Distanz von Punkt p zur Linie zwischen start und end
    // Formel: |ax + by + c| / sqrt(a² + b²)
    // Linie: (end.y - start.y)x - (end.x - start.x)y + (end.x*start.y - end.y*start.x) = 0
    const a = end.y - start.y;
    const b = -(end.x - start.x);
    const c = end.x * start.y - end.y * start.x;
    
    const distance = Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a * a + b * b);
    totalDeviation += distance;
  }
  
  // Durchschnittliche Abweichung
  return pts.length > 2 ? totalDeviation / (pts.length - 2) : 0;
}

function calcSpeedMinMax(pts){
  // Berechnet Minimum- und Maximum-Geschwindigkeit zwischen aufeinanderfolgenden Punkten
  if(pts.length < 2) return { min: 0, max: 0 };
  
  let minSpeed = Infinity;
  let maxSpeed = 0;
  
  for(let i=1; i<pts.length; i++){
    const dx = pts[i].x - pts[i-1].x;
    const dy = pts[i].y - pts[i-1].y;
    const distance = Math.hypot(dx, dy);
    const timeDiff = pts[i].t - pts[i-1].t;
    
    // Vermeide Division durch 0
    if(timeDiff > 0){
      const speed = distance / timeDiff; // px/ms
      minSpeed = Math.min(minSpeed, speed);
      maxSpeed = Math.max(maxSpeed, speed);
    }
  }
  
  // Falls keine gültigen Messungen
  if(minSpeed === Infinity) minSpeed = 0;
  
  return { min: minSpeed, max: maxSpeed };
}

function getCurrentFunction(){
  // Ermittelt die aktuell aktive Funktion/View
  const titleEl = document.getElementById("title");
  if(titleEl && titleEl.textContent.trim()){
    return titleEl.textContent.trim();
  }
  
  if(currentTaskKey){
    return currentTaskKey;
  }
  
  return "home";
}

/* ===== Features F1–F10 (Shortcut F9) ===== */
document.addEventListener("keydown",(e)=>{ if(e.key==="F9") finishCurrentTaskRun(); });
function finishCurrentTaskRun(){
  if(!currentTaskKey){ alert("Keine App gewählt."); return; }
  const steps = TASKS_CONFIG[currentTaskKey]?.steps || [];
  const {SM,TM} = computeSMTM(steps);
  const g = gestures.filter(x=>x.task===currentTaskKey).sort((a,b)=>a.downTime-b.downTime);
  if(!g.length){ alert("Keine Gesten für diese App."); return; }

  const strikes = g.filter(x=>x.type==="swipe");
  const taps    = g.filter(x=>x.type==="tap");
  const SO = strikes.length, TO = taps.length;

  const strikeLengthsPx = strikes.map(x=>x.lengthPx);
  const strikeSpeedsPxMs = strikes.map(x=>{
    const tMs=x.durationMs; return tMs>0 ? x.lengthPx/tMs : 0;
  });

  const delaysMs=[]; for(let i=0;i<g.length-1;i++) delaysMs.push(Math.max(0, g[i+1].downTime - g[i].upTime));
  const turnaroundS=(g.at(-1).upTime - g[0].downTime)/1000;

  const F3=computeModeSlidingWindow(strikeLengthsPx), F4=avg(strikeLengthsPx);
  const F5=computeModeSlidingWindow(strikeSpeedsPxMs), F6=avg(strikeSpeedsPxMs);
  const F7=computeModeSlidingWindow(delaysMs),       F8=delaysMs.length?Math.round(avg(delaysMs)):0;
  const F9=Math.round((sum(delaysMs)/1000)*100)/100, F10=Math.round(turnaroundS*100)/100;
  const F1=SO-SM, F2=TO-TM;

  const header="task,SO,TO,SM,TM,F1_Sdev,F2_Tdev,F3_modeStrikeLenPx,F4_avgStrikeLenPx,F5_modeStrikeSpeedPxMs,F6_avgStrikeSpeedPxMs,F7_modeDelayMs,F8_avgDelayMs,F9_totalDelayS,F10_turnaroundS";
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
function exportUserDataCSV(demographics){
  console.log("Exporting user data:", demographics);
  
  // CSV mit einer Zeile für die Nutzerdaten inklusive emotionaler Daten und digitaler Affinität
  const header = ["session_id", "age", "gender", "occupation", "digital_affinity", "emotion_before", "activation_before", "emotion_after", "activation_after"];
  const row = [
    formatCSV(demographics.session_id),
    formatCSV(demographics.age),
    formatCSV(demographics.gender),
    formatCSV(demographics.occupation),
    formatCSV(demographics.digital_affinity),
    formatCSV(demographics.emotion_before),
    formatCSV(demographics.activation_before),
    formatCSV(demographics.emotion_after),
    formatCSV(demographics.activation_after)
  ].join(",");
  
  const csvContent = header.join(",") + "\n" + row;
  console.log("User CSV content:", csvContent);
  
  downloadCSV(`user_data_${demographics.session_id}.csv`, csvContent);
}

function exportTouchDataCSV(sessionId){
  if(!gestures.length){ alert("Keine Touch-Daten."); return; }
  
  // Header mit session_id als erstes Feld
  const header=["session_id","currentTaskNumber","screen","downISO","upISO","durationMs","lengthPx","type","pathDeviationPx","directDistancePx","minSpeedPxMs","maxSpeedPxMs"];
  
  // Rows mit session_id für jede Zeile
  const rows=gestures.map(g=>{
    const rowData = {
      session_id: sessionId,
      currentTaskNumber: g.currentTaskNumber || "",
      screen: g.screen || "",
      downISO: g.downISO || "",
      upISO: g.upISO || "",
      durationMs: g.durationMs ?? "",
      lengthPx: g.lengthPx ?? "",
      type: g.type || "",
      pathDeviationPx: g.pathDeviationPx ?? "",
      directDistancePx: g.directDistancePx ?? "",
      minSpeedPxMs: g.minSpeedPxMs ?? "",
      maxSpeedPxMs: g.maxSpeedPxMs ?? ""
    };
    return header.map(h=>formatCSV(rowData[h])).join(",");
  });
  
  downloadCSV(`touch_data_${sessionId}.csv`, header.join(",")+"\n"+rows.join("\n"));
}
function formatCSV(v){ if(typeof v==="string"&&(v.includes(",")||v.includes('"'))) return `"${v.replace(/"/g,'""')}"`; return v ?? ""; }
function downloadCSV(name, text) { 
  const blob = new Blob([text], {type: "text/csv;charset=utf-8;"}); 
  const url = URL.createObjectURL(blob); 
  const a = document.createElement("a"); 
  a.href = url; 
  a.download = name; 
  a.style.display = "none";
  document.body.appendChild(a); 
  
  // Safari/iPad benötigt einen kleinen Delay
  setTimeout(() => {
    a.click(); 
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url); 
    }, 100);
  }, 0);
}

/* ===== Realistische Widgets (Scroll, Map, Slider) ===== */
function makeInertiaScroll(container){
  const inner=container.querySelector(".inner");
  if(!inner){ console.warn("makeInertiaScroll: .inner element not found"); return; }
  let dragging=false,lastY=0,vy=0,anim=null,startY=0,startTop=0,moved=false;
  function setTop(y){ const max=Math.max(0, inner.scrollHeight - container.clientHeight); y=Math.min(max,Math.max(0,y)); inner.style.top=(-y)+"px"; container.dataset.scrollY=y; }
  
  // Listen on inner instead of container to better handle child elements
  inner.addEventListener("pointerdown", e=>{
    // Allow buttons to be clicked - only start drag if not on a button
    if(e.target.closest('button')) return;
    inner.setPointerCapture(e.pointerId);
    dragging=true; moved=false; vy=0; startY=e.clientY; startTop=Number(container.dataset.scrollY||0); lastY=e.clientY; cancelAnimationFrame(anim);
    e.preventDefault();
  });
  inner.addEventListener("pointermove", e=>{
    if(!dragging) return;
    const dy=e.clientY-startY; 
    if(Math.abs(dy) > 5) moved = true; // Mark as moved if dragged more than 5px
    setTop(startTop - dy);
    vy = (e.clientY - lastY); lastY = e.clientY;
    e.preventDefault();
  });
  function fling(){ setTop(Number(container.dataset.scrollY||0) - vy); vy*=0.92; if(Math.abs(vy)>0.5) anim=requestAnimationFrame(fling); }
  function end(e){ 
    if(!dragging) return; 
    dragging=false; 
    if(moved) anim=requestAnimationFrame(fling);
  }
  inner.addEventListener("pointerup", end); 
  inner.addEventListener("pointercancel", end);
  inner.addEventListener("lostpointercapture", end);
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

function renderAssistants(){
  const pad = document.getElementById("padArea");
  const st = loadAssistState();

  pad.innerHTML = `
    <div class="assist-list">
      ${ASSISTANTS_DEF.map(a=>{
        const s = st[a.id];
        return `
          <section class="assist-item" data-id="${a.id}">
            <header class="assist-head">
              <button class="assist-btn" aria-label="Details umschalten">
              <div class="chevron" >▾</div>
              <div class="assist-title">${a.name}</div>
              </button>
              <label class="switch">
                <input type="checkbox" ${s.enabled ? "checked":""} aria-label="${a.name} aktivieren/deaktivieren">
                <span class="slider-switch"></span>
              </label>
            </header>
            <div class="assist-body" ${s.enabled ? "hidden" : "hidden"}>
              ${renderAssistSettings(a.id, s)}
            </div>
          </section>
        `;
      }).join("")}
    </div>
  `;

  pad.querySelectorAll(".assist-range").forEach(slider => {
    const val = slider.nextElementSibling;
    val.textContent = slider.value;
    slider.addEventListener("input", () => val.textContent = slider.value);
  });
  
  // EIN/AUS
  pad.querySelectorAll(".assist-item .switch input").forEach(inp=>{
    inp.addEventListener("change", ()=>{
      const item = inp.closest(".assist-item");
      const id = item.dataset.id;
      const st = loadAssistState();
      st[id].enabled = inp.checked;
      saveAssistState(st);
      const body = item.querySelector(".assist-body");
    });
  });

  // Accordion
  pad.querySelectorAll(".assist-item .assist-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const body = btn.closest(".assist-item").querySelector(".assist-body");
      const open = !body.hasAttribute("hidden");
      const chevron = btn.querySelector(".chevron");
      if(open){ body.setAttribute("hidden",""); chevron.textContent = "▾"; }
      else    { body.removeAttribute("hidden"); chevron.textContent = "▴"; }
    });
  });

  // Einstellungen speichern
  pad.addEventListener("input", (e)=>{
    const item = e.target.closest(".assist-item");
    if(!item) return;
    const id = item.dataset.id;
    const st = loadAssistState();
    const body = item.querySelector(".assist-body");
    applyAssistFormToState(body, st[id]);
    saveAssistState(st);
  });
}

function renderAssistSettings(id, s){
  switch(id){
    case "acc":
      return `
        <div class="form-row-slider">
          <label class="input-label">Abstandsstufe</label>
          <input type="range" min="1" max="10" step="1" name="distance" value="${s.distance}" class="assist-range">
          <span class="assist-range-value">2</span>
        </div>
        <div class="form-row-slider">
          <label class="input-label">Max. Geschwindigkeit (km/h)</label>
          <input type="range" min="80" max="180" step="10" name="maxSpeed" value="${s.maxSpeed}" class="assist-range">
          <span class="assist-range-value">2</span>
        </div>
        <div class="form-row chk">
          <label class="input-label">Anfahrassistent (Stop&Go)</label>
          <label class="switch">
            <input type="checkbox" name="restartAssist" ${s.restartAssist ? "checked":""}>
            <span class="slider-switch"></span>
          </label>
        </div>
      `;
    case "lka":
      return `
        <div class="form-row">
          <label>Empfindlichkeit</label>
          <select name="sensitivity">
            ${["Niedrig","Mittel","Hoch"].map(o=>`<option ${s.sensitivity===o?"selected":""}>${o}</option>`).join("")}
          </select>
        </div>
        <div class="form-row chk">
          <label class="input-label">Spurzentrierung</label>
          <label class="switch">
            <input type="checkbox" name="laneCentering" ${s.laneCentering?"checked":""}>
            <span class="slider-switch"></span>
          </label>
        </div>
      `;
    case "bsm":
      return `
        <div class="form-row">
          <label>Warnart</label>
          <select name="alertType">
            ${["Visuell","Ton","Visuell + Ton"].map(o=>`<option ${s.alertType===o?"selected":""}>${o}</option>`).join("")}
          </select>
        </div>
        <div class="form-row chk">
        <label class="input-label">Hilfe beim Einfädeln</label>
        <label class="switch">
          <input type="checkbox" name="assistWhenMerging" ${s.assistWhenMerging?"checked":""}>
          <span class="slider-switch"></span>
        </label>
      </div>
      `;
    case "tsr":
      return `
      <div class="form-row chk">
        <label class="input-label">Warnung bei Überschreitung</label>
        <label class="switch">
          <input type="checkbox" name="warnOnOverspeed" ${s.warnOnOverspeed?"checked":""}>
          <span class="slider-switch"></span>
        </label>
      </div>
        <div class="form-row-slider">
        <label class="input-label">Offset (km/h)</label>
        <input type="range" min="0" max="20" step="1" name="offset" value="${s.offset}" class="assist-range">
        <span class="assist-range-value">2</span>
      </div>
      `;
    case "park":
      return `
      <div class="form-row chk">
      <label class="input-label">Auto-Parken</label>
      <label class="switch">
        <input type="checkbox" name="autoPark" ${s.autoPark?"checked":""}>
        <span class="slider-switch"></span>
      </label>
    </div>
        <div class="form-row">
          <label>Bevorzugte Seite</label>
          <select name="side">
            ${["links","rechts"].map(o=>`<option ${s.side===o?"selected":""}>${o}</option>`).join("")}
          </select>
        </div>
      `;
    case "camera":
      return `
      <div class="form-row chk">
      <label class="input-label"> Autom. Rückfahransicht</label>
      <label class="switch">
        <input type="checkbox" name="autoViewAtReverse" ${s.autoViewAtReverse?"checked":""}>
        <span class="slider-switch"></span>
      </label>
    </div>
        <div class="form-row">
          <label>Leitlinien</label>
          <select name="guidelines">
            ${["aus","statisch","dynamisch"].map(o=>`<option ${s.guidelines===o?"selected":""}>${o}</option>`).join("")}
          </select>
        </div>
      `;
    default:
      return `<div class="muted">Keine Einstellungen verfügbar.</div>`;
  }
}

function applyAssistFormToState(body, target){
  body.querySelectorAll("input, select").forEach(el=>{
    if(el.type==="checkbox"){ target[el.name] = el.checked; return; }
    if(el.type==="range" || el.type==="number"){ target[el.name] = Number(el.value); return; }
    target[el.name] = el.value;
  });
}
function renderMusic(){
  const pad=document.getElementById("padArea");
  
  // Music state (persisted in localStorage)
  const MUSIC_KEY = 'music_player_v1';
  const songs = [
    { title: 'Midnight Echo', artist: 'Lunar Waves', duration: 3.45 },
    { title: 'Neon Dreams', artist: 'Synthwave Collective', duration: 4.12 },
    { title: 'Ocean Breeze', artist: 'Coastal Vibes', duration: 3.58 },
    { title: 'Electric Thunder', artist: 'Storm Audio', duration: 5.23 },
    { title: 'Starlight', artist: 'Night Sky', duration: 3.32 },
    { title: 'Digital Love', artist: 'Future Sound', duration: 4.05 },
    { title: 'City Lights', artist: 'Urban Pulse', duration: 3.47 },
    { title: 'Crystal Harmony', artist: 'Zen Beats', duration: 4.18 },
    { title: 'Velocity', artist: 'Speed Demons', duration: 3.56 },
    { title: 'Ethereal Whisper', artist: 'Ambient Dreams', duration: 5.41 },
    { title: 'Golden Hour', artist: 'Sunset Sessions', duration: 3.29 },
    { title: 'Pulse', artist: 'Electronic Edge', duration: 4.33 },
    { title: 'Moonlit Path', artist: 'Night Wanderer', duration: 3.52 },
    { title: 'Resonance', artist: 'Echo Chamber', duration: 4.27 },
    { title: 'Infinity', artist: 'Space Explorers', duration: 5.08 }
  ];
  
  function loadMusicState(){
    const raw = localStorage.getItem(MUSIC_KEY);
    if(!raw) return { currentTrackIdx: 0, isPlaying: false, progressSec: 0 };
    try { return JSON.parse(raw); } catch { return { currentTrackIdx: 0, isPlaying: false, progressSec: 0 }; }
  }
  function saveMusicState(state){ localStorage.setItem(MUSIC_KEY, JSON.stringify(state)); }
  
  let musicState = loadMusicState();
  
  pad.innerHTML = `
    <div id="musicWrapper" style="position:absolute; inset:0; display:flex; flex-direction:column;">
      <div class="pad-content" id="musicBody" style="position:absolute; top:0; left:0; right:0; bottom:150px; overflow:hidden;"></div>
      <div id="musicFooter" style="position:absolute; bottom:0; left:0; right:0; height:150px; display:flex; flex-direction:column; gap:8px; padding:16px; border-radius:12px; border-top:1px solid #3a4245; background:#18232b;">
        <div style="display:flex; gap:12px; align-items:center;">
          <div id="currentSongInfo" style="flex:1; font-size:14px; min-width:0;">
            <div id="songTitle" style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Midnight Echo</div>
            <div id="songArtist" style="color:#9fb0bf; font-size:12px; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Lunar Waves</div>
          </div>
          <div style="display:flex; gap:8px; align-items:center; flex-shrink:0;">
            <button id="prevBtn" class="pill" style="width:50px;">⏮︎</button>
            <button id="playPauseBtn" class="pill" style="width:50px;">${musicState.isPlaying ? '⏸︎' : '⏯︎'}</button>
            <button id="nextBtn" class="pill" style="width:50px;">⏭︎</button>
          </div>
        </div>
        <div id="progressBarWrapper" style="width:100%; height:32px; display:flex; align-items:center;">
          <div id="progressBarBg" style="position:relative; flex:1; height:8px; background:#2a3a4a; border-radius:6px; cursor:pointer;">
            <div id="progressBarFg" style="position:absolute; left:0; top:0; height:8px; background:#08a0f7; border-radius:6px; width:0%;"></div>
            <div id="progressThumb" style="position:absolute; top:-4px; left:0; width:16px; height:16px; background:#08a0f7; border-radius:50%; box-shadow:0 0 4px #08a0f7; pointer-events:none; display:none;"></div>
          </div>
          <div id="progressTime" style="margin-left:12px; color:#9fb0bf; font-size:13px; min-width:60px; text-align:right;"></div>
        </div>
      </div>
    </div>
  `;
  
  // Update play/pause button and song info
  function updatePlayButton(){
    const playBtn = document.getElementById('playPauseBtn');
    if(playBtn) playBtn.textContent = musicState.isPlaying ? '⏸︎' : '⏯︎';
  }
  
  function updateSongInfo(){
    const song = songs[musicState.currentTrackIdx];
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songArtist').textContent = song.artist;
  }
  
  // Previous track
  document.getElementById("prevBtn").onclick = ()=>{
    musicState.currentTrackIdx = (musicState.currentTrackIdx - 1 + songs.length) % songs.length;
    musicState.progressSec = 0;
    saveMusicState(musicState);
    updateSongInfo();
  };
  
  // Play/Pause
  document.getElementById("playPauseBtn").onclick = ()=>{
    musicState.isPlaying = !musicState.isPlaying;
    saveMusicState(musicState);
    updatePlayButton();
  };
  
  // Next track
  document.getElementById("nextBtn").onclick = ()=>{
    musicState.currentTrackIdx = (musicState.currentTrackIdx + 1) % songs.length;
    musicState.progressSec = 0;
    saveMusicState(musicState);
    updateSongInfo();
  };
  
  function showPlaylist(){
    const body = document.getElementById("musicBody");
    if (!body) {
      console.error("musicBody not found!");
      return;
    }
    body.innerHTML = `<div id="musicList" style="position:absolute; inset:0; overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch;"><div class="inner" style="position:relative;"></div></div>`;
    const list = body.querySelector("#musicList"), inner = list.querySelector(".inner");
    inner.innerHTML = songs.map((song, idx) => `
      <div class="row-item" data-idx="${idx}" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; padding:12px 14px; border-bottom:1px solid #0f2939; ${musicState.currentTrackIdx === idx ? 'background:#08a0f7; color:#00131c; font-weight:bold;' : ''}">
        <div style="min-width:0; flex:1;">
          <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${song.title}</div>
          <div class="muted" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${song.artist}</div>
        </div>
        <span class="muted" style="flex-shrink:0; margin-left:12px;">${song.duration.toFixed(2)} min</span>
      </div>
    `).join("");
    
    inner.addEventListener("click", (ev) => {
      const row = ev.target.closest("[data-idx]");
      if(!row) return;
      musicState.currentTrackIdx = Number(row.dataset.idx);
      musicState.progressSec = 0;
      musicState.isPlaying = true;
      saveMusicState(musicState);
      updatePlayButton();
      updateSongInfo();
      showPlaylist(); // Playlist neu rendern für Hervorhebung
    });
    
    // Natives Scrolling auf iPad - kein makeInertiaScroll benötigt
  }
  // Fortschrittsbalken steuern
  function updateProgressBar(){
    const song = songs[musicState.currentTrackIdx];
    const duration = song.duration * 60; // Sekunden
    const percent = Math.max(0, Math.min(1, musicState.progressSec / duration));
    const fg = document.getElementById('progressBarFg');
    const thumb = document.getElementById('progressThumb');
    const time = document.getElementById('progressTime');
    if(fg) fg.style.width = (percent * 100) + '%';
    if(thumb) {
      thumb.style.left = `calc(${percent * 100}% - 8px)`;
      thumb.style.display = 'block';
    }
    if(time) {
      const min = Math.floor(musicState.progressSec / 60);
      const sec = Math.floor(musicState.progressSec % 60);
      const minT = Math.floor(duration / 60);
      const secT = Math.floor(duration % 60);
      time.textContent = `${min}:${sec.toString().padStart(2,'0')} / ${minT}:${secT.toString().padStart(2,'0')}`;
    }
  }

  // Drag/Wisch auf Fortschrittsbalken
  let dragging = false;
  let dragStartX = 0;
  let dragBarWidth = 0;
  let dragDuration = 0;
  function setupProgressBar(){
    const barBg = document.getElementById('progressBarBg');
    const song = songs[musicState.currentTrackIdx];
    dragDuration = song.duration * 60;
    if(!barBg) return;
    
    function updateBarFromEvent(e){
      const rect = barBg.getBoundingClientRect();
      let x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const percent = x / rect.width;
      musicState.progressSec = Math.round(percent * dragDuration);
      saveMusicState(musicState);
      updateProgressBar();
    }
    
    // Touch Events (besser für iPad)
    barBg.addEventListener('touchstart', e => {
      dragging = true;
      updateBarFromEvent(e);
    }, { passive: false });
    
    barBg.addEventListener('touchmove', e => {
      if(!dragging) return;
      e.preventDefault(); // Verhindert Scrollen während Drag
      updateBarFromEvent(e);
    }, { passive: false });
    
    barBg.addEventListener('touchend', e => {
      dragging = false;
    });
    
    // Mouse Events (für Desktop)
    barBg.addEventListener('mousedown', e => {
      dragging = true;
      updateBarFromEvent(e);
    });
    
    barBg.addEventListener('mousemove', e => {
      if(!dragging) return;
      updateBarFromEvent(e);
    });
    
    barBg.addEventListener('mouseup', e => {
      dragging = false;
    });
    
    // Globaler mouseup falls Maus außerhalb losgelassen wird
    document.addEventListener('mouseup', () => {
      if(dragging) dragging = false;
    });
  }

  // Fortschritt updaten beim Songwechsel/Play
  function tick(){
    if(musicState.isPlaying){
      const song = songs[musicState.currentTrackIdx];
      const duration = song.duration * 60;
      musicState.progressSec = Math.min(duration, musicState.progressSec + 1);
      if(musicState.progressSec >= duration){
        musicState.isPlaying = false;
      }
      saveMusicState(musicState);
      updateProgressBar();
    }
    setTimeout(tick, 1000);
  }

  // Initialisieren
  updateSongInfo();
  showPlaylist();
  updateProgressBar();
  setupProgressBar();
  tick();
  
  // Initialize with current song info and show playlist
  updateSongInfo();
  showPlaylist();
}

function renderNav(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `
    <div class="pad-toolbar" style="align-items:center; gap:12px;">
      <input id="navSearch" class="nav-search" type="text" placeholder="Ziel eingeben…">
      <button id="navGo">Suchen</button>
    </div>
    <div class="pad-content" style="display:flex; flex-direction:column; gap:8px;">
      <div style="height:100%; min-height:360px;">
        <!-- Default location: Göttingen -->
        <iframe id="navMapIframe" src="https://www.openstreetmap.org/export/embed.html?bbox=9.8858,51.5213,9.9458,51.5613&layer=mapnik&marker=51.5413,9.9158" style="width:100%; height:100%; border:0; border-radius:8px;"></iframe>
      </div>
      <div id="suggest" class="suggest" hidden><div class="inner"></div></div>
    </div>`;
  const suggest=pad.querySelector("#suggest"), inner=suggest.querySelector(".inner");
  const searchInput = document.getElementById('navSearch');
  const navGo = document.getElementById('navGo');
  const mapIframe = document.getElementById('navMapIframe');

  async function doSearch(q){
    if(!q) return;
    suggest.hidden = false;
    inner.innerHTML = `<div class="row-item">Lade Vorschläge…</div>`;
    try{
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=6&addressdetails=1&q=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers:{ 'Accept-Language':'de' } });
      const json = await res.json();
      if(!json || !json.length){ inner.innerHTML = `<div class="row-item muted">Keine Ergebnisse</div>`; return; }
      inner.innerHTML = json.map(item=>{
        const display = (item.display_name || `${item.lat},${item.lon}`).replace(/, Germany.*/,'');
        return `<div class="row-item" data-lat="${item.lat}" data-lon="${item.lon}">${display}</div>`;
      }).join('');
    }catch(e){ inner.innerHTML = `<div class="row-item muted">Fehler beim Suchen</div>`; }
  }

  navGo.addEventListener('click', ()=> doSearch(searchInput.value.trim()));
  // Enter in input triggers search
  searchInput.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.preventDefault(); doSearch(searchInput.value.trim()); } });

  // clicking a suggestion recenters the iframe map
  inner.addEventListener('click', (ev)=>{
    const row = ev.target.closest('.row-item'); if(!row) return;
    const lat = Number(row.dataset.lat), lon = Number(row.dataset.lon);
    if(!lat||!lon) return;
    // small bbox around chosen point
    const delta = 0.02; // ~2km box
    const minLon = (lon - delta).toFixed(6), minLat = (lat - delta).toFixed(6), maxLon = (lon + delta).toFixed(6), maxLat = (lat + delta).toFixed(6);
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${lat},${lon}`;
    mapIframe.src = src;
    suggest.hidden = true;
  });
  // Using embedded OpenStreetMap iframe; no custom pan helper required.
}

function renderPhone(){
  const pad=document.getElementById("padArea");

  // If no Bluetooth device connected, show simple fallback with button to open Bluetooth panel
  const BT_KEY = 'bluetooth_active_v1';
  const active = localStorage.getItem(BT_KEY) || null;
  if(!active){
    pad.innerHTML = `
      <div class="pad-toolbar"><div style="font-weight:700;">Telefon</div></div>
      <div class="pad-content" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;">
        <div style="font-size:16px; color:#9fb0bf;">Kein Handy verbunden</div>
        <div style="display:flex; gap:12px;">
          <button id="openBluetoothFromPhone" class="pill">Zu Bluetooth</button>
        </div>
      </div>
    `;

    const btn = document.getElementById('openBluetoothFromPhone');
    if(btn) btn.addEventListener('click', ()=>{
      // open the Bluetooth submenu
      openApp('bluetooth');
    });
    return;
  }

  // If a device is connected, show the normal contacts UI with realistic names
  // Generate realistic contact names - extended list for scrolling
  const contacts = [
    { name: 'Alex Müller', phone: '+49 30 100001' },
    { name: 'Ben König', phone: '+49 30 100002' },
    { name: 'Carla Schmidt', phone: '+49 30 100003' },
    { name: 'David Bauer', phone: '+49 30 100004' },
    { name: 'Eva Neumann', phone: '+49 30 100005' },
    { name: 'Fabian Weber', phone: '+49 30 100006' },
    { name: 'Greta Hoffmann', phone: '+49 30 100007' },
    { name: 'Hannah Klein', phone: '+49 30 100008' },
    { name: 'Ian Schröder', phone: '+49 30 100009' },
    { name: 'Julia Lange', phone: '+49 30 100010' },
    { name: 'Karl Fischer', phone: '+49 30 100011' },
    { name: 'Laura Braun', phone: '+49 30 100012' },
    { name: 'Mia Vogel', phone: '+49 30 100013' },
    { name: 'Nico Wolf', phone: '+49 30 100014' },
    { name: 'Olivia Frank', phone: '+49 30 100015' },
    { name: 'Peter Lang', phone: '+49 30 100016' },
    { name: 'Quentin Mayer', phone: '+49 30 100017' },
    { name: 'Rita Busch', phone: '+49 30 100018' },
    { name: 'Simon Roth', phone: '+49 30 100019' },
    { name: 'Tina Berg', phone: '+49 30 100020' },
    { name: 'Uwe König', phone: '+49 30 100021' },
    { name: 'Vera Brandt', phone: '+49 30 100022' },
    { name: 'Willi Kern', phone: '+49 30 100023' },
    { name: 'Xenia Jansen', phone: '+49 30 100024' },
    { name: 'Yannick Otto', phone: '+49 30 100025' },
    { name: 'Anton Schulz', phone: '+49 30 100026' },
    { name: 'Bianca Meyer', phone: '+49 30 100027' },
    { name: 'Christian Koch', phone: '+49 30 100028' },
    { name: 'Diana Krüger', phone: '+49 30 100029' },
    { name: 'Erik Wagner', phone: '+49 30 100030' },
    { name: 'Franziska Becker', phone: '+49 30 100031' },
    { name: 'Georg Richter', phone: '+49 30 100032' },
    { name: 'Helena Schäfer', phone: '+49 30 100033' },
    { name: 'Igor Schneider', phone: '+49 30 100034' },
    { name: 'Jana Zimmermann', phone: '+49 30 100035' },
    { name: 'Klaus Hoffmann', phone: '+49 30 100036' },
    { name: 'Linda Schwarz', phone: '+49 30 100037' },
    { name: 'Martin Herrmann', phone: '+49 30 100038' },
    { name: 'Nina Keller', phone: '+49 30 100039' },
    { name: 'Otto Friedrich', phone: '+49 30 100040' }
  ];

  pad.innerHTML = `
    <div class="pad-toolbar"><div style="font-weight:700;">Kontakte</div></div>
    <div class="pad-content"><div id="phoneContent" style="position:absolute; inset:0;"><div id="list" class="scroll"><div class="inner"></div></div></div></div>`;
  const list=pad.querySelector("#list");
  if(!list){ console.warn("renderPhone: list container not found"); return; }
  const inner=list.querySelector(".inner");
  if(!inner){ console.warn("renderPhone: inner element not found"); return; }
  
  // Populate contacts immediately with call buttons
  inner.innerHTML = contacts.map((c, idx)=>`
    <div class="row-item" style="display:flex; justify-content:space-between; align-items:center;" data-contact-idx="${idx}">
      <div>
        <div style="font-weight:600;">${c.name}</div>
        <div class="muted" style="font-size:12px; margin-top:4px;">${c.phone}</div>
      </div>
      <button class="pill" data-call-idx="${idx}" style="min-width:100px;">Anrufen</button>
    </div>
  `).join("");
  
  // Add call button handlers
  inner.querySelectorAll('[data-call-idx]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const idx = parseInt(btn.dataset.callIdx);
      const contact = contacts[idx];
      showCallView(contact);
    });
  });
  
  makeInertiaScroll(list);
  
  // Function to show call view
  function showCallView(contact){
    const phoneContent = document.getElementById('phoneContent');
    if(!phoneContent) return;
    
    // Speichere den Anruf-Status
    localStorage.setItem('phone_call_active', contact.name);
    
    phoneContent.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:24px; padding:20px;">
        <div style="font-size:28px; font-weight:700;">${contact.name}</div>
        <div style="font-size:18px; color:#9fb0bf;">${contact.phone}</div>
        <div style="font-size:16px; color:#08a0f7; margin-top:12px;">Anruf läuft...</div>
        <div style="display:flex; gap:16px; margin-top:40px;">
          <button class="pill" id="endCall" style="background:#ff3b3b; border-color:#ff3b3b; min-width:120px;">Beenden</button>
        </div>
      </div>
    `;
    
    document.getElementById('endCall').addEventListener('click', ()=>{
      // Lösche Anruf-Status
      localStorage.removeItem('phone_call_active');
      // Return to contact list by re-rendering phone
      renderPhone();
    });
  }
}

function renderMessage(){
  const pad=document.getElementById("padArea");
  
  // Track if we're in message view (to handle back button correctly)
  let inMessageView = false;
  
  // If no Bluetooth device connected, show simple fallback with button to open Bluetooth panel
  const BT_KEY = 'bluetooth_active_v1';
  const active = localStorage.getItem(BT_KEY) || null;
  if(!active){
    pad.innerHTML = `
      <div class="pad-toolbar"><div style="font-weight:700;">Nachrichten</div></div>
      <div class="pad-content" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;">
        <div style="font-size:16px; color:#9fb0bf;">Kein Handy verbunden</div>
        <div style="display:flex; gap:12px;">
          <button id="openBluetoothFromMsg" class="pill">Zu Bluetooth</button>
        </div>
      </div>
    `;

    const btn = document.getElementById('openBluetoothFromMsg');
    if(btn) btn.addEventListener('click', ()=>{
      openApp('bluetooth');
    });
    return;
  }

  // If a device is connected, show messages list
  const messages = [
    { from: 'Alex Müller', text: 'Hallo! Wie geht es dir?', time: '10:23', unread: true },
    { from: 'Carla Schmidt', text: 'Treffen wir uns heute?', time: '09:45', unread: true },
    { from: 'David Bauer', text: 'Danke für die Info!', time: 'Gestern', unread: false },
    { from: 'Eva Neumann', text: 'Kannst du mir helfen?', time: 'Gestern', unread: false },
    { from: 'Fabian Weber', text: 'Meeting um 14 Uhr', time: 'Gestern', unread: false },
    { from: 'Greta Hoffmann', text: 'Alles klar, bis dann!', time: 'Gestern', unread: false },
    { from: 'Hannah Klein', text: 'Schönes Wochenende!', time: 'Fr', unread: false },
    { from: 'Ian Schröder', text: 'Projekt ist fertig', time: 'Fr', unread: false },
    { from: 'Julia Lange', text: 'Vielen Dank!', time: 'Do', unread: false },
    { from: 'Karl Fischer', text: 'Bis morgen', time: 'Do', unread: false },
    { from: 'Laura Braun', text: 'Perfekt!', time: 'Mi', unread: false },
    { from: 'Mia Vogel', text: 'Verstanden', time: 'Mi', unread: false },
    { from: 'Nico Wolf', text: 'Gute Idee', time: 'Di', unread: false },
    { from: 'Olivia Frank', text: 'Klingt gut', time: 'Di', unread: false },
    { from: 'Peter Lang', text: 'Bis später', time: 'Mo', unread: false }
  ];

  function renderMessageList(){
    // Update toolbar title and back button
    const toolbar = document.getElementById('toolbar');
    if(toolbar){
      document.getElementById("title").textContent = "Nachrichten";
      document.getElementById("inappBack").onclick = renderHome;
    }
    
    pad.innerHTML = `<div id="msgContent" style="position:absolute; inset:0;"><div id="list" class="scroll"><div class="inner"></div></div></div>`;
    
    const list=pad.querySelector("#list");
    if(!list){ console.warn("renderMessage: list container not found"); return; }
    const inner=list.querySelector(".inner");
    if(!inner){ console.warn("renderMessage: inner element not found"); return; }
    
    // Populate messages immediately - removed buttons, entire row is clickable
    inner.innerHTML = messages.map((msg, idx)=>`
      <div class="row-item" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" data-msg-idx="${idx}">
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <div style="font-weight:600;">${msg.from}</div>
            <div class="muted" style="font-size:12px;">${msg.time}</div>
          </div>
          <div class="muted" style="font-size:14px;">${msg.text}</div>
        </div>
      </div>
    `).join("");
    
    // Add click handlers to entire row
    inner.querySelectorAll('[data-msg-idx]').forEach(row=>{
      row.addEventListener('click', (e)=>{
        const idx = parseInt(row.dataset.msgIdx);
        const message = messages[idx];
        showMessageView(message);
      });
    });
    
    makeInertiaScroll(list);
  }
  
  // Function to show message conversation view
  function showMessageView(message){
    inMessageView = true;
    const msgContent = document.getElementById('msgContent');
    if(!msgContent) return;
    
    // Update back button to go back to message list
    document.getElementById("inappBack").onclick = renderMessageList;
    document.getElementById("title").textContent = message.from;
    
    // Store sent messages for this conversation
    if(!message.sentMessages) message.sentMessages = [];
    
    function renderChat(){
      msgContent.innerHTML = `
        <div style="display:flex; flex-direction:column; height:100%;">
          <div id="chatMessages" style="flex:1; padding:16px; overflow:auto;">
            <div style="margin-bottom:12px;">
              <div style="background:#1a3a50; padding:12px; border-radius:12px; max-width:80%; margin-bottom:8px;">
                ${message.text}
              </div>
              <div class="muted" style="font-size:11px;">${message.time}</div>
            </div>
            <div style="margin-bottom:12px; display:flex; justify-content:flex-end;">
              <div>
                <div style="background:#08a0f7; color:#00131c; padding:14px 16px; border-radius:12px; max-width:80%; margin-bottom:8px;">
                  Ok, verstanden!
                </div>
                <div class="muted" style="font-size:11px; text-align:right;">Jetzt</div>
              </div>
            </div>
            ${message.sentMessages.map(msg => `
              <div style="margin-bottom:12px; display:flex; justify-content:flex-end;">
                <div>
                  <div style="background:#08a0f7; color:#00131c; padding:14px 16px; border-radius:12px; max-width:80%; margin-bottom:8px;">
                    ${msg.text}
                  </div>
                  <div class="muted" style="font-size:11px; text-align:right;">${msg.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="padding:16px; border-top:1px solid #505353; display:flex; gap:12px;">
            <input id="msgInput" type="text" placeholder="Nachricht eingeben..." style="flex:1; background:#232525; border:1px solid #505353; padding:12px; border-radius:10px; color:#e8f3ff; font-size:16px;">
            <button id="sendBtn" class="pill" style="min-width:100px;">Senden</button>
          </div>
        </div>
      `;
      
      // Add send functionality
      const input = document.getElementById('msgInput');
      const sendBtn = document.getElementById('sendBtn');
      
      function sendMessage(){
        const text = input.value.trim();
        if(!text) return;
        
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
        
        message.sentMessages.push({
          text: text,
          time: timeStr
        });
        
        // Update the last message text and time in the message list
        message.text = text;
        message.time = timeStr;
        
        // Speichere für Aufgabe: Nachricht an Nico Wolf
        if(message.from === 'Nico Wolf' && text.toLowerCase().includes('hallo')) {
          localStorage.setItem('message_sent_to', 'Nico Wolf');
        }
        
        input.value = '';
        renderChat();
        
        // Scroll to bottom
        setTimeout(() => {
          const chatDiv = document.getElementById('chatMessages');
          if(chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
        }, 0);
      }
      
      sendBtn.onclick = sendMessage;
      input.onkeypress = (e) => {
        if(e.key === 'Enter') sendMessage();
      };
    }
    
    renderChat();
  }
  
  // Initially show message list
  renderMessageList();
}

function renderSettings(){
  const pad=document.getElementById("padArea");

  const SETTINGS_KEY = 'settings_v1';
  const DEFAULTS = { brightness:50, theme:'dark', volume:50, muted:false, language:'de', units:'C' };
  function loadSettings(){ try{ const raw=localStorage.getItem(SETTINGS_KEY); return raw?JSON.parse(raw):JSON.parse(JSON.stringify(DEFAULTS)); }catch{return JSON.parse(JSON.stringify(DEFAULTS));} }
  function saveSettings(s){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

  let s = loadSettings();

  pad.innerHTML = `
    <div id="setBody"></div>
  `;

  function renderPanel(){

    document.getElementById("setBody").innerHTML = `
      <div class="assist-list" style="padding:12px; display:flex; flex-direction:column; gap:20px;">

        <div>
          <div style="font-weight:700; margin-bottom:8px; font-size:18px;">Display</div>
          <div class="form-row">
            <label>Helligkeit</label>
            <div style="display:flex; align-items:center; gap:12px; width:100%;">
              <div style="flex:1;">
                <div class="slider" style="display:flex; align-items:center; gap:8px;">
                  <input id="brightness" type="range" min="0" max="100" step="1" value="${s.brightness}" class="assist-range" style="flex:1;">
                </div>
              </div>
              <div style="width:56px; text-align:right; color:#9fb0bf;"><span id="brightVal">${s.brightness}%</span></div>
            </div>
          </div>
          <div class="form-row">
            <label>Theme</label>
            <div style="display:flex; gap:8px;"><button id="themeDark" class="seg ${s.theme==='dark'?'on':''}">Dunkel</button><button id="themeLight" class="seg ${s.theme==='light'?'on':''}">Hell</button></div>
          </div>
          <div class="form-row">
            <label>Auto-Helligkeit</label>
            <label class="switch"><input type="checkbox" id="autoBright"><span class="slider-switch"></span></label>
          </div>
        </div>

        <div>
          <div style="font-weight:700; margin-bottom:8px; font-size:18px;">Sound</div>
          <div class="form-row">
            <label>Lautstärke</label>
            <div class="fan-box" style="flex:1; align-items:center;">
              <input id="volume" type="range" min="0" max="100" step="1" value="${s.volume}" class="assist-range" style="flex:1;">
              <span id="volVal" class="assist-range-value">${s.volume}%</span>
            </div>
          </div>
          <div class="form-row">
            <label>Stummschalten</label>
            <label class="switch"><input type="checkbox" id="mutedChk" ${s.muted?'checked':''}><span class="slider-switch"></span></label>
          </div>
        </div>

        <div>
          <div style="font-weight:700; margin-bottom:8px; font-size:18px;">Allgemein</div>
          <div class="form-row">
            <label>Sprache</label>
            <select id="langSel"><option value="de">Deutsch</option><option value="en">English</option></select>
          </div>
          <div class="form-row">
            <label>Einheiten</label>
            <div style="display:flex; gap:8px;"><button id="unitC" class="seg ${s.units==='C'?'on':''}">°C</button><button id="unitF" class="seg ${s.units==='F'?'on':''}">°F</button></div>
          </div>
        </div>

        <div style="display:flex; gap:12px; padding:8px 12px;">
          <button id="saveSettings" class="pill">Speichern</button>
          <button id="resetSettings" class="pill">Auf Standard</button>
        </div>

      </div>
    `;

    // populate selects
    document.getElementById('langSel').value = s.language;

  // Brightness slider (use .assist-range input for consistent look)
  const brightInput = document.getElementById('brightness'), brightVal = document.getElementById('brightVal');
  if(brightInput){ brightInput.value = s.brightness; brightVal.textContent = s.brightness + '%'; brightInput.addEventListener('input', (e)=>{ s.brightness = Number(e.target.value); brightVal.textContent = s.brightness + '%'; }); }

  // Volume slider
  const volInput = document.getElementById('volume'), volVal = document.getElementById('volVal');
  if(volInput){ volInput.value = s.volume; volVal.textContent = s.volume + '%'; volInput.addEventListener('input', (e)=>{ s.volume = Number(e.target.value); volVal.textContent = s.volume + '%'; }); }

    // Theme buttons
    document.getElementById('themeDark').onclick = ()=>{ s.theme='dark'; document.getElementById('themeDark').classList.add('on'); document.getElementById('themeLight').classList.remove('on'); };
    document.getElementById('themeLight').onclick = ()=>{ s.theme='light'; document.getElementById('themeLight').classList.add('on'); document.getElementById('themeDark').classList.remove('on'); };

    // Units
    document.getElementById('unitC').onclick = ()=>{ s.units='C'; document.getElementById('unitC').classList.add('on'); document.getElementById('unitF').classList.remove('on'); };
    document.getElementById('unitF').onclick = ()=>{ s.units='F'; document.getElementById('unitF').classList.add('on'); document.getElementById('unitC').classList.remove('on'); };

    // Language
    document.getElementById('langSel').onchange = (e)=>{ s.language = e.target.value; };

    // Mute
    document.getElementById('mutedChk').onchange = (e)=>{ s.muted = e.target.checked; };

    // Save / Reset
    document.getElementById('saveSettings').onclick = ()=>{ saveSettings(s); alert('Einstellungen gespeichert'); };
    document.getElementById('resetSettings').onclick = ()=>{ if(confirm('Auf Standard zurücksetzen?')){ s = JSON.parse(JSON.stringify(DEFAULTS)); saveSettings(s); renderPanel(); } };
  }

  // initial render
  renderPanel();
}



function renderClimate(){
  const pad = document.getElementById("padArea");
  const st  = loadClimate();

  pad.innerHTML = `
    <div class="assist-list" style="padding: 12px; display: flex; flex-direction: column; gap: 20px;">

      <!-- AC Button oben -->
      <div class="btn-group" style="justify-content: center; gap: 12px;">
        <button id="acBtn" class="lock-trunk-btn${st.fan.acOn ? " open" : ""}">${st.fan.acOn ? "A/C Ein" : "A/C Aus"}</button>
      </div>

      <!-- Temperaturen -->
      <div>
        <div style="font-weight: 700; margin-bottom: 12px; font-size: 18px;">Temperaturen</div>
        
        <div class="form-row">
          <label>Fahrer</label>
          <div class="temp-box">
            <button class="pill pill-dec" data-t="driver">−</button>
            <div class="temp-read" id="t_driver">${st.temp.driver.toFixed(1)} °C</div>
            <button class="pill pill-inc" data-t="driver">＋</button>
          </div>
        </div>

        <div class="form-row">
          <label>Beifahrer</label>
          <div class="temp-box">
            <button class="pill pill-dec" data-t="passenger">−</button>
            <div class="temp-read" id="t_pass">${st.temp.passenger.toFixed(1)} °C</div>
            <button class="pill pill-inc" data-t="passenger">＋</button>
          </div>
        </div>

        <div class="form-row">
          <label>Rücksitz</label>
          <div class="temp-box">
            <button class="pill pill-dec" data-t="rear">−</button>
            <div class="temp-read" id="t_rear">${st.temp.rear.toFixed(1)} °C</div>
            <button class="pill pill-inc" data-t="rear">＋</button>
          </div>
        </div>
      </div>

      <!-- Gebläse -->
      <div>
        <div style="font-weight: 700; margin-bottom: 12px; font-size: 18px;">Gebläse</div>
        
        <div class="form-row-slider">
          <label>Stärke</label>
          <div class="fan-box">
            <input id="fanRange" type="range" min="0" max="10" step="1" value="${st.fan.level}" class="assist-range">
            <span id="fanVal" class="assist-range-value">${st.fan.level}</span>
          </div>
        </div>

        <div class="form-row">
          <label>Bereiche</label>
          <div class="btn-group" id="airflowGroup">
            <button class="seg ${st.fan.airflow.face?'on':''}" data-k="face">Gesicht</button>
            <button class="seg ${st.fan.airflow.feet?'on':''}" data-k="feet">Füße</button>
            <button class="seg ${st.fan.airflow.windshield?'on':''}" data-k="windshield">Scheibe</button>
            <button class="seg ${st.fan.airflow.rear?'on':''}" data-k="rear">Hinten</button>
          </div>
        </div>
      </div>

    </div>
  `;

  // AC Button Handler
  const acBtn = pad.querySelector("#acBtn");
  if(acBtn) {
    acBtn.addEventListener("click", ()=>{
      const S = loadClimate();
      S.fan.acOn = !S.fan.acOn;
      saveClimate(S);
      acBtn.textContent = S.fan.acOn ? "A/C Ein" : "A/C Aus";
      if(S.fan.acOn) {
        acBtn.classList.add("open");
      } else {
        acBtn.classList.remove("open");
      }
    });
  }

  // Temperaturen (Driver/Passenger/Rear) +/- in 0.5 Schritten (16..28)
  pad.querySelectorAll(".pill-dec, .pill-inc").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const S = loadClimate();
      const who = btn.dataset.t; // driver | passenger | rear
      const inc = btn.classList.contains("pill-inc") ? 0.5 : -0.5;

      if(who==="passenger" && S.temp.sync) return; // gesperrt bei Sync (passenger)

      const keyMap = { driver:"driver", passenger:"passenger", rear:"rear" };
      const key = keyMap[who];
      S.temp[key] = clamp(Number((S.temp[key] + inc).toFixed(1)), 16.0, 28.0);

      if(S.temp.sync && who==="driver"){ S.temp.passenger = S.temp.driver; S.temp.rear = S.temp.driver; }

      saveClimate(S);
      pad.querySelector("#t_driver").textContent = `${S.temp.driver.toFixed(1)} °C`;
      pad.querySelector("#t_pass").textContent   = `${S.temp.passenger.toFixed(1)} °C`;
      pad.querySelector("#t_rear").textContent   = `${S.temp.rear.toFixed(1)} °C`;
    });
  });

  // Gebläse + zweifarbige Spur
  const fan = pad.querySelector("#fanRange");
  if(fan){
    const fanVal = pad.querySelector("#fanVal");
    const paint = ()=>{
      const v = Number(fan.value);
      fan.style.background = `linear-gradient(to right, var(--color-accent, #08a0f7) 0%, var(--color-accent, #08a0f7) ${v}%, #303030 ${v}%, #303030 100%)`;
    };
    paint();
    fan.addEventListener("input", ()=>{
      const S = loadClimate();
      S.fan.level = Number(fan.value);
      saveClimate(S);
      fanVal.textContent = S.fan.level;
      paint();
    });
  }

  // Airflow-Bereiche (Mehrfachauswahl)
  const group = pad.querySelector("#airflowGroup");
  if(group){
    group.addEventListener("click", (e)=>{
      const b = e.target.closest(".seg"); if(!b) return;
      const k = b.dataset.k; // face | feet | windshield | rear
      const S = loadClimate();
      b.classList.toggle("on");
      S.fan.airflow[k] = b.classList.contains("on");
      saveClimate(S);
    });
  }
}


function renderInfo(){
  const pad=document.getElementById("padArea");
  pad.innerHTML = `<div style="display:grid; place-items:center; height:100%;"><div>Dieses Benutzerinterface ist Teil einer Bachelorarbeit zum Thema Erfassung und Analyse von Touch-Interaktionen in Infotainment-Systemen.
  Ziel ist es, typische Bediengesten im Fahrzeugumfeld realistisch zu erfassen und daraus Rückschlüsse auf Bedienkomfort, Interaktionsmuster und mögliche emotionale Zustände abzuleiten.
  Die erfassten Daten werden ausschließlich zu Forschungszwecken verwendet und anonymisiert ausgewertet.</div></div>`;
}

function renderCar(){
  const pad = document.getElementById("padArea");
  const st = loadCar();
  pad.innerHTML = `
    <div class="assist-list" style="padding:12px; display:flex; flex-direction:column; gap:20px;">

      <div>
        <div style="font-weight:700; margin-bottom:8px; font-size:18px;">Fahrzeug-Steuerung</div>
        <div class="form-row">
          <label>Türverriegelung</label>
          <div class="btn-group">
            <button id="toggleLockBtn" class="lock-trunk-btn${st.locks.locked ? "" : " open"}">${st.locks.locked ? "Verriegelt" : "Entriegelt"}</button>
          </div>
        </div>
        <div class="form-row">
          <label>Kofferraum</label>
          <div class="btn-group">
            <button id="trunkBtn" class="lock-trunk-btn${st.locks.trunk ? " open" : ""}">${st.locks.trunk ? "Offen" : "Geschlossen"}</button>
          </div>
        </div>
        <div class="form-row">
          <label>Alarm</label>
          <label class="switch"><input type="checkbox" id="alarmToggle" ${st.locks.alarm?"checked":""}><span class="slider-switch"></span></label>
        </div>
      </div>

      <div>
        <div style="font-weight:700; margin-bottom:8px; font-size:18px;">Beleuchtung</div>
        <div class="form-row">
          <label>Scheinwerfer (Auto)</label>
          <label class="switch"><input type="checkbox" id="headAuto" ${st.lights.headlightsAuto?"checked":""}><span class="slider-switch"></span></label>
        </div>
        <div class="form-row">
          <label>Innenraum</label>
          <label class="switch"><input type="checkbox" id="interiorToggle" ${st.lights.interior?"checked":""}><span class="slider-switch"></span></label>
        </div>
        <div class="form-row-slider">
          <label>Innenraum Helligkeit</label>
          <div class="fan-box"><input id="interiorLevel" type="range" min="0" max="100" value="${st.lights.interiorLevel}" class="assist-range"><span id="interiorLevelVal" class="assist-range-value">${st.lights.interiorLevel}%</span></div>
        </div>
      </div>

    </div>
  `;

  // Accordion
  pad.querySelectorAll(".assist-item .assist-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const sec = btn.closest(".assist-item");
      const body = sec.querySelector(".assist-body");
      const chev = btn.querySelector(".chevron");
      const open = !body.hasAttribute("hidden");
      if(open){ body.setAttribute("hidden","" ); chev.textContent="▾"; }
      else    { body.removeAttribute("hidden"); chev.textContent="▴"; }
    });
  });

  // Controls handlers
  const toggleLockBtn = pad.querySelector('#toggleLockBtn');
  const trunkBtn = pad.querySelector('#trunkBtn');
  const alarmToggle = pad.querySelector('#alarmToggle');
  if(toggleLockBtn){ 
    toggleLockBtn.addEventListener('click', ()=>{ 
      const S=loadCar(); 
      S.locks.locked = !S.locks.locked; 
      saveCar(S); 
      toggleLockBtn.textContent = S.locks.locked ? "🔒 Verriegelt" : "🔓 Entriegelt";
      if(S.locks.locked) {
        toggleLockBtn.classList.remove('open');
      } else {
        toggleLockBtn.classList.add('open');
      }
      setTimeout(()=>{ 
        const fresh = loadCar(); 
        toggleLockBtn.textContent = fresh.locks.locked ? "🔒 Verriegelt" : "🔓 Entriegelt";
        if(fresh.locks.locked) {
          toggleLockBtn.classList.remove('open');
        } else {
          toggleLockBtn.classList.add('open');
        }
      }, 1200); 
    }); 
  }
  if(trunkBtn){ 
    trunkBtn.addEventListener('click', ()=>{ 
      const S=loadCar(); 
      S.locks.trunk = !S.locks.trunk; 
      saveCar(S); 
      trunkBtn.textContent = S.locks.trunk ? "Offen" : "Geschlossen";
      if(S.locks.trunk) {
        trunkBtn.classList.add('open');
      } else {
        trunkBtn.classList.remove('open');
      }
    }); 
  }
  if(alarmToggle){ alarmToggle.addEventListener('change', ()=>{ const S=loadCar(); S.locks.alarm = alarmToggle.checked; saveCar(S); }); }

  // Lights handlers
  const headAuto = pad.querySelector('#headAuto');
  const interiorToggle = pad.querySelector('#interiorToggle');
  const interiorLevel = pad.querySelector('#interiorLevel');
  const interiorLevelVal = pad.querySelector('#interiorLevelVal');
  if(headAuto){ headAuto.addEventListener('change', ()=>{ const S=loadCar(); S.lights.headlightsAuto = headAuto.checked; saveCar(S); }); }
  if(interiorToggle){ interiorToggle.addEventListener('change', ()=>{ const S=loadCar(); S.lights.interior = interiorToggle.checked; saveCar(S); }); }
  if(interiorLevel){ interiorLevel.addEventListener('input', ()=>{ interiorLevelVal.textContent = interiorLevel.value + '%'; const S=loadCar(); S.lights.interiorLevel = Number(interiorLevel.value); saveCar(S); }); }
}

function renderSeats(){
  const pad = document.getElementById("padArea");
  const st  = loadSeats();

  pad.innerHTML = `
    <div class="assist-list">

      <!-- Fahrersitz -->
      <section class="assist-item" data-id="driver">
        <header class="assist-head">
          <button class="assist-btn" aria-label="Details umschalten">
            <div class="chevron">▾</div>
            <div class="assist-title">Fahrersitz</div>
          </button>
        </header>
        <div class="assist-body" hidden>

          <div class="form-row">
            <label>Sitzheizung</label>
            <div class="temp-box">
              <button class="pill pill-dec" data-t="driver-heating">−</button>
              <div class="temp-read" id="driverHeatingVal">${["Aus", "Niedrig", "Mittel", "Hoch"][st.driver.heating]}</div>
              <button class="pill pill-inc" data-t="driver-heating">＋</button>
            </div>
          </div>

          <div class="form-row">
            <label>Sitzbelüftung</label>
            <div class="temp-box">
              <button class="pill pill-dec" data-t="driver-vent">−</button>
              <div class="temp-read" id="driverVentVal">${["Aus", "Niedrig", "Mittel", "Hoch"][st.driver.ventilation]}</div>
              <button class="pill pill-inc" data-t="driver-vent">＋</button>
            </div>
          </div>

          <div class="form-row-slider">
            <label>Lordosenstütze</label>
            <div class="fan-box">
              <input id="driverLumbar" type="range" min="-5" max="5" step="1" value="${st.driver.lumbar}" class="assist-range">
              <span id="driverLumbarVal" class="assist-range-value">${st.driver.lumbar}</span>
            </div>
          </div>

          <div class="form-row-slider">
            <label>Massage</label>
            <div class="fan-box">
              <input id="driverMassageStrength" type="range" min="0" max="5" step="1" value="${st.driver.massage.strength}" class="assist-range">
              <span id="driverMassageVal" class="assist-range-value">${st.driver.massage.strength}</span>
            </div>
          </div>

          

        </div>
      </section>

      <!-- Beifahrersitz -->
      <section class="assist-item" data-id="passenger">
        <header class="assist-head">
          <button class="assist-btn" aria-label="Details umschalten">
            <div class="chevron">▾</div>
            <div class="assist-title">Beifahrersitz</div>
          </button>
        </header>
        <div class="assist-body" hidden>

          <div class="form-row">
            <label>Sitzheizung</label>
            <div class="temp-box">
              <button class="pill pill-dec" data-t="passenger-heating">−</button>
              <div class="temp-read" id="passengerHeatingVal">${["Aus", "Niedrig", "Mittel", "Hoch"][st.passenger.heating]}</div>
              <button class="pill pill-inc" data-t="passenger-heating">＋</button>
            </div>
          </div>

          <div class="form-row">
            <label>Sitzbelüftung</label>
            <div class="temp-box">
              <button class="pill pill-dec" data-t="passenger-vent">−</button>
              <div class="temp-read" id="passengerVentVal">${["Aus", "Niedrig", "Mittel", "Hoch"][st.passenger.ventilation]}</div>
              <button class="pill pill-inc" data-t="passenger-vent">＋</button>
            </div>
          </div>

          <div class="form-row-slider">
            <label>Lordosenstütze</label>
            <div class="fan-box">
              <input id="passengerLumbar" type="range" min="-5" max="5" step="1" value="${st.passenger.lumbar}" class="assist-range">
              <span id="passengerLumbarVal" class="assist-range-value">${st.passenger.lumbar}</span>
            </div>
          </div>

          <div class="form-row-slider">
            <label>Massage</label>
            <div class="fan-box">
              <input id="passengerMassageStrength" type="range" min="0" max="5" step="1" value="${st.passenger.massage.strength}" class="assist-range">
              <span id="passengerMassageVal" class="assist-range-value">${st.passenger.massage.strength}</span>
            </div>
          </div>

          

        </div>
      </section>

      <!-- Rücksitze -->
      <section class="assist-item" data-id="rear">
        <header class="assist-head">
          <button class="assist-btn" aria-label="Details umschalten">
            <div class="chevron">▾</div>
            <div class="assist-title">Rücksitze</div>
          </button>
        </header>
        <div class="assist-body" hidden>

          <div class="form-row">
            <label>Sitzheizung</label>
            <div class="temp-box">
              <button class="pill pill-dec" data-t="rear-heating">−</button>
              <div class="temp-read" id="rearHeatingVal">${["Aus", "Niedrig", "Mittel", "Hoch"][st.rear.heating]}</div>
              <button class="pill pill-inc" data-t="rear-heating">＋</button>
            </div>
          </div>

          <div class="form-row">
            <label>Sitzbelüftung</label>
            <div class="temp-box">
              <button class="pill pill-dec" data-t="rear-vent">−</button>
              <div class="temp-read" id="rearVentVal">${["Aus", "Niedrig", "Mittel", "Hoch"][st.rear.ventilation]}</div>
              <button class="pill pill-inc" data-t="rear-vent">＋</button>
            </div>
          </div>

        </div>
      </section>

    </div>
  `;

  // Accordion
  pad.querySelectorAll(".assist-item .assist-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const sec = btn.closest(".assist-item");
      const body = sec.querySelector(".assist-body");
      const chev = btn.querySelector(".chevron");
      const open = !body.hasAttribute("hidden");
      if(open){ body.setAttribute("hidden",""); chev.textContent="▾"; }
      else    { body.removeAttribute("hidden"); chev.textContent="▴"; }
    });
  });

  // Heizung/Belüftung +/- Buttons (4 Stufen: 0..3)
  pad.querySelectorAll(".pill-inc, .pill-dec").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const type = btn.dataset.t;
      const [seatId, controlType] = type.split("-");
      const S = loadSeats();
      
      if(controlType === "heating") {
        const val = btn.classList.contains("pill-inc") 
          ? Math.min(3, S[seatId].heating + 1)
          : Math.max(0, S[seatId].heating - 1);
        S[seatId].heating = val;
        pad.querySelector(`#${seatId}HeatingVal`).textContent = ["Aus", "Niedrig", "Mittel", "Hoch"][val];
      } else if(controlType === "vent") {
        const val = btn.classList.contains("pill-inc") 
          ? Math.min(3, S[seatId].ventilation + 1)
          : Math.max(0, S[seatId].ventilation - 1);
        S[seatId].ventilation = val;
        pad.querySelector(`#${seatId}VentVal`).textContent = ["Aus", "Niedrig", "Mittel", "Hoch"][val];
      }
      
      saveSeats(S);
    });
  });

  // Lordosenstütze Slider
  ["driver", "passenger"].forEach(seatId => {
    const slider = pad.querySelector(`#${seatId}Lumbar`);
    const display = pad.querySelector(`#${seatId}LumbarVal`);
    if(slider && display) {
      slider.addEventListener("input", ()=>{
        const val = parseInt(slider.value);
        display.textContent = val;
        const S = loadSeats();
        S[seatId].lumbar = val;
        saveSeats(S);
      });
    }
  });

  // Massage: Stärke (0..5) für Fahrer & Beifahrer
  ["driver", "passenger"].forEach(seatId => {
    const slider = pad.querySelector(`#${seatId}MassageStrength`);
    const disp = pad.querySelector(`#${seatId}MassageVal`);
    if(slider && disp){
      slider.addEventListener("input", ()=>{
        const val = parseInt(slider.value);
        disp.textContent = val;
        const S = loadSeats();
        S[seatId].massage.strength = val;
        saveSeats(S);
      });
    }
  });

  // Position buttons removed
}

function renderDriveMode(){
  const pad = document.getElementById("padArea");
  const st = loadDriveMode();
  
  pad.innerHTML = `
    <div class="assist-list">

      <!-- Fahrprofile direkt angezeigt -->
      <div style="padding: 12px; display: flex; flex-direction: column; gap: 30px;">
        <div class="form-row">
          <label>Fahrprofil</label>
          <div class="btn-group" id="profileBtns">
            <button class="seg ${st.profile==="Eco"?"on":""}" data-profile="Eco">Eco</button>
            <button class="seg ${st.profile==="Comfort"?"on":""}" data-profile="Comfort">Comfort</button>
            <button class="seg ${st.profile==="Sport"?"on":""}" data-profile="Sport">Sport</button>
          </div>
        </div>

        <div class="form-row">
          <label>Adaptive Federung</label>
          <div class="btn-group" id="suspensionBtns">
            <button class="seg ${st.adaptiveSuspension==="Komfort"?"on":""}" data-suspension="Komfort">Komfort</button>
            <button class="seg ${st.adaptiveSuspension==="Ausgewogen"?"on":""}" data-suspension="Ausgewogen">Ausgewogen</button>
            <button class="seg ${st.adaptiveSuspension==="Sport"?"on":""}" data-suspension="Sport">Sport</button>
          </div>
        </div>

        <div class="form-row">
          <label>Lenkunterstützung</label>
          <div class="btn-group" id="steeringBtns">
            <button class="seg ${st.steeringAssistance==="Leicht"?"on":""}" data-steering="Leicht">Leicht</button>
            <button class="seg ${st.steeringAssistance==="Normal"?"on":""}" data-steering="Normal">Normal</button>
            <button class="seg ${st.steeringAssistance==="Sportlich"?"on":""}" data-steering="Sportlich">Sportlich</button>
          </div>
        </div>

        <div class="form-row-slider">
          <label>Rekuperationsstärke</label>
          <div class="fan-box"><input id="regenerativeBraking" type="range" min="0" max="100" value="${st.regenerativeBraking}" class="assist-range"><span id="regenerativeBrakingVal" class="assist-range-value">${st.regenerativeBraking}%</span></div>
        </div>
      </div>

    </div>
  `;

  // Profile buttons
  pad.querySelectorAll("#profileBtns .seg").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const profile = btn.dataset.profile;
      const S = loadDriveMode();
      S.profile = profile;
      saveDriveMode(S);
      pad.querySelectorAll("#profileBtns .seg").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
    });
  });

  // Suspension buttons
  pad.querySelectorAll("#suspensionBtns .seg").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const suspension = btn.dataset.suspension;
      const S = loadDriveMode();
      S.adaptiveSuspension = suspension;
      saveDriveMode(S);
      pad.querySelectorAll("#suspensionBtns .seg").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
    });
  });

  // Steering buttons
  pad.querySelectorAll("#steeringBtns .seg").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const steering = btn.dataset.steering;
      const S = loadDriveMode();
      S.steeringAssistance = steering;
      saveDriveMode(S);
      pad.querySelectorAll("#steeringBtns .seg").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
    });
  });

  // Regenerative Braking Slider
  const regenerativeBraking = pad.querySelector("#regenerativeBraking");
  const regenerativeBrakingVal = pad.querySelector("#regenerativeBrakingVal");
  if(regenerativeBraking) {
    regenerativeBraking.addEventListener("input", ()=>{
      const val = parseInt(regenerativeBraking.value);
      regenerativeBrakingVal.textContent = val + "%";
      const S = loadDriveMode();
      S.regenerativeBraking = val;
      saveDriveMode(S);
    });
  }
}

function renderUser(){
  const pad=document.getElementById("padArea");
  // simple persistent active user key
  const ACTIVE_USER_KEY = 'active_user_v1';
  const active = localStorage.getItem(ACTIVE_USER_KEY) || null;
  // Get entered name from welcome form
  const enteredName = localStorage.getItem('user_name_v1');
  
  // generate a long list of users
  const baseUsers = [
    'Alex Müller','Ben König','Carla Schmidt','David Bauer','Eva Neumann','Fabian Weber','Greta Hoffmann','Hannah Klein','Ian Schröder','Julia Lange',
    'Karl Fischer','Laura Braun','Mia Vogel','Nico Wolf','Olivia Frank','Peter Lang','Quentin Mayer','Rita Busch','Simon Roth','Tina Berg',
    'Uwe König','Vera Brandt','Willi Kern','Xenia Jansen','Yannick Otto','Zoe Richter','Anna Schwarz','Björn Koch','Celine Matheis','Darius Mester'
  ];
  
  // Insert entered name in the middle of the list if it exists and is not already in the list
  let users = [...baseUsers];
  if (enteredName && !baseUsers.includes(enteredName)) {
    users.splice(15, 0, enteredName);
  }

  pad.innerHTML = `
    <div style="padding:12px; height:100%; display:flex; flex-direction:column; gap:12px;">
      <div style="font-weight:700; font-size:18px;">Nutzer</div>
      <div style="flex:1; overflow:auto; border-top:1px solid var(--secondarycolor); padding-top:8px;">
        ${users.map((u)=>`
          <div class="row-item" data-user="${u}" style="display:flex; justify-content:space-between; align-items:center;">
            <div>${u}</div>
            <button class="seg ${u===active? 'on' : '' }" data-user="${u}">${u===active? 'Aktiv' : 'Wählen'}</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // handlers: clicking a button marks user active and persists
  pad.querySelectorAll('.row-item .seg').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const user = btn.dataset.user;
      localStorage.setItem(ACTIVE_USER_KEY, user);
      // update buttons
      pad.querySelectorAll('.row-item .seg').forEach(b=>{ b.classList.remove('on'); b.textContent = 'Wählen'; });
      btn.classList.add('on');
      btn.textContent = 'Aktiv';
    });
  });
}

function renderBluetooth(){
  const pad = document.getElementById('padArea');
  const BT_KEY = 'bluetooth_active_v1';
  const active = localStorage.getItem(BT_KEY) || null;
  // Get entered name from welcome form
  const enteredName = localStorage.getItem('user_name_v1');
  
  const basePhones = [
    'iPhone 14 – Darius', 'Samsung Galaxy S23 – Anna', 'Pixel 7 – Ben', 'iPhone 12 – Carla', 'Samsung A53 – David',
    'OnePlus 10 – Eva', 'Nokia XR20 – Fabian', 'Huawei P50 – Greta', 'Xiaomi 12 – Hannah', 'Sony Xperia 5 – Ian',
    'iPhone SE – Julia', 'Moto G – Karl', 'Fairphone 4 – Laura', 'LG Velvet – Mia', 'iPhone 14 Pro – Maya'
  ];
  
  // Add entered name's device in the middle if it exists
  let phones = [...basePhones];
  if (enteredName && !basePhones.some(p => p.includes(` – ${enteredName}`))) {
    const userDevice = `Handy – ${enteredName}`;
    // Insert in the middle (around index 7-8)
    phones.splice(7, 0, userDevice);
  }

  pad.innerHTML = `
    <div style="padding:12px 12px 0 12px; display:flex; flex-direction:column; gap:12px; height:100%;">
      <div style="font-weight:700; font-size:18px;">Bluetooth</div>
      <div style="font-size:13px; color:#9fb0bf;">Verbundenes Gerät: <span id="btActive">${active ? active : 'Keines'}</span></div>
      <div style="flex:1; position:relative; border-top:1px solid var(--secondarycolor);">
        <div id="btList" class="scroll">
          <div class="inner"></div>
        </div>
      </div>
    </div>
  `;

  // Populate the list
  const listContainer = document.getElementById('btList');
  const inner = listContainer ? listContainer.querySelector('.inner') : null;
  if(!inner) return;

  inner.innerHTML = phones.map((p)=>`
    <div class="row-item" data-phone="${p}" style="display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-weight:600">${p.split(' – ')[0]}</div>
        <div class="muted" style="font-size:12px; margin-top:4px;">${p.split(' – ')[1] || ''}</div>
      </div>
      <button class="seg ${p===active? 'on' : '' }" data-phone="${p}">${p===active? 'Verbunden' : 'Verbinden'}</button>
    </div>
  `).join('');

  // Wire up buttons
  inner.querySelectorAll('[data-phone]').forEach(el=>{
    const btn = el.querySelector('button');
    if(!btn) return;
    btn.addEventListener('click', (e)=>{
      const phone = e.currentTarget.dataset.phone;
      let curr = localStorage.getItem(BT_KEY);
      if(curr === phone){
        // disconnect
        localStorage.removeItem(BT_KEY);
        curr = null;
      } else {
        localStorage.setItem(BT_KEY, phone);
        curr = phone;
      }
      // update UI
      document.getElementById('btActive').textContent = curr || 'Keines';
      // update topbar status as well
      try{ updateTopbarBluetooth(); }catch(e){}
      // refresh Phone UI if it's currently open (so it can switch between fallback and contacts view)
      try{ refreshPhoneUI(); }catch(e){}
      // refresh Message UI if it's currently open
      try{ refreshMessageUI(); }catch(e){}
      inner.querySelectorAll('.row-item').forEach(row=>{
        const rowBtn = row.querySelector('button');
        const p = row.dataset.phone;
        if(curr === p){ rowBtn.classList.add('on'); rowBtn.textContent = 'Verbunden'; }
        else { rowBtn.classList.remove('on'); rowBtn.textContent = 'Verbinden'; }
      });
    });
  });

  // enable inertia scrolling for the list
  if(listContainer) makeInertiaScroll(listContainer);
}

// Global function to refresh Phone UI if it's currently open
// This is called when Bluetooth connection status changes, so Phone can switch views
function refreshPhoneUI(){
  // Check if we're currently in the Phone submenu (title should contain "Telefon")
  const titleEl = document.querySelector('#toolbar #title');
  const phoneAppOpen = titleEl && titleEl.textContent.includes('Telefon');
  if(!phoneAppOpen) return; // not currently open, skip
  // re-render the phone submenu with updated BT status
  renderPhone();
}

// Global function to refresh Message UI if it's currently open
// This is called when Bluetooth connection status changes, so Messages can switch views
function refreshMessageUI(){
  const titleEl = document.querySelector('#toolbar #title');
  const msgAppOpen = titleEl && titleEl.textContent.includes('Nachricht');
  if(!msgAppOpen) return;
  renderMessage();
}

/* ===== Start mit Kacheln ===== */
renderHome();

// Clock updater for the topbar
function startClock(){
  const el = document.getElementById('clock');
  if(!el) return;
  function tick(){
    const now = new Date();
    // format HH:MM
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false };
    el.textContent = now.toLocaleTimeString('de-DE', opts);
  }
  tick();
  setInterval(tick, 1000);
}
startClock();

// Update the topbar with current Bluetooth device and a simple signal indicator.
function updateTopbarBluetooth(){
  const BT_KEY = 'bluetooth_active_v1';
  const el = document.getElementById('btStatus');
  if(!el) return;
  const raw = localStorage.getItem(BT_KEY);
  if(!raw){ el.textContent = 'Kein Handy verbunden'; el.title = 'Kein Handy verbunden'; return; }
  // shorten long names for topbar space
  const short = raw.length > 28 ? raw.slice(0,25) + '…' : raw;
  // show a simple LTE label as reception indicator
  el.textContent = `${short} LTE`;
  el.title = raw;
}

// initialize topbar bluetooth status on startup
// Ensure default: no phone connected (clear any persisted device on startup)
const BLUETOOTH_FORCE_NO_DEFAULT = true;
if(BLUETOOTH_FORCE_NO_DEFAULT){ try{ localStorage.removeItem('bluetooth_active_v1'); }catch(e){} }
try{ updateTopbarBluetooth(); }catch(e){}
