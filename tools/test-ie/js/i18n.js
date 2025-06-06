const TRANSLATIONS = {
  es: {
    "test-title": "Test de Inteligencia Emocional",
    "test-intro": "Este test se basa en el modelo propuesto por José Andrés Ocaña en su obra Mapas mentales y estilos de aprendizaje (2010). Su objetivo es ayudarte a reconocer cómo gestionas tus emociones, identificar fortalezas y áreas de mejora en tus habilidades emocionales y ofrecerte una retroalimentación que potencie tu autoconocimiento.",
    "test-time": '<span class="time-icon">⏱️</span> Tiempo estimado: 5-10 minutos',
    "demographic-title": "Datos Demográficos",
    "instructions-title": "Instrucciones",
    "instructions-desc": "Responde con sinceridad cada enunciado, eligiendo la opción que mejor refleje tu conducta habitual; no hay respuestas correctas ni incorrectas, sino pautas para tu desarrollo personal. Marca la opción que mejor refleje tu comportamiento:",
    "opt-never": "<strong>Nunca</strong>: No lo hago en ninguna ocasión.",
    "opt-sometimes": "<strong>Algunas veces</strong>: Lo hago en algunas situaciones.",
    "opt-always": "<strong>Siempre</strong>: Lo hago de manera constante.",
    "results-title": "Resultados del Test",
    "score-label": "Tu puntuación es: <span id=\"score\"></span> puntos de 90 posibles",
    "thankyou-title": "¡Gracias por completar el test!",
    "thankyou-desc": "Tus respuestas han sido guardadas correctamente y los resultados ayudarán en el análisis de la inteligencia emocional.",
    "footer-designed": "Diseñado y desarrollado por Hassir Lastre Sierra"
  },
  en: {
    "test-title": "Emotional Intelligence Test",
    "test-intro": "This test is based on the model proposed by José Andrés Ocaña in his work 'Mind Maps and Learning Styles' (2010). Its goal is to help you recognize how you manage your emotions, identify strengths and areas for improvement in your emotional skills, and offer feedback to enhance your self-awareness.",
    "test-time": '<span class="time-icon">⏱️</span> Estimated time: 5-10 minutes',
    "demographic-title": "Demographic Data",
    "instructions-title": "Instructions",
    "instructions-desc": "Answer each statement honestly, choosing the option that best reflects your usual behavior; there are no right or wrong answers, only guidelines for your personal development. Select the option that best reflects your behavior:",
    "opt-never": "<strong>Never</strong>: I never do it.",
    "opt-sometimes": "<strong>Sometimes</strong>: I do it in some situations.",
    "opt-always": "<strong>Always</strong>: I do it consistently.",
    "results-title": "Test Results",
    "score-label": "Your score is: <span id=\"score\"></span> out of 90 possible points",
    "thankyou-title": "Thank you for completing the test!",
    "thankyou-desc": "Your answers have been saved correctly and the results will help in the analysis of emotional intelligence.",
    "footer-designed": "Designed and developed by Hassir Lastre Sierra"
  }
};

// Traducción de preguntas y resultados dinámicos
const QUESTIONS = {
  es: [
    "¿Reconozco fácilmente mis emociones cuando surgen?",
    "¿Puedo expresar cómo me siento con claridad?",
    // ...agrega todas las preguntas en español...
  ],
  en: [
    "Do I easily recognize my emotions as they arise?",
    "Can I clearly express how I feel?",
    // ...add all questions in English...
  ]
};

const RESULT_CATEGORIES = {
  es: [
    { min: 0, max: 30, label: "Área de mejora", interpretation: "Tienes oportunidades para fortalecer tu inteligencia emocional. Considera trabajar en el reconocimiento y gestión de tus emociones." },
    { min: 31, max: 60, label: "Nivel medio", interpretation: "Muestras habilidades emocionales en desarrollo. Sigue practicando para mejorar tu autoconocimiento y empatía." },
    { min: 61, max: 90, label: "Alto desarrollo", interpretation: "¡Excelente! Demuestras un alto nivel de inteligencia emocional. Mantén y comparte tus habilidades." }
  ],
  en: [
    { min: 0, max: 30, label: "Needs improvement", interpretation: "You have opportunities to strengthen your emotional intelligence. Consider working on recognizing and managing your emotions." },
    { min: 31, max: 60, label: "Intermediate level", interpretation: "You show developing emotional skills. Keep practicing to improve your self-awareness and empathy." },
    { min: 61, max: 90, label: "Highly developed", interpretation: "Excellent! You demonstrate a high level of emotional intelligence. Maintain and share your skills." }
  ]
};

// Cambia las preguntas dinámicamente según el idioma
function setDynamicQuestions(lang) {
  if (typeof window.renderQuestions === "function") {
    window.renderQuestions(QUESTIONS[lang]);
  }
}

// Traduce los resultados dinámicos según el idioma y puntaje
function getResultCategory(lang, score) {
  const cats = RESULT_CATEGORIES[lang];
  return cats.find(c => score >= c.min && score <= c.max) || cats[0];
}

// Modifica setLanguage para actualizar preguntas/resultados dinámicos
function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  for (const [id, text] of Object.entries(TRANSLATIONS[lang])) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
  }
  setDynamicQuestions(lang);
  // Si ya hay un resultado mostrado, actualiza la interpretación
  const scoreEl = document.getElementById("score");
  if (scoreEl && scoreEl.textContent) {
    const score = parseInt(scoreEl.textContent, 10);
    const cat = getResultCategory(lang, score);
    const catEl = document.getElementById("category");
    const interpEl = document.getElementById("interpretation");
    if (catEl) catEl.textContent = cat.label;
    if (interpEl) interpEl.textContent = cat.interpretation;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  if (!selector) return;
  selector.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
  // Set initial language based on browser or default
  const userLang = navigator.language.slice(0, 2);
  selector.value = TRANSLATIONS[userLang] ? userLang : "es";
  setLanguage(selector.value);
});
