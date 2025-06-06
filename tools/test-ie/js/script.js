/**
 * Script para el Test de Inteligencia Emocional integrado con el sitio web de Hassir Lastre
 * Adaptado para funcionar junto con los elementos del sitio principal
 */

// --- Firebase configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyCrUPp4SlzJLnAgpuAcMLQEWihPCyVpSwc",
    authDomain: "test-inteligencia-emocional.firebaseapp.com",
    projectId: "test-inteligencia-emocional",
    storageBucket: "test-inteligencia-emocional.firebasestorage.app",
    messagingSenderId: "221906777252",
    appId: "1:221906777252:web:0b5b2d7fb50eae2b216231",
    measurementId: "G-3XMX5RCND4"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Preguntas y categorías ---
const questions = [
    "Me conozco a mí mismo, sé lo que pienso, lo que siento y lo que hago.",
    "Soy capaz de auto motivarme para aprender, estudiar, aprobar, conseguir algo.",
    "Cuando las cosas me van mal, mi estado de ánimo aguanta hasta que las cosas vayan mejor.",
    "Llego a acuerdos razonables con otras personas cuando tenemos posturas enfrentadas.",
    "Sé qué cosas me ponen alegre y qué cosas me ponen triste.",
    "Sé lo que es más importante en cada momento.",
    "Cuando hago las cosas bien me felicito a mí mismo.",
    "Cuando los demás me provocan intencionadamente soy capaz de no responder.",
    "Me fijo en el lado positivo de las cosas, soy optimista.",
    "Controlo mis pensamientos, pienso lo que de verdad me interesa.",
    "Hablo conmigo mismo, en voz baja claro.",
    "Cuando me piden que diga o haga algo que me parece inaceptable me niego a hacerlo.",
    "Cuando alguien me critica injustamente me defiendo adecuadamente con el diálogo.",
    "Cuando me critican por algo que es justo lo acepto porque tienen razón.",
    "Soy capaz de quitarme de la mente las preocupaciones que me obsesionan.",
    "Me doy cuenta de lo que dicen, piensan y sienten las personas más cercanas a mí (amigos, compañeros, familiares…)",
    "Valoro las cosas buenas que hago.",
    "Soy capaz de divertirme y pasármelo bien allí donde esté.",
    "Hay cosas que no me gusta hacer pero sé que hay que hacerlas y las hago.",
    "Soy capaz de sonreír.",
    "Tengo confianza en mí mismo, en lo que soy capaz de hacer, pensar y sentir.",
    "Soy una persona activa, me gusta hacer cosas.",
    "Comprendo los sentimientos de los demás.",
    "Mantengo conversaciones con la gente.",
    "Tengo buen sentido del humor.",
    "Aprendo de los errores que cometo.",
    "En momentos de tensión y ansiedad soy capaz de relajarme y tranquilizarme para no perder el control y actuar apresuradamente.",
    "Soy una persona realista con los ofrecimientos que hago, sabiendo qué cosa puedo cumplir y qué no me será posible hacer.",
    "Cuando alguien se muestra muy nervioso/a o exaltado/a lo calmo y tranquilizo.",
    "Tengo las ideas muy claras sobre lo que quiero.",
    "Controlo bien mis miedos y temores.",
    "Si he de estar solo no me agobio por eso.",
    "Formo parte de algún grupo o equipo de deporte o de ocio para compartir intereses o aficiones.",
    "Sé cuáles son mis defectos y cómo cambiarlos.",
    "Soy creativo, tengo ideas originales y las desarrollo.",
    "Sé qué pensamientos son capaces de hacerme sentir feliz, triste, enfadado, altruista, angustiado.",
    "Soy capaz de aguantar bien la frustración cuando no consigo lo que me propongo.",
    "Me comunico bien con la gente con la que me relaciono.",
    "Soy capaz de comprender el punto vista de los demás.",
    "Identifico las emociones que expresa la gente a mi alrededor.",
    "Soy capaz de verme a mí mismo desde la perspectiva de los otros.",
    "Me responsabilizo de las cosas que hago.",
    "Me adapto a las nuevas situaciones, aunque me cuesten algún cambio en mi manera de sentir las cosas.",
    "Creo que soy una persona equilibrada emocionalmente.",
    "Tomo decisiones sin dudar ni titubear demasiado."
];

const resultCategories = [
    { range: [0, 20], category: "MUY BAJO", interpretation: "Con esta puntuación debes saber que todavía no conoces suficientemente qué emociones son las que vives, no valoras adecuadamente tus capacidades, que seguramente tienes. Son muchas las habilidades que no pones en práctica, y son necesarias para que te sientas más a gusto contigo mismo y para que las relaciones con la gente sean satisfactorias." },
    { range: [21, 35], category: "BAJO", interpretation: "Tu puntaje muestra que aún estás en proceso de fortalecer tus habilidades emocionales. Te vendrá bien profundizar en tu autoconocimiento y reconocer todo tu potencial. Entender qué sientes, aprender a gestionarlo y expresarlo de forma adecuada, así como percibir las emociones de los demás, es esencial para sentirte bien y desplegar tu personalidad con mayor efectividad." },
    { range: [36, 45], category: "MEDIO-BAJO", interpretation: "Estás muy cerca de lo ideal en tus habilidades emocionales. Sabes bien lo que piensas, haces y sientes, y ya manejas bastante bien tus emociones y tu forma de comunicarte con los demás. Aún así, no te quedes ahí: aprovecha este impulso para seguir creciendo y afinar aún más tu inteligencia emocional." },
    { range: [46, 79], category: "MEDIO-ALTO", interpretation: "Tu puntuación es muy buena. Demuestra que te conoces a fondo: entiendes cómo te emocionas, gestionas tus sentimientos y reconoces esas mismas emociones en los demás. Gracias a esto mantienes relaciones saludables, expresando lo que sientes de forma adecuada y atendiendo a lo que necesitan las personas que te rodean. Sigue aprovechando estas habilidades para reforzar aún más tus vínculos y tu bienestar emocional." },
    { range: [80, 90], category: "MUY ALTO", interpretation: "¡Eres todo un maestro de tus emociones! Tu puntuación refleja que dominas por completo tu inteligencia emocional: sabes quién eres, qué quieres y cómo te sientes en cada momento. Te valoras como te mereces, gestionas tus estados de ánimo con soltura y, lo más impresionante, te comunicas con claridad y empatía. Además, tienes un don para resolver esos pequeños conflictos del día a día y mantener un clima de entendimiento a tu alrededor. ¡Sigue brillando así!" }
];

// --- Estado del usuario ---
let userData = {
    demographic: {},
    answers: [],
    result: { score: 0, category: "", interpretation: "" },
    timestamp: ""
};

// --- Inicialización principal ---
document.addEventListener('DOMContentLoaded', function() {
    // Navbar sólida
    const navbar = document.querySelector('.topheader');
    if (navbar) navbar.classList.add('solid');

    setupDarkModeToggle();
    setupFormSelects();
    setupNavigationButtons();
    loadProgress();
    generateAllQuestions();
    setInterval(saveProgress, 30000);
});

/* --- Funciones de UI y lógica del test --- */

// Alternar modo oscuro
function setupDarkModeToggle() {
    const darkModeButton = document.getElementById('dark-mode-toggle');
    if (!darkModeButton) return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    darkModeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        this.innerHTML = isDarkMode ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
}

// Botones de navegación del test
function setupNavigationButtons() {
    const startTestBtn = document.getElementById('start-test-btn');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', function() {
            if (validateDemographicData()) showInstructions();
        });
    }
    const showQuestionsBtn = document.getElementById('show-questions-btn');
    if (showQuestionsBtn) {
        showQuestionsBtn.addEventListener('click', showQuestions);
    }
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const score = calculateResults();
            if (score !== null) showResults(score);
        });
    }
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', showThankYouMessage);
    }
    const newTestBtn = document.getElementById('new-test-btn');
    if (newTestBtn) {
        newTestBtn.addEventListener('click', resetTest);
    }
}

// Selectores del formulario
function setupFormSelects() {
    const selects = document.querySelectorAll('.form-group select');
    selects.forEach(select => {
        if (!select.value) select.classList.add('empty');
        select.addEventListener('change', function() {
            if (!this.value) this.classList.add('empty');
            else this.classList.remove('empty');
        });
    });
}

// Escapa texto para evitar XSS en resultados dinámicos
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validación básica de formulario demográfico
function validateDemographicForm(e) {
  const age = document.getElementById('age').value;
  if (!/^\d{2,3}$/.test(age)) {
    alert('Edad inválida');
    e.preventDefault();
    return false;
  }
  // ...agregar validaciones para otros campos si es necesario...
  return true;
}

// Validación de datos demográficos
function validateDemographicData() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const occupation = document.getElementById('occupation').value;
    if (!age || !gender || !education || !occupation) {
        alert("Por favor, complete todos los campos demográficos.");
        return false;
    }
    userData.demographic = { age, gender, education, occupation };
    saveProgress();
    return true;
}

// Mostrar instrucciones
function showInstructions() {
    const demographicForm = document.getElementById('demographic-section');
    const instructions = document.getElementById('test-instructions');
    const intro = document.querySelector('.intro');
    demographicForm.style.opacity = '0';
    demographicForm.style.transform = 'translateY(20px)';
    setTimeout(() => {
        demographicForm.style.display = 'none';
        if (intro) intro.style.display = 'none';
        instructions.style.display = 'block';
        void instructions.offsetWidth;
        instructions.style.opacity = '1';
        instructions.style.transform = 'translateY(0)';
    }, 300);
}

// Mostrar preguntas
function showQuestions() {
    const instructions = document.getElementById('test-instructions');
    const testContainer = document.getElementById('test-container');
    const progressIndicator = document.getElementById('progress-indicator');
    const submitBtn = document.getElementById('submit-btn');
    const intro = document.querySelector('.intro');
    instructions.style.opacity = '0';
    instructions.style.transform = 'translateY(20px)';
    setTimeout(() => {
        instructions.style.display = 'none';
        if (intro) intro.style.display = 'none';
        testContainer.style.display = 'block';
        progressIndicator.style.display = 'block';
        progressIndicator.style.visibility = 'visible';
        progressIndicator.style.opacity = '1';
        submitBtn.style.display = 'block';
        submitBtn.style.visibility = 'visible';
        submitBtn.style.opacity = '1';
        updateProgressIndicator(countAnsweredQuestions());
        void testContainer.offsetWidth;
        testContainer.style.opacity = '1';
        testContainer.style.transform = 'translateY(0)';
    }, 300);
}

// Contar preguntas respondidas
function countAnsweredQuestions() {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
        const options = document.getElementsByName(`q${i}`);
        for (let j = 0; j < options.length; j++) {
            if (options[j].checked) {
                count++;
                break;
            }
        }
    }
    return count;
}

// Generar preguntas
function generateAllQuestions() {
    const container = document.getElementById('test-container');
    if (!container) return;
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question fade-transition';
        questionDiv.innerHTML = `
            <div class="question-text">${index + 1}. ${question}</div>
            <div class="options">
                <label class="option">
                    <input type="radio" name="q${index}" value="0" aria-label="Nunca: ${question}"> Nunca
                </label>
                <label class="option">
                    <input type="radio" name="q${index}" value="1" aria-label="Algunas veces: ${question}"> Algunas veces
                </label>
                <label class="option">
                    <input type="radio" name="q${index}" value="2" aria-label="Siempre: ${question}"> Siempre
                </label>
            </div>
        `;
        container.appendChild(questionDiv);
        setTimeout(() => {
            questionDiv.classList.add('fade-in');
        }, 20 * index);
    });
    setupVisualFeedback();
    document.addEventListener('change', function(event) {
        if (event.target.type === 'radio') {
            updateProgressIndicator(countAnsweredQuestions());
            saveProgress();
        }
    });
}

// Feedback visual para radios
function setupVisualFeedback() {
    document.querySelectorAll('.option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const questionDiv = this.closest('.question');
            questionDiv.style.backgroundColor = 'rgba(110, 142, 251, 0.05)';
            setTimeout(() => {
                questionDiv.style.backgroundColor = '';
            }, 300);
        });
    });
}

// Actualizar indicador de progreso
function updateProgressIndicator(answeredCount) {
    const totalQuestions = questions.length;
    const progressPercentage = (answeredCount / totalQuestions) * 100;
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    if (progressBarFill) progressBarFill.style.width = `${progressPercentage}%`;
    if (progressText) progressText.textContent = `Pregunta ${answeredCount} de ${totalQuestions}`;
}

// Calcular resultados
function calculateResults() {
    let totalScore = 0;
    let unansweredQuestions = [];
    let answers = [];
    for (let i = 0; i < questions.length; i++) {
        const options = document.getElementsByName(`q${i}`);
        let answered = false;
        let selectedValue = null;
        for (let j = 0; j < options.length; j++) {
            if (options[j].checked) {
                selectedValue = parseInt(options[j].value);
                totalScore += selectedValue;
                answered = true;
                break;
            }
        }
        if (answered) {
            answers.push({ questionIndex: i, question: questions[i], answer: selectedValue });
        }
        if (!answered) {
            unansweredQuestions.push(i + 1);
        }
    }
    if (unansweredQuestions.length > 0) {
        alert(`Por favor, responde a las siguientes preguntas: ${unansweredQuestions.join(', ')}`);
        return null;
    }
    userData.answers = answers;
    return totalScore;
}

// Mostrar resultados
function showResults(score) {
    document.getElementById('test-container').style.display = 'none';
    document.getElementById('progress-indicator').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    const resultsDiv = document.getElementById('results');
    const scoreSpan = document.getElementById('score');
    const categorySpan = document.getElementById('category');
    const interpretationDiv = document.getElementById('interpretation');
    const scoreBar = document.getElementById('score-bar');
    if (scoreSpan) scoreSpan.textContent = score;
    const percentage = (score / 90) * 100;
    if (scoreBar) scoreBar.style.width = `${percentage}%`;
    let category = null;
    for (const cat of resultCategories) {
        if (score >= cat.range[0] && score <= cat.range[1]) {
            category = cat;
            break;
        }
    }
    if (category) {
        if (categorySpan) categorySpan.textContent = category.category;
        if (interpretationDiv) interpretationDiv.textContent = category.interpretation;
        userData.result = {
            score: score,
            category: category.category,
            interpretation: category.interpretation
        };
    }
    userData.timestamp = new Date().toISOString();
    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        void resultsDiv.offsetWidth;
        resultsDiv.classList.add('fade-in');
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    saveUserDataToFirebase();
    saveProgress();
}

// Guardar datos en Firebase
function saveUserDataToFirebase() {
    showLoading();
    db.collection("test_results").add({
        demographic: userData.demographic,
        answers: userData.answers,
        result: userData.result,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    })
    .then(() => hideLoading())
    .catch(() => {
        hideLoading();
        alert("Hubo un error al guardar los datos. Por favor, inténtalo de nuevo más tarde.");
    });
}

// Guardar progreso en localStorage
function saveProgress() {
    localStorage.setItem('ei_test_demographic', JSON.stringify(userData.demographic));
    const answersToSave = [];
    for (let i = 0; i < questions.length; i++) {
        const options = document.getElementsByName(`q${i}`);
        for (let j = 0; j < options.length; j++) {
            if (options[j].checked) {
                answersToSave.push({ questionIndex: i, answer: options[j].value });
                break;
            }
        }
    }
    localStorage.setItem('ei_test_answers', JSON.stringify(answersToSave));
}

// Cargar progreso desde localStorage
function loadProgress() {
    const savedDemographic = localStorage.getItem('ei_test_demographic');
    if (savedDemographic) {
        try {
            const demographicData = JSON.parse(savedDemographic);
            if (demographicData.age) document.getElementById('age').value = demographicData.age;
            if (demographicData.gender) document.getElementById('gender').value = demographicData.gender;
            if (demographicData.education) document.getElementById('education').value = demographicData.education;
            if (demographicData.occupation) document.getElementById('occupation').value = demographicData.occupation;
            const selects = document.querySelectorAll('.form-group select');
            selects.forEach(select => {
                if (select.value) select.classList.remove('empty');
            });
            userData.demographic = demographicData;
        } catch (e) {}
    }
    const savedAnswers = localStorage.getItem('ei_test_answers');
    if (savedAnswers) {
        try {
            const answers = JSON.parse(savedAnswers);
            answers.forEach(answer => {
                const options = document.getElementsByName(`q${answer.questionIndex}`);
                for (let j = 0; j < options.length; j++) {
                    if (options[j].value === answer.answer) {
                        options[j].checked = true;
                        break;
                    }
                }
            });
            const answeredCount = answers.length;
            if (answeredCount > 0) updateProgressIndicator(answeredCount);
        } catch (e) {}
    }
}

// Mostrar mensaje de agradecimiento
function showThankYouMessage() {
    const resultsDiv = document.getElementById('results');
    const thankYouDiv = document.getElementById('thank-you');
    if (resultsDiv) {
        resultsDiv.style.opacity = '0';
        resultsDiv.style.transform = 'translateY(20px)';
    }
    setTimeout(() => {
        if (resultsDiv) resultsDiv.style.display = 'none';
        if (thankYouDiv) {
            thankYouDiv.style.display = 'block';
            void thankYouDiv.offsetWidth;
            thankYouDiv.style.opacity = '1';
            thankYouDiv.style.transform = 'translateY(0)';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 300);
}

// Reiniciar test
function resetTest() {
    for (let i = 0; i < questions.length; i++) {
        const options = document.getElementsByName(`q${i}`);
        for (let j = 0; j < options.length; j++) {
            options[j].checked = false;
        }
    }
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('education').value = '';
    document.getElementById('occupation').value = '';
    const selects = document.querySelectorAll('.form-group select');
    selects.forEach(select => select.classList.add('empty'));
    document.getElementById('results').style.display = 'none';
    document.getElementById('test-container').style.display = 'none';
    document.getElementById('test-instructions').style.display = 'none';
    document.getElementById('thank-you').style.display = 'none';
    document.getElementById('progress-indicator').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    document.querySelector('.test-header').style.display = 'block';
    document.getElementById('demographic-section').style.display = 'block';
    document.querySelector('.intro').style.display = 'block';
    const demographicSection = document.getElementById('demographic-section');
    if (demographicSection) {
        demographicSection.style.opacity = '1';
        demographicSection.style.transform = 'translateY(0)';
    }
    userData = {
        demographic: {},
        answers: [],
        result: { score: 0, category: "", interpretation: "" },
        timestamp: ""
    };
    localStorage.removeItem('ei_test_answers');
    localStorage.removeItem('ei_test_demographic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar/ocultar loading
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';
}
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}