const TRANSLATIONS = {
  es: {
    "home-greeting": "Hola, soy <span class='typed'></span>",
    "about-title": "Hassir Lastre Sierra",
    "about-description": `
      <br>
      Impulso la transformación de organizaciones y emprendedores conectando estrategia, datos e innovación para generar valor. Mi experiencia se nutre de la sinergia entre el rigor académico y la visión práctica del mundo empresarial.<br>
      <br>
      Soy doctor en Planeación Estratégica y Dirección de Tecnología, y también en Economía y Empresa, con una maestría en Administración Estratégica y una base sólida como Administrador de Empresas. Actualmente, como profesor-investigador reconocido por <a href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001630270" target="_blank" rel="noopener" class="cvlac-link">MinCiencias</a> y analista de datos, acompaño de cerca los procesos de transformación y crecimiento.<br>
      <br>
      Mi trayectoria profesional incluye roles como consultor, participación activa en proyectos de I+D+i, y una sólida producción académica con artículos, libros y capítulos centrados en estrategia, gestión organizacional, competitividad, turismo e innovación. He compartido estas perspectivas en eventos nacionales e internacionales como conferencista.<br>
    `,
    "services-title": "Servicios <span class=\"title-separator\">:</span> Soluciones estratégicas",
    "service1-title": "Consultoría y Asesoría",
    "service1-desc": "Gestión empresarial y estratégica, innovación, plan y modelo de negocios",
    "contact-title": "Contacto",
    "contact-text": "Contáctame a través de los siguientes medios",
    "footer-designed": "Diseñado y desarrollado por Hassir Lastre Sierra",
    "profiles-title": "Perfiles profesionales"
  },
  en: {
    "home-greeting": "Hi, I'm <span class='typed'></span>",
    "about-title": "Hassir Lastre Sierra",
    "about-description": "I drive the transformation of organizations and entrepreneurs by connecting strategy, data, and innovation to generate value. My experience is nourished by the synergy between academic rigor and practical business vision.<br><br>I hold a PhD in Strategic Planning and Technology Management, and also in Economics and Business, with a master's degree in Strategic Management and a solid foundation as a Business Administrator. Currently, as a professor-researcher and data analyst, I closely support transformation and growth processes.<br><br>My professional career includes roles as a consultant, active participation in R&D&I projects, and a solid academic output with articles, books, and chapters focused on strategy, organizational management, competitiveness, tourism, and innovation. I have shared these perspectives at national and international events as a speaker.<br>",
    "services-title": "Services <span class=\"title-separator\">:</span> Strategic Solutions",
    "service1-title": "Consulting and Advisory",
    "service1-desc": "Business and strategic management, innovation, business plan and model",
    "contact-title": "Contact",
    "contact-text": "Contact me through the following means",
    "footer-designed": "Designed and developed by Hassir Lastre Sierra",
    "profiles-title": "Professional profiles"
  }
};

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  for (const [id, text] of Object.entries(TRANSLATIONS[lang])) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
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
