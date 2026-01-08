<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Dongle&family=Exo:ital,wght@0,100..900;1,100..900&family=SUSE:ital,wght@0,100..900;1,100..900&family=Tilt+Neon&display=swap" rel="stylesheet">
<style>
  :root {
  --bg-main: #f4f5f2;
  --bg-card: #ffffff;
  --green-dark: #2f5d46;
  --green-mid: #5f8f73;
  --green-light: #e3ede6;
  --accent: #c9b458;
  --text-main: #1f2a24;
  --text-muted: #6b7c72;
}
html, body {
  height: 100%;
  margin: 0;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  margin: 0;
}

main.page {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

button {
  background: var(--green-dark);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}
button:hover { background: #0056b3; }
button:disabled { background: #6c757d; cursor: not-allowed; }

.status { margin-top: 10px; min-height: 24px; font-weight: bold;}

#quiz,
#quiz-config,
#quiz-summary {
  display: none;
}

/* ===============================
   Quiz Status
   =============================== */
#quiz-status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: var(--text-muted);
  font-weight: bold;
  font-size: 1.125rem; /* 18px */
  gap: 1rem;
}
#category-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
/* ===============================
   Kategorien-Buttons
   =============================== */

#category-section {
  flex: 1 1 auto; 
  display: flex;
  flex-direction: column;
  min-height: 0; /* wichtig, damit Flex-Kind wächst */
}

#category-buttons {
  display: grid;
  flex: 1;                /* füllt den gesamten verfügbaren Raum im #category-section */
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;    /* alle Reihen gleich hoch */
  gap: 0;
  min-height: 0;          /* damit Flexbox richtig rechnet */
  margin: 0;
  padding: 0;
  flex: 1 1 auto; 
}

.category-button {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;          /* Grid-Zelle komplett ausfüllen */
  aspect-ratio: 3 / 2;
}
.category-button::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;

  /* Verlauf: unten dunkler → nach oben transparent */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.25) 35%,
    rgba(0, 0, 0, 0) 100%
  );

  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;   /* über dem Bild … */
}
.category-button:hover::before {
  opacity: 1;
}
.category-button img {
  display: block;         /* entfernt kleine Lücken */
  width: 100%;
  height: 100%;
  object-fit: cover;      /* Bild füllt den Container komplett */
  transition: transform 0.5s ease;
  border-radius: 0;       /* kein Radius */
  transform: translateZ(0); /* subtile Rendering-Glättung */
}

.category-button:hover img {
  transform: scale(1.06); /* sanftes Zoomen bei Hover */
}

/* Label unten links */
.category-label {
  position: absolute;
  left: 20px;        /* Abstand vom linken Rand */
  bottom: 16px;      /* Abstand vom unteren Rand */
  padding: 4px 6px;
  color: #fff;
  pointer-events: none;
  font-size: 14px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: auto;
  max-width: 90%;    /* passt sich der Grid-Zelle an */
  border-radius: 0;  /* kein Radius */
  box-sizing: border-box;
}

/* Titel innerhalb Label */
.category-label .cat_title {
  font-size: 18px;
  font-weight: 700;
}

/* Untertitel einblenden bei Hover */
.category-label .cat_untertitel {
  font-size: 12px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.5s ease, max-height 0.5s ease;
}

.category-button:hover .cat_untertitel {
  opacity: 1;
  max-height: 40px;
}

/* -------------------
   Responsive Anpassungen
   ------------------- */
@media (max-width: 1300px) {
  #category-buttons {
    grid-template-columns: repeat(2, 1fr); /* 2 Spalten auf Tablet */
    grid-auto-rows: 1fr;
    height: auto;
  }
}



/* ===============================
   Quiz-Karte
   =============================== */
#quiz {
  --quiz-content-width: clamp(280px, 80vw, 600px);
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  width: 90%;
  margin: 2rem auto;
  padding:
    clamp(0.4rem, 1vh, 0.6rem)
    clamp(1rem, 3vw, 1.75rem);
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 95svh;
  width: 100%;
  max-width: var(--quiz-content-width);
  margin-left: auto;
  margin-right: auto;
  padding-bottom: clamp(0.4rem, 1vh, 0.6rem);
}
@media (max-height: 900px) {
  #quiz {
    --quiz-content-width: clamp(260px, 65vw, 480px);
  }
}

@media (max-height: 800px) {
  #quiz {
    --quiz-content-width: clamp(240px, 60vw, 420px);
  }
}

@media (max-height: 700px) {
  #quiz {
    --quiz-content-width: clamp(220px, 55vw, 360px);
  }
}

@media (max-height: 650px) {
  #quiz {
    --quiz-content-width: clamp(200px, 50vw, 300px);
  }
}

@media (max-height: 550px) {
  #quiz {
    --quiz-content-width: clamp(180px, 45vw, 260px);
  }
}


#quiz-status-wrapper {
  display: flex;
  justify-content: flex-start;  /* linksbündig im Wrapper */
  width: 100%;
  margin: 0 auto 10px;          /* zentriert in Quiz-Karte, Abstand unten */
  gap: 1rem;                     /* optional */
  color: var(--text-muted);
  font-weight: bold;
  flex-shrink: 1;
  line-height: 1.1;
  margin-bottom: 0.25rem;
  max-width: var(--quiz-content-width);
  margin-left: auto;
  margin-right: auto;

}

#quiz-status {
  display: flex;
  justify-content: flex-start;      /* linksbündig im eigenen Container */
  width: 100%;           
  margin: 0 auto 5px;              /* zentriert in der Quiz-Karte, Abstand unten */
  gap: 1rem;
  color: var(--text-muted);
  font-weight: bold;
  box-sizing: border-box;   
  flex-shrink: 1;
  font-size: clamp(0.8rem, 1.8vh, 1.125rem);
  line-height: 1.1;
  margin-bottom: 0.25rem;        /* damit Padding korrekt gerechnet wird */
  max-width: var(--quiz-content-width);
  margin-left: auto;
  margin-right: auto;

}


/* ===============================
   Bilder & Hinweise
   =============================== */
#image-wrapper-container { display: inline-block; position: relative; }

#image-wrapper {
  aspect-ratio: 3 / 2;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 0 auto 1rem;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  flex: 1 1 auto;
  max-height: 50svh;
  min-height: 160px;
  max-width: var(--quiz-content-width);
  margin-left: auto;
  margin-right: auto;

}

img { 
  margin-bottom: 10px; 
  border-radius: 5px; 
}

#image-toggle-hint {
  position: absolute;
  bottom: 100%;
  right: 4px;
  margin-bottom: 2px;
  color: black;
  font-size: 0.75rem;
  padding: 1px 5px;
  pointer-events: none;
  white-space: nowrap;
}

#species-image.preview { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  transform: none !important; 
}

#species-image.detail { 
  width: auto; 
  height: auto; 
  object-fit: unset; 
}

/* ===============================
   Input & Antwort
   =============================== */
input[type="text"] {
  width: 80%;
  border: 2px solid #dde3dd;
  background: #fff;
  color: var(--text-main);
  max-width: var(--quiz-content-width);
  margin-left: auto;
  margin-right: auto;
  font-size: clamp(0.85rem, 2.1vh, 1.125rem);
  padding: clamp(0.45rem, 1.8vh, 0.875rem)
           clamp(0.65rem, 2.5vh, 1.125rem);

  border-radius: clamp(0.5rem, 1.5vh, 0.875rem);
}

#question-area{
  margin-bottom: 6%;
}

#answer-container {
  min-height: 0;
  flex-shrink: 1;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#answer-container .revealed-answer {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--green-mid);
  text-align: center;
  display: inline-block;
}

.mc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  flex-shrink: 1;
  gap: clamp(0.4rem, 1.5vh, 1rem);
  margin-top: clamp(0.4rem, 1.2vh, 1.25rem);
  max-width: var(--quiz-content-width);
  margin-left: auto;
  margin-right: auto;

}

.mc-option {
  border-radius: 14px;
  background: #fff;
  border: 2px solid #dde3dd;
  cursor: pointer;
  text-align: center;
  width: 100%;
  padding: clamp(0.5rem, 1.5vh, 1rem) 0;
}

/* Hover für noch aktive Optionen */
.mc-option:not(.disabled):hover {
  border-color: var(--green-dark);
  background-color: var(--green-light);
  color: var(--text-main);
}

/* Wissenschaftlicher Name kleiner und in Klammern unter Trivialname */
.mc-scientific {
  display: block;
  font-style: italic;
  font-size: 14px;
  margin-top: 5px;
  color: inherit; /* passt sich Button-Farbe an */
}

/* Richtig/Falsch bleibt unverändert */
.mc-option.correct {
  background: var(--green-dark);
  border-color: var(--green-dark);
  color: white;
}
.mc-option.correct .mc-trivial,
.mc-option.correct .mc-scientific {
  color: #ffffff;
}

.mc-option.wrong {
  background: #c41425;
  border-color: #c41425;
  color: white;
}
.mc-option.wrong .mc-trivial,
.mc-option.wrong .mc-scientific {
  color: #ffffff;
}

.mc-trivial { 
  font-size: clamp(0.8rem, 1.9vh, 1rem);
  line-height: 1.15;
}

.mc-scientific { 
  font-style: italic; 
  font-size: clamp(0.7rem, 1.5vh, 0.875rem);
  line-height: 1.1;
  color: var(--text-muted); 
}

.mc-option.correct { background: var(--green-dark); border-color: var(--green-dark); color: #fff; }
.mc-option.correct .mc-trivial, .mc-option.correct .mc-scientific { color: #fff; }
.mc-option.wrong { background: #c41425; border-color: #c41425; color: #fff; }
.mc-option.wrong .mc-trivial, .mc-option.wrong .mc-scientific { color: #fff; }

.mc-option.disabled { 
  pointer-events: none; 
  opacity: 1; 
}

/* ===============================
   Buttons unten
   =============================== */
#button-container {
  margin-top: auto;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: clamp(0.4rem, 1.2vh, 0.625rem);
  flex-shrink: 0;
  padding-bottom: 0;
  padding-top: clamp(0.4rem, 1.2vh, 0.8rem);
}

#button-container button {
  font-size: clamp(0.85rem, 2.1vh, 1.125rem);
  padding: clamp(0.45rem, 1.8vh, 0.95rem)
           clamp(0.9rem, 3vh, 1.75rem);
  border-radius: clamp(0.5rem, 1.4vh, 0.75rem);
}

#reveal-button {
  background: var(--accent);
  color: #2b2b2b;
}

#next-button {
  background: var(--accent);
  color: #2b2b2b;
}

/* Standard: große Bildschirme */
/* Wrapper um Quiz-Karte + Button */
#quiz-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* linksbündig */
  margin-top: 20px;        /* Abstand unter Nav-Leiste */
}

#abort-button {
  display: none;               /* initially hidden */
  position: absolute;          /* Position relativ zum nächsten positioned ancestor (z.B. body) */
  top: 100px;                   /* Abstand unter der Nav-Leiste */
  left: 20px;                  /* Abstand vom linken Rand */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #c41425;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

}

/* ≤1300px: nur optisch ggf. anpassen, bleibt zentriert */
@media (max-width: 1150px) {
  #abort-button {
    margin: 1rem auto 0;
    display: none;              /* initially hidden */
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: #c41425;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    position: relative;          /* Position relativ zum nächsten positioned ancestor (z.B. body) */
    top: auto;                   /* Abstand unter der Nav-Leiste */
    left: auto; 
  }
}




/* ===============================
   Foto-Credits
   =============================== */
#photo-meta, #photo-id, #photo-credit {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 8px;
}

/* ===============================
   Media Queries für Smartphones & Tablets
   =============================== */

@media (max-width: 750px), (orientation: portrait) {
  #quiz { width: 90%; margin: 1rem auto; padding: 1.25rem; }

  input[type="text"] { width: 100%; }
   #category-buttons { 
    grid-template-columns: 1fr; 
    grid-auto-rows: 1fr; /* statt auto */
    min-height: 0;       /* wichtig für Flexbox */
  }
  #button-container {
    position: static;   /* NICHT mehr absolut */
    width: 100%;
    margin-top: 1rem;
  }
  .category-label .cat_title { font-size: 1rem; }
  .category-label .cat_untertitel { font-size: 0.75rem; }
  button { font-size: 1rem; padding: 0.75rem 1.25rem; }
  #quiz-status,
  #quiz-status-wrapper,
  .mc-grid{
    width: 100%;
  }
  #image-wrapper{
    width: 100%;
    max-height: 30svh;
  }
  input[type="text"] {
    width: 70%;
  }
  #quiz{
    background: none;
      border-radius: 0;
      box-shadow: none;
  }
  .quiz-summary-card{
   margin: 20px;
  }
  #detail-overlay {
    display: none;               /* initially hidden */
    position: fixed;             /* über die gesamte Seite */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  #detail-overlay img {
    max-width: 95%;
    max-height: 95%;
    object-fit: contain;
    touch-action: pinch-zoom; /* erlaubt Pinch-Zoom auf Touchscreens */
    cursor: grab;
  }
  #answer-container {
    min-height: 40px;
    margin-bottom: 0.75rem;
  }

}

@media (max-width: 400px), (orientation: portrait) {
  .category-label .cat_title { font-size: 0.875rem; }
  .category-label .cat_untertitel { font-size: 0.7rem; }
  button { font-size: 0.875rem; padding: 0.5rem 1rem; }
}

.page {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
}



/* --- Obere Menüleiste --- */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 2000;
  background: var(--bg-card);
  border-bottom: 1px solid #dde3dd;
  flex-shrink: 0;
}

.top-nav-inner {
  max-width: 100%;
  margin: 0 auto;
  padding: 0.4% 10%;
  display: flex;
  align-items: baseline;
  gap: 54px;
}

.nav-primary {
  color: var(--green-dark);
  text-decoration: none;
  font-family: "Cairo", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-variation-settings:
    "slnt" 0;
  font-size: 35px;
}

.nav-secondary {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 16px;
}

.nav-secondary:hover {
  color: var(--green-dark);
}
h1 {
  font-size: 36px;
  margin-bottom: 10px;
}
.slider-container {
  width: 50%;
  margin: 40px auto;
  text-align: center;
}

.custom-slider {
  display: flex;
  position: relative;
  height: 40px;
  background: #eee;
  border-radius: 8px;
  user-select: none;
}

.slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 8px;
  position: relative;
}

.slider-option {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  font-weight: 600;
}

.slider-thumb {
  position: absolute;
  top: 0;
  width: 25%; /* 4 Optionen */
  height: 100%;
  background: #5f8f73;
  border-radius: 8px;
  transition: left 0.2s;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  pointer-events: none; /* damit Klicks auf Optionen gehen */
}

.slider-value {
  margin-top: 5px;
  font-weight: bold;
}
.slider-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.slider-buttons button {
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  background: #d6d6d6;      /* dunkleres Grau */
  color: #1f2a24;           /* dunkle Schrift */
  cursor: pointer;
  font-weight: 600;
  font-size: 20px;
  transition: background 0.2s, color 0.2s;
}

.slider-buttons button.active {
  background: #5f8f73;      /* Grün wie vorher */
  color: white;
}
#start-quiz-btn {
  font-size: 25px;
  padding: 20px 40px;
}
#back-to-categories {
  position: absolute;
  top: 0;
  left: 20px;
  background: #c41425;
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
#quiz-config {
  display: none;
  margin-top: 20px;
  position: relative; /* nötig für absolute Positionierung des Back-Buttons */
  padding: 20px;
  background: var(--bg-main);
  border-radius: 12px;
}
.config-category-title {
  font-size: 38px;      /* größer */
  margin: 30px 0 18px;  /* etwas Abstand */
  color: var(--green-dark);
}
.config-category-subtitle{
  font-size: 26px;
}

.slider-container {
  width: 100%;
  max-width: 400px;
}

#category-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
    min-height: calc(100vh - var(--nav-height) - var(--footer-height));
}


#category-section p {
  color: var(--text-muted);
  margin-bottom: 0px;
}
#start-quiz-btn {
  display: block;      /* Block-Level für margin auto */
  margin: 40px auto 0; /* oben Abstand, horizontal zentriert */
  font-size: 25px;
  padding: 20px 40px;
  background: var(--green-dark);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.quiz-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
#quiz-summary {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: none;               /* wichtig */
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.quiz-summary-card {
  background: var(--bg-main);
  padding: 48px 40px;
  border-radius: 16px;
  max-width: 520px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.25);

  display: flex;
  flex-direction: column;
  gap: 28px;              /* 🔹 Hauptabstand */
}
.quiz-summary-card h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}
.summary-item {
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
}
.summary-image {
  max-width: 70%;
  margin: 0 auto 14px;
  display: block;
  border-radius: 12px;
}

/* Klassen je nach Ergebnis */
.summary-image.perfect {
  content: url("img/100.jpg");
}

.summary-image.great {
  content: url("img/80.jpg");
}

.summary-image.good {
  content: url("img/50.jpg");
}

.summary-image.okay {
  content: url("img/25.jpg");
}

.summary-image.oops {
  content: url("img/0.jpg");
}
.summary-image.perfect { content: url("https://djstoxqzmcgwqjliubst.supabase.co/storage/v1/object/public/Fotos/Zusammenfassung/HPR_7042-DxO_DeepPRIME%20XD2s_XD.webp"); }
.summary-image.great    { content: url("https://djstoxqzmcgwqjliubst.supabase.co/storage/v1/object/public/Fotos/Zusammenfassung/Vulpes_vulpes_ssp_fulvus_6568085.jpg"); }
.summary-image.good     { content: url("https://djstoxqzmcgwqjliubst.supabase.co/storage/v1/object/public/Fotos/Zusammenfassung/Pica_pica_Oulu_Finland_2020-09-20.jpg"); }
.summary-image.okay     { content: url("https://djstoxqzmcgwqjliubst.supabase.co/storage/v1/object/public/Fotos/Zusammenfassung/Sciurus_vulgaris_185836872.jpg"); }
.summary-image.oops     { content: url("https://djstoxqzmcgwqjliubst.supabase.co/storage/v1/object/public/Fotos/Zusammenfassung/Bufo_bufo_2015_G3.jpg"); }

.summary-image {
  width: 70%;       /* Breite anpassen */
  height: auto; 
  object-fit: contain; /* skaliert das Bild proportional, füllt Container ohne Verzerrung */
  display: block;
  margin: 0 auto 14px;
  border-radius: 12px;
}
.summary-quote {
  text-align: center;
  font-style: italic;
  margin: 10px 0 20px;
  font-size: 1rem;
  color: #5f8f73;
}

#photo-id {
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 12px;
  color: #fff;
  padding: 4px 8px;
  border-radius: 8px;
}

#photo-credit {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  color: #fff;
  padding: 4px 8px;
  border-radius: 8px;
}

footer {
  background: var(--bg-card);
  border-top: 1px solid #dde3dd;
  text-align: center;
  padding: 16px 0;
  color: var(--text-muted);
  font-size: 14px;
  position: static;
}


footer a {
  color: var(--text-muted);
  text-decoration: none;
}

footer a:hover {
  color: var(--green-dark);
  text-decoration: underline;
}

</style>
</head>
<body>
  <nav class="top-nav">
  <div class="top-nav-inner">
    <a href="index.html" class="nav-primary">Fauna Quiz</a>
    <a href="info.html" class="nav-secondary">Weitere Informationen</a>
  </div>
</nav>
<main class="page">


<div id="category-section">
  <div id="category-buttons"></div>
  <p id="category-loading">Lade Kategorien...</p>
</div>
<button id="abort-button" style="background:#c41425; color:white;">Quiz abbrechen</button>
<div id="quiz" class="top-offset" style="display:none;">
  <div id="quiz-status">
    <div id="quiz-timer" style="display: none;">00:00</div>
    <div id="quiz-counter">0 / 0 Richtig</div>
  </div>
  <div id="image-wrapper-container">
    <div id="image-toggle-hint">Zum Vergrößern des Bildes klicken</div>
    <div id="image-wrapper">
        <img id="species-image" src="" alt="" style="display:none;" />
        <span id="photo-id"></span>
        <span id="photo-credit"></span>
    </div>
  </div>
  <!-- Overlay für Detailbild auf kleinen Bildschirmen -->
  <div id="detail-overlay">
    <img id="detail-image" src="" alt="">
  </div>

  <div id="question-area" style="display:none;">
    <div id="answer-container"></div>
    <div id="button-container">
      <button id="reveal-button" style="background:#1e9d20; color:white;">Auflösen</button>
      <button id="next-button" style="display:none;">Weiter</button>
    </div>
    <div class="status" id="status"></div>
  </div>
</div>




<!-- Konfigurationsbereich, zunächst versteckt -->
<div id="quiz-config">
  <h2 id="config-category-title" class="config-category-title"></h2><br><br>
  <h3 class="config-category-subtitle">Quiz-Einstellungen</h3>
<button id="back-to-categories">Zurück</button>
<div class="slider-container">
  <label style="font-size: 20px;">max. Anzahl von Bildern:</label>
  <div id="num-photos-buttons" class="slider-buttons">
  <button data-value="10">10</button>
  <button data-value="30">30</button>
  <button data-value="60">60</button>
  <button data-value="100">100</button>
  <button data-value="all">Alle</button>
</div>

</div>

<div class="slider-container">
  <label style="font-size: 20px;">Schwierigkeitslevel:</label>
  <div id="difficulty-buttons" class="slider-buttons">
    <button data-value="1">1</button>
    <button data-value="2">2</button>
    <button data-value="3">3</button>
    <button data-value="all">Egal</button>
  </div>
</div>

<div class="slider-container">
  <label style="font-size: 20px;">Antwortmodus:</label>
  <div id="answer-mode-buttons" class="slider-buttons">
    <button data-value="mc">Multiple Choice</button>
    <button data-value="text">Texteingabe</button>
  </div>
</div>


  <button id="start-quiz-btn">Quiz starten</button>
</div>


<div id="quiz-summary" class="quiz-overlay" style="display:none;">
  <div class="quiz-summary-card">

    <!-- Spruch oben -->
    <br><h2 id="summary-quote" class="summary-quote"></h2><br>

    <div class="summary-item">
      <span id="summary-count"></span>
    </div>
    
    <div class="summary-item">
      <span id="summary-time"></span>
    </div>

    <button id="back-to-overview-btn">Weiter zur Übersicht</button>
  </div>
</div>





<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
const DETAIL_FUNCTION_URL = "https://djstoxqzmcgwqjliubst.supabase.co/functions/v1/get-image-url";
const SUPABASE_URL = "https://djstoxqzmcgwqjliubst.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc3RveHF6bWNnd3FqbGl1YnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMDYxMDcsImV4cCI6MjA4MDY4MjEwN30.05Ud16jCrf1ib8IpoVwd84sv0NSvpes-T7Rz1khtzRE";
const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const categorySectionEl = document.getElementById('category-section');
const categoryButtonsEl = document.getElementById('category-buttons');
const categoryLoadingEl = document.getElementById('category-loading');
const quizEl = document.getElementById('quiz');
const imageEl = document.getElementById('species-image');
const questionAreaEl = document.getElementById('question-area');
const revealButtonEl = document.getElementById('reveal-button');
const nextButtonEl = document.getElementById('next-button');
const statusEl = document.getElementById('status');
const categoriesWithConfig = ["Tagfalter", "Libellen", "Amphibien", "Reptilien", "Säugetiere", "Nachtfalter"];
const quizConfigEl = document.getElementById("quiz-config");
const startQuizBtn = document.getElementById("start-quiz-btn");
const speciesImageEl = document.getElementById('species-image');
const imageHintEl = document.getElementById('image-toggle-hint');
const overlay = document.getElementById('detail-overlay');
const detailImg = document.getElementById('detail-image');
const speciesImage = document.getElementById('species-image');

imageEl.style.cursor = "pointer";
const SCALE = 0.8; // Detailbild auf 80% der Originalgröße

let answerInputEl = null;
let currentItem = null;
let currentCategory = null;
let imageQueue = [];
let currentIndex = 0;
let correctCount = 0;
let shownCount = 0;
let totalShown = 0;
let quizStartTime = null;
let quizTimerInterval = null;
let showingDetail = false;
let startMouseX = 0;
let startMouseY = 0;
let startTranslateX = 0;
let startTranslateY = 0;
let dragActive = false;
let speciesMap = {};
let speciesOrder = [];
let speciesPointer = 0;
let quizLength = null;
let selectedCategory = null;
let selectedAnswerMode = "mc"; // Standard  

// =========================
// Utility Funktionen
// =========================


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalize(str) { return String(str||'').trim().toLowerCase().replace(/[-\s]/g,''); }

function levenshtein(a,b){ const m=[]; for(let i=0;i<=b.length;i++) m[i]=[i]; for(let j=0;j<=a.length;j++) m[0][j]=j; for(let i=1;i<=b.length;i++) for(let j=1;j<=a.length;j++) m[i][j]=b[i-1]===a[j-1]?m[i-1][j-1]:Math.min(m[i-1][j-1]+1,m[i][j-1]+1,m[i-1][j]+1); return m[b.length][a.length]; }

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;}
initConfigButtons();

function setImageAndWait(img, src) {
  return new Promise(resolve => {
    if (img.src === src && img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.src = src;
    }
  });
}
async function loadDetailImage(path) {
  if (!path || typeof path !== "string") {
    console.warn("Kein Detailpfad vorhanden");
    return null;
  }

    const res = await fetch(`${DETAIL_FUNCTION_URL}?path=${encodeURIComponent(path)}`, {
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!res.ok) {
    console.warn("Detailbild nicht gefunden:", path);
    return null;
  }

  const data = await res.json();
  return data.url || null;
}



// =========================
// QUIZ KERNLOGIK
// =========================

function nextImage() {
  const availableSpecies = Object.keys(speciesMap).filter(
    art => speciesMap[art].shownPointer < speciesMap[art].photos.length
  );

  if (availableSpecies.length === 0) return null;

  // Jede Art einmal, bevor Wiederholung
  if (speciesPointer >= speciesOrder.length) {
    speciesPointer = 0;
    speciesOrder = shuffle(availableSpecies);
  }

  // Ungültige Arten überspringen
  while (
    speciesPointer < speciesOrder.length &&
    !speciesMap[speciesOrder[speciesPointer]]
  ) {
    speciesPointer++;
  }

  if (speciesPointer >= speciesOrder.length) {
    return nextImage();
  }

  const art = speciesOrder[speciesPointer];
  speciesPointer++;

  const entry = speciesMap[art];
  if (!entry) return nextImage();

  // 👉 alle Fotos dieser Art, die noch nicht gezeigt wurden
  const remaining = entry.photos.filter(
    p => !shownPhotos.has(p.url_vorschau)
  );

  // Wenn alle Fotos verbraucht → Art raus
  if (remaining.length === 0) {
    delete speciesMap[art];
    return nextImage();
  }

  // 👉 Zufällig eines der noch unbenutzten Fotos
  const photo = remaining[Math.floor(Math.random() * remaining.length)];

  shownPhotos.add(photo.url_vorschau);

  return photo;
}


function getDistractors(correctItem, allItems) {
  const phy = correctItem.phylogeny || [];
  const correctSpecies = correctItem.scientific_name;
  let candidates = [];

  for (let i = phy.length - 1; i >= 0; i--) {
    const group = phy[i];
    const matches = allItems.filter(it =>
      it.scientific_name !== correctSpecies &&
      Array.isArray(it.phylogeny) &&
      it.phylogeny[i] === group
    );
    candidates.push(...matches);
    if (uniqueBySpecies(candidates).length >= 3) break;
  }

  if (uniqueBySpecies(candidates).length < 3) {
    const catMatches = allItems.filter(it =>
      it.scientific_name !== correctSpecies &&
      it.category === correctItem.category
    );
    candidates.push(...catMatches);
  }

  return shuffle(uniqueBySpecies(candidates)).slice(0, 3);
}

function uniqueBySpecies(items) {
  const seen = new Set();
  return items.filter(it => {
    if (seen.has(it.scientific_name)) return false;
    seen.add(it.scientific_name);
    return true;
  });
}

function formatSpeciesLabel(item) {
  const sci = item.scientific_name;
  const triv =
    Array.isArray(item.trivialname) && item.trivialname.length
      ? item.trivialname[0]
      : null;

  if (triv) {
    return `${triv} <em>(${sci})</em>`;
  }
  return `<em>${sci}</em>`;
}


// =========================
// UI-Hilfsfunktionen
// =========================

function resetUI() {
  const container = document.getElementById('answer-container');
  container.innerHTML = '';

  statusEl.textContent = '';
  revealButtonEl.style.display = 'none';
  nextButtonEl.style.display = 'none';
}

function renderImage(item) {
  imageEl.classList.remove("detail");
  imageEl.classList.add("preview");
  imageEl.style.transform = "translate(0,0)";
  imageEl.src = item.url_vorschau;

  imageEl.onload = () => {
    imageEl.style.display = 'block';
    questionAreaEl.style.display = 'block';
    document.getElementById('photo-id').textContent =
    currentItem.id_nummer ? `# ${currentItem.id_nummer}` : '';

    document.getElementById('photo-credit').textContent =
      item.author ? `© ${item.author}` : '';
  };
}

function resetImageState() {
  showingDetail = false;

  imageEl.className = "preview";

  imageEl.style.width = "";
  imageEl.style.height = "";
  imageEl.style.transform = "";
  imageEl.style.objectFit = "";
  imageEl.style.visibility = "visible";
}

function focusAnswer() {
  const input = document.getElementById("answer-input");
  if (input) input.focus();
}


// =========================
// Eingabelogik
// =========================

function buildAnswerUI(item) {
  const container = document.getElementById('answer-container');
  container.innerHTML = "";     // 👈 sauber machen

  if (selectedAnswerMode === "text") {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'answer-input';
    input.placeholder = 'Namen eingeben...';
    input.autocomplete = 'off';
    input.spellcheck = false;

    container.appendChild(input);
    answerInputEl = input;

    input.focus();              // 👈 richtig!
    input.addEventListener("input", checkAnswer);

    revealButtonEl.style.display = 'inline-block';
    return;
  }


  // Multiple Choice
  const correctItem = item;
  const distractors = getDistractors(item, imageQueue);
  const answerItems = shuffle([correctItem, ...distractors]);

  const grid = document.createElement("div");
  grid.className = "mc-grid";

  answerItems.forEach(opt => {
    const option = document.createElement("div");
    option.className = "mc-option";
    option.dataset.sciname = opt.scientific_name;

    const trivial =
      Array.isArray(opt.trivialname) && opt.trivialname.length
        ? opt.trivialname[0]
        : opt.scientific_name;

    option.innerHTML = `
      <span class="mc-trivial">${trivial}</span><br>
      <span class="mc-scientific">(${opt.scientific_name})</span>
    `;

    option.onclick = () =>
      handleMCClick(option, opt.scientific_name === correctItem.scientific_name);

    grid.appendChild(option);
  });

  container.appendChild(grid);
}

// --- Antwort prüfen ---
function checkAnswer() {
  if (!currentItem || !answerInputEl) return;

  const val = answerInputEl.value.trim();
  if (!val) return;

  const normInput = normalize(val);
  const normSci = normalize(currentItem.scientific_name);
  const trivialNames = Array.isArray(currentItem.trivialname)
    ? currentItem.trivialname.map(n => normalize(n))
    : [];

  // Early return, wenn Eingabe noch zu kurz
  if (normInput.length < normSci.length && !trivialNames.some(tn => normInput.length >= tn.length)) return;

  const tolerantMatch = (input, target) =>
    input.length >= target.length && (input === target || levenshtein(input, target) <= 1);

  const okSci = tolerantMatch(normInput, normSci);
  const okTriv = trivialNames.some(tn => tolerantMatch(normInput, tn));

  if (okSci || okTriv) {
    answerInputEl.disabled = true;
    correctCount++;
    updateQuizStatus();
    setTimeout(() => {
      if (totalShown >= quizLength) {
        endQuiz();
      } else {
        loadNextImage();
      }
    }, 300);
  }
}


function handleMCClick(clickedOption, isCorrect) {
  const options = document.querySelectorAll(".mc-option");
  const correctSciName = currentItem.scientific_name;

  options.forEach(opt => {
    opt.classList.add("disabled");
    if (opt.dataset.sciname === correctSciName) {
      opt.classList.add("correct");
    }
  });

  resetImageState();

  if (isCorrect) {
    correctCount++;
    updateQuizStatus();
    setTimeout(() => {
      if (totalShown >= quizLength) {
        endQuiz();
      } else {
        loadNextImage();
      }
    }, 800);
  } else {
    clickedOption.classList.add("wrong");
    nextButtonEl.style.display = "inline-block";
    nextButtonEl.onclick = () => {
      if (totalShown >= quizLength) {
        endQuiz();
      } else {
        loadNextImage();
      }
    };
  }
}



// --- Auflösen ---
function revealAnswer() {
  if (!currentItem) return;

  const tn = Array.isArray(currentItem.trivialname) && currentItem.trivialname.length
    ? currentItem.trivialname[0]
    : currentItem.scientific_name;

  const scientific = currentItem.scientific_name;

  document.getElementById('answer-container').innerHTML = `
    <span class="revealed-answer">${tn} <em>(${scientific})</em></span>
  `;

  revealButtonEl.style.display = 'none';
  nextButtonEl.style.display = 'inline-block';
  nextButtonEl.onclick = loadNextImage;
}



// =========================
// Detailbild-Logik
// =========================


imageEl.addEventListener("click", async (e) => {
  if (window.innerWidth <= 750) return; // <--- Mobile: nichts tun (Overlay hat eigenen Listener)
  e.stopPropagation();
  if (!currentItem) return;

  const wrapper = document.getElementById("image-wrapper");
  const rect = wrapper.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;  


  // ZURÜCK ZUR VORSCHAU

  if (showingDetail) {
  showingDetail = false;

  imageEl.className = "preview";

  // 🔴 ALLE Detail-Styles entfernen
  imageEl.style.width = "";
  imageEl.style.height = "";
  imageEl.style.transform = "translate(0,0)";
  imageEl.style.objectFit = "";

  await setImageAndWait(imageEl, currentItem.url_vorschau);
  imageEl.style.visibility = "visible";
  setTimeout(focusAnswer, 0);
  updateImageHint();
  return;
  }


  // DETAIL ANZEIGEN

  showingDetail = true;
  imageEl.className = "detail";
  imageEl.style.visibility = "hidden";

  const detailUrl = await loadDetailImage(currentItem.url_detail);
  if (!detailUrl) {
  console.warn("Fallback auf Vorschau");
  return; // KEIN Zustandswechsel!
  }
  await setImageAndWait(imageEl, detailUrl);

  const imgW = imageEl.naturalWidth * SCALE;
  const imgH = imageEl.naturalHeight * SCALE;

  imageEl.style.width = imgW + "px";
  imageEl.style.height = imgH + "px";
  imageEl.style.objectFit = "unset";

  const relX = mouseX / rect.width;
  const relY = mouseY / rect.height;

  const tx = Math.min(0, Math.max(rect.width - imgW, -relX * (imgW - rect.width)));
  const ty = Math.min(0, Math.max(rect.height - imgH, -relY * (imgH - rect.height)));

  imageEl.style.transform = `translate(${tx}px, ${ty}px)`;

  // Referenz speichern für eventuelle Drag-Optimierung (optional)
  startTranslateX = tx;
  startTranslateY = ty;

  imageEl.style.visibility = "visible";
  setTimeout(focusAnswer, 0);

  // Referenz für Mousemove
  startMouseX = mouseX;
  startMouseY = mouseY;
  startTranslateX = tx;
  startTranslateY = ty;

  // Hinweis aktualisieren
  updateImageHint();
});

document.getElementById("image-wrapper").addEventListener("mousemove", (e) => {
  if (!showingDetail) return;

  const wrapper = e.currentTarget;
  const rect = wrapper.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const imgW = imageEl.offsetWidth;
  const imgH = imageEl.offsetHeight;

  const relX = mouseX / rect.width;
  const relY = mouseY / rect.height;

  const moveX = Math.min(0, Math.max(rect.width - imgW, -relX * (imgW - rect.width)));
  const moveY = Math.min(0, Math.max(rect.height - imgH, -relY * (imgH - rect.height)));

  imageEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

function updateImageHint() {
  const hintEl = document.getElementById("image-toggle-hint");
  if (!hintEl) return;

  // Prüfen, ob gerade Detailbild angezeigt wird
  if (showingDetail) {
    hintEl.textContent = "click to zoom out ⤵";
  } else {
    hintEl.textContent = "click to zoom in ⤵";
  }
}


// Beispiel: beim Setzen eines neuen Bildes
function setImage(src, isDetail=false) {
  imageEl.src = src;
  imageEl.style.display = "block";
  imageEl.classList.toggle("detail", isDetail);
  imageEl.classList.toggle("preview", !isDetail);
  updateImageHint();
}

// Und am Ende deines bestehenden Klickhandlers für das Bild
// einfach einmal aufrufen, damit der Text wechselt
updateImageHint();

speciesImage.addEventListener('click', () => {
  if (window.innerWidth <= 950) {
    // KLEINE SCREENS: Overlay öffnen
    detailImg.src = speciesImage.src;
    overlay.style.display = 'flex';

    // alte Desktop-Logik deaktivieren
    return; // verhindert, dass die Mousemove-Logik ausgeführt wird
  }

  // GROSSE SCREENS: bestehende Desktop-Detailbild-Logik
  showDetailDesktop(speciesImage.src);
});


// Klick auf Overlay schließt es wieder
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  detailImg.src = ''; // Optional: vorheriges Bild zurücksetzen
});

// =========================
// Kategorien & Laden der Daten
// =========================

// --- Kategorien laden ---
async function loadCategories() {
  categoryButtonsEl.innerHTML = "";
  categoryLoadingEl.textContent = "Lade Kategorien...";

  const { data, error } = await client
    .from("species_media")
    .select("category, url_vorschau, cat_untertitel")
    .eq("filetype", "image")
    .eq("titelbild", "ja");

  if (error || !data) {
    categoryLoadingEl.textContent = "Fehler beim Laden";
    return;
  }

  const uniqueCategories = [...new Set(data.map(d => d.category))];

  uniqueCategories.forEach(cat => {
    const images = data.filter(d => d.category === cat);
    const catImage =
      images[Math.floor(Math.random() * images.length)]?.url_vorschau || "";

    const btn = document.createElement("div");
    btn.className = "category-button";
    btn.onclick = () => onCategoryClick(cat);

    const img = document.createElement("img");
    img.src = catImage;
    img.alt = cat;

    const label = document.createElement("div");
    label.className = "category-label";

    label.innerHTML = `
      <div class="cat_title">${cat}</div>
      <div class="cat_untertitel">${images[0]?.cat_untertitel || ""}</div>
    `;

    // >>> richtig: zuerst Inhalt in den Button
    btn.appendChild(img);
    btn.appendChild(label);

    // >>> dann Button in die Liste
    categoryButtonsEl.appendChild(btn);
  });

  categoryLoadingEl.textContent = "";
}

function showQuizConfig(category) {
  selectedCategory = category;
  document.getElementById("config-category-title").textContent =
  `${category}`;
  categorySectionEl.style.display = "none";
  quizConfigEl.style.display = "block";
  selectedAnswerMode = "mc"; // immer Multiple Choice als Standard
  document.querySelectorAll("#answer-mode-buttons button").forEach(b =>
  b.classList.toggle("active", b.dataset.value === selectedAnswerMode)
  );

  // Vorauswahl setzen
  selectedNumPhotos = "10";
  selectedDifficulty = "1";
  document.querySelectorAll("#num-photos-buttons button").forEach(b =>
  b.classList.toggle("active", b.dataset.value === selectedNumPhotos)
  );
  document.querySelectorAll("#difficulty-buttons button").forEach(b =>
  b.classList.toggle("active", b.dataset.value === selectedDifficulty)
  );
}

// Anpassung der Kategorie-Auswahl
function onCategoryClick(category) {
  hideQuizSummary(); // wichtig

  selectedCategory = category;

  if (categoriesWithConfig.includes(category)) {
    // 👉 Konfigurationsfläche anzeigen
    showQuizConfig(category);
  } else {
    // 👉 direkt Quiz starten (altes Verhalten)
    startQuizDirect(category);
  }
}

function initConfigButtons() {
  selectedNumPhotos = "10";    // Standardwert
  selectedDifficulty = "1";    // Standardwert

  const backToCategoriesBtn = document.getElementById("back-to-categories");

  backToCategoriesBtn.onclick = () => {
  quizConfigEl.style.display = "none";
  categorySectionEl.style.display = "block";
  loadCategories();
  };


  // Anzahl-Fotos Buttons
  document.querySelectorAll("#num-photos-buttons button").forEach(btn => {
    if(btn.dataset.value === selectedNumPhotos) btn.classList.add("active");
    btn.addEventListener("click", () => {
      selectedNumPhotos = btn.dataset.value;
      document.querySelectorAll("#num-photos-buttons button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Schwierigkeit Buttons
  document.querySelectorAll("#difficulty-buttons button").forEach(btn => {
    if(btn.dataset.value === selectedDifficulty) btn.classList.add("active");
    btn.addEventListener("click", () => {
      selectedDifficulty = btn.dataset.value;
      document.querySelectorAll("#difficulty-buttons button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Antwortmodus Buttons
  document.querySelectorAll("#answer-mode-buttons button").forEach(btn => {
    if (btn.dataset.value === selectedAnswerMode) btn.classList.add("active");
    btn.addEventListener("click", () => {
      selectedAnswerMode = btn.dataset.value;
      document.querySelectorAll("#answer-mode-buttons button")
      .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

}



// =========================
// Start-/Setup-Funktionen
// =========================


startQuizBtn.onclick = async () => {
  currentCategory = selectedCategory;
  const numPhotos = selectedNumPhotos;
  quizLength = numPhotos === "all" ? Infinity : parseInt(numPhotos, 10);
  const difficulty = selectedDifficulty;

  quizConfigEl.style.display = "none";
  categorySectionEl.style.display = "none";
  hideQuizSummary();

  // Supabase-Abfrage
  let query = client.from('species_media')
    .select('*')
    .eq('filetype','image')
    .eq('category', selectedCategory);

  if(difficulty !== "all") query = query.eq('difficulty', difficulty);

  const { data, error } = await query;
  if(error || !data || data.length === 0){
    alert('Keine Bilder für diese Auswahl gefunden.');
    return;
  }

  // Alle Bilder mischen
  let filteredImages = shuffle(data);

  // Quiz-Variablen initialisieren
  imageQueue = filteredImages;
  currentIndex = 0;
  correctCount = 0;
  shownCount = 0;
  totalShown = 0;
  shownPhotos = new Set();
  speciesMap = {};
  speciesOrder = [];
  speciesPointer = 0;

  // Artenmap vorbereiten
  for (const item of imageQueue) {
    const art = item.scientific_name;
    if (!speciesMap[art]) speciesMap[art] = { photos: [], shownPointer: 0 };
    speciesMap[art].photos.push(item);
  }

  // Alle Fotos je Art mischen
  for (const art in speciesMap) {
    speciesMap[art].photos = shuffle(speciesMap[art].photos);
  }

  // Pool der Arten für den Quizzyklus
  const allSpecies = Object.keys(speciesMap);
  const numSpeciesInQuiz = Math.min(allSpecies.length, quizLength);
  speciesOrder = shuffle(allSpecies).slice(0, numSpeciesInQuiz);
  speciesPointer = 0;

  updateQuizStatus();          // Counter sofort aktualisieren
  document.getElementById("quiz-status").style.display = "flex"; // Statusleiste sichtbar
  document.getElementById("abort-button").style.display = "block";
  quizEl.style.display = "block";

  startTimer();
  loadNextImage();
};

function startQuizDirect(category) {
  selectedCategory = category;
  selectedNumPhotos = "all";
  selectedDifficulty = "all";

  hideQuizSummary();
  categorySectionEl.style.display = "none";
  quizConfigEl.style.display = "none";

  startQuizBtn.click(); // bewusst
}




// =========================
// Quiz-Flow
// =========================

// --- Timer Funktionen ---
function startTimer() {
  quizStartTime = Date.now();
}

function stopTimer() {
  clearInterval(quizTimerInterval);
}

function updateTimer() {
  const diffSec = Math.floor((Date.now() - quizStartTime) / 1000); // Sekunden ganzzahlig
  const minutes = String(Math.floor(diffSec / 60)).padStart(2, '0');
  const seconds = String(diffSec % 60).padStart(2, '0');
  document.getElementById('quiz-timer').textContent = `${minutes}:${seconds}`;
}

// --- Counter aktualisieren ---
function updateQuizStatus() {
  document.getElementById('quiz-counter').textContent = `${correctCount} / ${shownCount} Richtig`;
}

// --- Nächstes Bild ---
function loadNextImage() {
  // 🔄 Immer zuerst zurück in den Vorschau-Modus
  showingDetail = false;

  imageEl.className = "preview";
  imageEl.style.width = "";
  imageEl.style.height = "";
  imageEl.style.objectFit = "";
  imageEl.style.transform = "translate(0,0)";

  if (totalShown >= quizLength) {
    endQuiz();
    return;
  }

  currentItem = nextImage();
  if (!currentItem) {
    endQuiz();
    return;
  }

  shownCount++;
  totalShown++;

  resetUI();
  renderImage(currentItem);
  buildAnswerUI(currentItem);

  updateQuizStatus();
}


// --- Quiz beenden ---
function endQuiz() {
  clearInterval(quizTimerInterval);
  showQuizSummary();
  document.getElementById("abort-button").style.display = "none";
}

function showQuizSummary() {
  quizEl.style.display = "none";
  document.getElementById("quiz-status").style.display = "none";

  const durationSec = Math.floor((Date.now() - quizStartTime) / 1000);
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;

  // ⭐ Spruch oben je nach Quote
  const rate = (correctCount / totalShown) * 100;
  let quote = "";

  if (rate === 100) quote = "Glanzleistung!";
  else if (rate >= 80) quote = "Großartig, da hat nicht viel gefehlt!";
  else if (rate >= 50) quote = "Du scheinst dich schon ganz gut auszukennen, probier's doch gleich nochmal!";
  else if (rate >= 25) quote = "Ein solides Ergebnis, aber kannst du das noch toppen?";
  else quote = "Aller Anfang ist schwer, aber Übung macht den Meister!";

  document.getElementById("summary-quote").textContent = quote;

  // ✅ Satz mit Anzahl richtig
  document.getElementById("summary-count").textContent =
    `Du hast ${correctCount} von ${totalShown} Bildern richtig bestimmt!`;

  // ✅ Dauer mit Leerzeichen
  document.getElementById("summary-time").textContent =
    `Dauer: ${minutes}:${String(seconds).padStart(2,"0")} Minuten`;

  // Summary anzeigen
  document.getElementById("quiz-summary").style.display = "flex";
}

function hideQuizSummary() {
  const summary = document.getElementById("quiz-summary");
  if (summary) summary.style.display = "none";
}



// ==========================
// EVENT-LISTENER
// ==========================


// --- Quiz abbrechen ---
document.getElementById("abort-button").onclick = () => {
  endQuiz();
};

document.getElementById("back-to-overview-btn").onclick = () => {
  document.getElementById("quiz-summary").style.display = "none";
  quizEl.style.display = "none";
  quizConfigEl.style.display = "none";

  categorySectionEl.style.display = "flex";  // Flex für min-height
  loadCategories();
};


revealButtonEl.onclick=revealAnswer;
loadCategories();
</script>
</main>
<footer>
  <div class="page">
    <a href="impressum.html">Impressum</a>
  </div>
</footer>
</body>
</html>
