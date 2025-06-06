const TRANSLATIONS = {
  es: {
    "main-title": "Cómo validar ideas de negocio con herramientas digitales",
    "footer-designed": "Diseñado y desarrollado por Hassir Lastre Sierra",
    "transformacion-title": "Transformación de la validación de ideas de negocio",
    "old-validation": "ANTES: Lento y Costoso",
    "new-validation": "HOY: Rápido y Ágil",
    "old-highlight": "Resultado: Alta incertidumbre porque muchas ideas fracasaban.",
    "new-highlight": "Resultado: Toma de decisiones con datos + reducción de costos.",
    "transformacion-note": "💡 <strong class=\"text-accent\">Consejo:</strong> La validación digital no es solo una tendencia, es una revolución.",
    "que-es-poc-title": "¿Qué es una Prueba de Concepto (PoC)?",
    "poc-objetivo-title": "Objetivo",
    "poc-objetivo-content": "Demostrar la <strong>viabilidad práctica</strong> de una idea, hipótesis o principio antes de una inversión significativa y responde a preguntas como: ¿Es técnicamente factible? o ¿Puede esta tecnología resolver el problema?<br><br><strong>Recuerda</strong>, el objetivo es reducir la incertidumbre y aumentar las probabilidades de éxito.",
    "poc-enfoque-title": "Enfoque",
    "poc-enfoque-content": "Se enfoca en demostrar la <strong>funcionalidad central</strong> o la viabilidad de la tecnología subyacente, no en un producto pulido.",
    "comparacion-title": "PoC vs. Prototipo vs. MVP",
    "tecnologias-title": "Tecnologías digitales para tu PoC",
    "metodologias-title": "Metodologías ágiles para tu PoC",
    "metodologias-note": "💡 <strong class=\"text-accent\">Consejo:</strong> ¡Combina principios de varias metodologías!",
    "herramientas-title": "Herramientas esenciales para tu kit",
    "casos-title": "Casos de éxito",
    "casos-leccion": "<strong class=\"text-accent\"> 🔑 Lección:</strong> No siempre se necesita tecnología compleja para una validación efectiva.",
    "beneficios-title": "Beneficios de validar con herramientas digitales",
    "podcast-title": "Profundiza con nuestro podcast",
    "podcast-desc": "¿Prefieres escuchar? Dale play a este episodio donde se explora a fondo la Prueba de Concepto (PoC) y su importancia en el proceso de validación de ideas innovadoras.",
    "cta-title": "¡Ahora te Toca a Ti!",
    "cta-subtitle": "El mundo digital ofrece un arsenal de herramientas para que transformes tus ideas en realidades validadas.",
    "cta-guia": "Descargar Guía PoC",
    "cta-plantilla": "Descargar Plantilla PoC"
  },
  en: {
    "main-title": "How to Validate Business Ideas with Digital Tools",
    "footer-designed": "Designed and developed by Hassir Lastre Sierra",
    "transformacion-title": "Transformation of Business Idea Validation",
    "old-validation": "BEFORE: Slow and Costly",
    "new-validation": "NOW: Fast and Agile",
    "old-highlight": "Result: High uncertainty because many ideas failed.",
    "new-highlight": "Result: Data-driven decisions + cost reduction.",
    "transformacion-note": "💡 <strong class=\"text-accent\">Tip:</strong> Digital validation is not just a trend, it's a revolution.",
    "que-es-poc-title": "What is a Proof of Concept (PoC)?",
    "poc-objetivo-title": "Objective",
    "poc-objetivo-content": "Demonstrate the <strong>practical viability</strong> of an idea, hypothesis, or principle before significant investment and answer questions like: Is it technically feasible? or Can this technology solve the problem?<br><br><strong>Remember</strong>, the goal is to reduce uncertainty and increase the chances of success.",
    "poc-enfoque-title": "Approach",
    "poc-enfoque-content": "Focuses on demonstrating the <strong>core functionality</strong> or the viability of the underlying technology, not a polished product.",
    "comparacion-title": "PoC vs. Prototype vs. MVP",
    "tecnologias-title": "Digital technologies for your PoC",
    "metodologias-title": "Agile methodologies for your PoC",
    "metodologias-note": "💡 <strong class=\"text-accent\">Tip:</strong> Combine principles from several methodologies!",
    "herramientas-title": "Essential tools for your kit",
    "casos-title": "Success stories",
    "casos-leccion": "<strong class=\"text-accent\"> 🔑 Lesson:</strong> You don't always need complex technology for effective validation.",
    "beneficios-title": "Benefits of validating with digital tools",
    "podcast-title": "Go deeper with our podcast",
    "podcast-desc": "Prefer to listen? Play this episode where we explore the Proof of Concept (PoC) and its importance in validating innovative ideas.",
    "cta-title": "Now It's Your Turn!",
    "cta-subtitle": "The digital world offers a toolkit to turn your ideas into validated realities.",
    "cta-guia": "Download PoC Guide",
    "cta-plantilla": "Download PoC Template"
  }
};

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  const t = TRANSLATIONS[lang];

  // Títulos y textos principales
  if (document.getElementById("main-title")) document.getElementById("main-title").innerHTML = t["main-title"];
  if (document.getElementById("footer-designed")) document.getElementById("footer-designed").innerHTML = t["footer-designed"];
  if (document.getElementById("transformacion-title")) document.getElementById("transformacion-title").innerHTML = t["transformacion-title"];
  if (document.getElementById("que-es-poc-title")) document.getElementById("que-es-poc-title").innerHTML = t["que-es-poc-title"];
  if (document.getElementById("comparacion-title")) document.getElementById("comparacion-title").innerHTML = t["comparacion-title"];
  if (document.getElementById("tecnologias-title")) document.getElementById("tecnologias-title").innerHTML = t["tecnologias-title"];
  if (document.getElementById("metodologias-title")) document.getElementById("metodologias-title").innerHTML = t["metodologias-title"];
  if (document.getElementById("herramientas-title")) document.getElementById("herramientas-title").innerHTML = t["herramientas-title"];
  if (document.getElementById("casos-title")) document.getElementById("casos-title").innerHTML = t["casos-title"];
  if (document.getElementById("beneficios-title")) document.getElementById("beneficios-title").innerHTML = t["beneficios-title"];
  if (document.getElementById("podcast-title")) document.getElementById("podcast-title").innerHTML = t["podcast-title"];
  if (document.getElementById("cta-title")) document.getElementById("cta-title").innerHTML = t["cta-title"];
  if (document.getElementById("cta-desc")) document.getElementById("cta-desc").innerHTML = t["cta-subtitle"];

  // Sección transformación
  const oldVal = document.querySelector('.old-validation');
  if (oldVal) oldVal.innerHTML = t["old-validation"];
  const newVal = document.querySelector('.new-validation');
  if (newVal) newVal.innerHTML = t["new-validation"];
  const oldHighlight = document.querySelector('.old-highlight');
  if (oldHighlight) oldHighlight.innerHTML = t["old-highlight"];
  const newHighlight = document.querySelector('.new-highlight');
  if (newHighlight) newHighlight.innerHTML = t["new-highlight"];
  const transformNote = document.querySelector('.section-note');
  if (transformNote && transformNote.closest("#transformacion")) transformNote.innerHTML = t["transformacion-note"];

  // PoC sección
  const pocObjTitle = document.querySelector('#poc-details-1 .interactive-title');
  if (pocObjTitle) pocObjTitle.innerHTML = t["poc-objetivo-title"];
  const pocObjContent = document.querySelector('#poc-details-1 .details-panel');
  if (pocObjContent) pocObjContent.innerHTML = `<p>${t["poc-objetivo-content"]}</p>`;
  const pocEnfTitle = document.querySelector('#poc-details-2 .interactive-title');
  if (pocEnfTitle) pocEnfTitle.innerHTML = t["poc-enfoque-title"];
  const pocEnfContent = document.querySelector('#poc-details-2 .details-panel');
  if (pocEnfContent) pocEnfContent.innerHTML = `<p>${t["poc-enfoque-content"]}</p>`;

  // Metodologías nota
  const metodNote = document.querySelector('#metodologias-agiles .section-note');
  if (metodNote) metodNote.innerHTML = t["metodologias-note"];

  // Casos de éxito lección
  const casosLeccion = document.querySelector('#casos-exito .section-note');
  if (casosLeccion) casosLeccion.innerHTML = t["casos-leccion"];

  // Podcast
  if (document.getElementById("podcast-title")) document.getElementById("podcast-title").innerHTML = t["podcast-title"];
  const podcastDesc = document.querySelector('.audio-player-wrapper p');
  if (podcastDesc) podcastDesc.innerHTML = t["podcast-desc"];

  // CTA
  if (document.getElementById("cta-title")) document.getElementById("cta-title").innerHTML = t["cta-title"];
  if (document.getElementById("cta-desc")) document.getElementById("cta-desc").innerHTML = t["cta-subtitle"];
  const ctaBtns = document.querySelectorAll('.btn-resource');
  if (ctaBtns.length >= 2) {
    ctaBtns[0].innerHTML = `<i class="fas fa-book-open btn-icon"></i> ${t["cta-guia"]}`;
    ctaBtns[1].innerHTML = `<i class="fas fa-file-alt btn-icon"></i> ${t["cta-plantilla"]}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Si tienes un selector de idioma personalizado, úsalo, si no, fuerza español
  const selector = document.getElementById("language-selector");
  let lang = "es";
  if (selector) {
    selector.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
    lang = selector.value;
  }
  setLanguage("es");
});
