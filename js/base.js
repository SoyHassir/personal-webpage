/* ============================
   Funciones y utilidades globales
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initDarkMode();
  initBackToTop();
  initServiceWorker();
});

/* Preloader global */
function initPreloader() {
  let preloader = document.querySelector('.preloader');
  if (!preloader) {
    preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="preloader-spinner"></div>';
    document.body.appendChild(preloader);
  }
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 500);
  });
}

/* Navegación global */
function initNavigation() {
  const menu = document.querySelector('.menu');
  const openMenuBtn = document.querySelector('.open-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const navBar = document.querySelector('.topheader');
  const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

  if (!menu || !openMenuBtn || !closeMenuBtn || !navBar) return;

  function setupMenuVisibility() {
    if (window.innerWidth >= 768) {
      openMenuBtn.style.display = 'none';
    } else {
      openMenuBtn.style.display = 'block';
    }
    closeMenuBtn.style.display = 'none';
  }
  setupMenuVisibility();
  window.addEventListener('resize', setupMenuVisibility);

  function toggleMenu() {
    menu.classList.toggle('menu_opened');
    if (menu.classList.contains('menu_opened')) {
      closeMenuBtn.style.display = 'block';
      openMenuBtn.style.display = 'none';
    } else {
      closeMenuBtn.style.display = 'none';
      if (window.innerWidth < 768) {
        openMenuBtn.style.display = 'block';
      } else {
        openMenuBtn.style.display = 'none';
      }
    }
  }
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', function() {
      menu.classList.remove('menu_opened');
      closeMenuBtn.style.display = 'none';
      if (window.innerWidth < 768) {
        openMenuBtn.style.display = 'block';
      } else {
        openMenuBtn.style.display = 'none';
      }
    });
  });

  // Intersection Observer para resaltar sección activa
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const menuLink = document.querySelector(`.menu a[href="#${id}"]`);
        if (entry.isIntersecting && menuLink) {
          document.querySelectorAll('.menu a.selected').forEach(item => {
            item.classList.remove('selected');
          });
          menuLink.classList.add('selected');
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );
  menuLinks.forEach((menuLink) => {
    const hash = menuLink.getAttribute('href');
    const target = document.querySelector(hash);
    if (target) {
      observer.observe(target);
    }
  });

  // Efecto de scroll en navbar
  let prevScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    if (prevScrollY > window.scrollY) {
      navBar.classList.remove('off');
    }
    if (window.scrollY > 50) {
      navBar.classList.add('solid');
    } else {
      navBar.classList.remove('solid');
    }
    prevScrollY = window.scrollY;
  });
}

/* Modo oscuro global */
function initDarkMode() {
  let themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) {
    themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    document.body.appendChild(themeToggle);
  }
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
}

/* Botón volver arriba global */
function initBackToTop() {
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Volver arriba');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Service Worker global */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registrado correctamente:', registration.scope);
        })
        .catch(error => {
          console.log('Registro de ServiceWorker fallido:', error);
        });
    });
  }
}

// --- Footer language switcher integration for all pages ---
function setupFooterLangSwitcher() {
  const langBtn = document.getElementById('footer-lang-btn');
  const langMenu = document.getElementById('footer-lang-menu');
  const langOptions = document.querySelectorAll('.footer-lang-switcher .lang-option');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const expanded = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', !expanded);
      langMenu.style.display = expanded ? 'none' : 'flex';
    });

    document.addEventListener('click', function (e) {
      if (!langMenu.contains(e.target) && e.target !== langBtn) {
        langMenu.style.display = 'none';
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  langOptions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
      langMenu.style.display = 'none';
      langBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Idioma global para la página principal ---
const NAV_TEXTS = {
  es: {
    home: "Inicio",
    about: "Sobre mí",
    services: "Servicios",
    contact: "Contacto",
    sendEmail: "Enviar Email"
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    sendEmail: "Send Email"
  }
};

function translateNavbar(lang) {
  // Soporta tanto enlaces absolutos como relativos
  const navLinks = document.querySelectorAll('.topnav .menu li a, .topnav .menu a');
  const nav = NAV_TEXTS[lang];
  navLinks.forEach(link => {
    // Solo cambia el texto, no sobrescribe atributos ni clases
    if (link.href.includes('#inicio')) link.textContent = nav.home;
    else if (link.href.includes('#sobre-mi')) link.textContent = nav.about;
    else if (link.href.includes('#servicios')) link.textContent = nav.services;
    else if (link.href.includes('#contacto')) link.textContent = nav.contact;
  });

  // Traducir botón "Enviar Email" si existe, sin tocar clases
  const sendEmailBtn = document.querySelector('a.btn[href^="mailto:"]');
  if (sendEmailBtn) {
    sendEmailBtn.textContent = nav.sendEmail || sendEmailBtn.textContent;
  }
}

function setLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);

  // 1. Actualiza textos si existe la función global
  if (typeof window.updateTexts === "function") {
    window.updateTexts(lang);
  }

  // 2. Si hay función de i18n, llámala
  if (typeof window.i18nSetLanguage === "function") {
    window.i18nSetLanguage(lang);
  }

  // 3. Forzar reinicio del typewriter
  let typewriterOk = false;
  try {
    if (typeof window.getTypewriterStrings === "function" && typeof window.Typed === "function") {
      const strings = window.getTypewriterStrings(lang);
      const typedEl = document.querySelector('.typed');
      if (typedEl) {
        typedEl.innerHTML = '';
        const cursor = document.querySelector('.typed-cursor');
        if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      }
      if (window.typedInstance && typeof window.typedInstance.destroy === "function") {
        window.typedInstance.destroy();
        window.typedInstance = null;
      }
      setTimeout(function() {
        if (typeof window.initTypewriter === "function") {
          window.initTypewriter(strings);
        } else if (typeof window.updateTypewriterStrings === "function") {
          window.updateTypewriterStrings(strings);
        }
      }, 50);
      typewriterOk = true;
    }
  } catch (e) {
    typewriterOk = false;
  }
  // Último recurso: recargar la página si el typewriter no se reinicia
  if (!typewriterOk) {
    // window.location.hash = "#lang=" + lang;
    // window.location.reload();
  }

  // 4. Ajuste visual para separación de idiomas en el footer (si no puedes editar CSS)
  const langMenu = document.getElementById('footer-lang-menu');
  if (langMenu) {
    langMenu.style.gap = "0.7rem";
    langMenu.style.marginLeft = "0.7rem";
    langMenu.querySelectorAll('.lang-option').forEach(btn => {
      btn.style.marginLeft = "0.3rem";
      btn.style.marginRight = "0.3rem";
    });
  }

  // Solo cambia el texto, nunca sobrescribe atributos/clases
  translateNavbar(lang);

  // --- Corrige enlaces CvLAC si el texto se traduce dinámicamente ---
  // Si tienes traducción dinámica, asegúrate de que el enlace conserve la clase
  const service1Desc = document.getElementById("service1-desc");
  if (service1Desc) {
    const cvlacLink = service1Desc.querySelector('a[href*="cvlac"]');
    if (cvlacLink && !cvlacLink.classList.contains('cvlac-link')) {
      cvlacLink.classList.add('cvlac-link');
    }
  }
  const aboutDesc = document.getElementById("about-description");
  if (aboutDesc) {
    const cvlacLink = aboutDesc.querySelector('a[href*="cvlac"]');
    if (cvlacLink && !cvlacLink.classList.contains('cvlac-link')) {
      cvlacLink.classList.add('cvlac-link');
    }
  }
}

// Inicializar el selector de idioma del footer en todas las páginas
document.addEventListener("DOMContentLoaded", function() {
  setupFooterLangSwitcher();

  // --- Año dinámico en el footer ---
  var yearSpan = document.getElementById('currentYearDynamic');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Siempre inicia en español, sin autodetección
  setLanguage("es");
});
