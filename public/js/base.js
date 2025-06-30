/* ============================
   Funciones y utilidades globales
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initDarkMode();
  initBackToTop();
  initServiceWorker();
  setupFooterLangSwitcher();
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
  
  // Determinar tiempo mínimo de visualización basado en dispositivo
  const isMobile = window.innerWidth <= 768;
  const isSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
  
  let minShowTime = 300; // Tiempo base reducido
  if (isMobile) minShowTime = 400; // Menos tiempo en móvil
  if (isSlowConnection) minShowTime = 600; // Tiempo moderado en conexiones lentas
  
  const startTime = performance.now();
  
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    const remainingTime = Math.max(0, minShowTime - loadTime);
    
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, remainingTime);
  });
}

/* Navegación global */
function initNavigation() {
  const menu = document.querySelector('.menu');
  const openMenuBtn = document.querySelector('.open-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const navBar = document.querySelector('.topheader');
  // Selecciona solo los <a> hijos directos de <li> para evitar seleccionar el botón de cerrar
  const menuLinks = document.querySelectorAll('.menu li > a');

  if (!menu || !openMenuBtn || !closeMenuBtn || !navBar) return;

  function setupMenuVisibility() {
    if (window.innerWidth >= 768) {
      openMenuBtn.style.display = 'none';
      menu.classList.remove('menu_opened');
      closeMenuBtn.style.display = 'none';
    } else {
      openMenuBtn.style.display = 'block';
      closeMenuBtn.style.display = 'none';
      menu.classList.remove('menu_opened');
    }
  }
  setupMenuVisibility();
  window.addEventListener('resize', setupMenuVisibility);

  function toggleMenu(e) {
    e && e.preventDefault();
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

  // Cierra el menú al hacer click en un enlace de navegación
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
    let hash = menuLink.getAttribute('href');
    // Corregir: eliminar '/' inicial si existe
    if (hash.startsWith('/')) {
      hash = hash.substring(1);
    }
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
  // Aplicar tema guardado inmediatamente para evitar flash
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.remove('dark-mode');
  }

  // Crear o encontrar el botón de toggle
  let themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) {
    themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.setAttribute('type', 'button');
    themeToggle.innerHTML = (document.documentElement.classList.contains('dark-mode')) ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    document.body.appendChild(themeToggle);
  }

  themeToggle.onclick = function () {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  };
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
  
  // Forzar estado inicial oculto
  backToTop.classList.remove('visible');
  
  // Remover event listeners existentes para evitar duplicados
  const newBackToTop = backToTop.cloneNode(true);
  backToTop.parentNode.replaceChild(newBackToTop, backToTop);
  backToTop = newBackToTop;
  
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
    backToTop.blur();
  });
}

/* Service Worker global */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          // Manejar actualizaciones del Service Worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateNotification();
              }
            });
          });
          
          // Manejar mensajes del Service Worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CACHE_UPDATED') {
            }
          });
          
          // Verificar estado del cache
          checkCacheStatus();
        })
        .catch(error => {
        });
    });
  }
  
  // Verificar si la app está instalada como PWA
  checkPWAInstallation();
}

// Función para mostrar notificación de actualización
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-update-content">
      <i class="fas fa-sync-alt"></i>
      <span>Nueva versión disponible</span>
      <button onclick="updatePWA()" class="pwa-update-btn">Actualizar</button>
      <button onclick="this.parentElement.parentElement.remove()" class="pwa-close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Agregar estilos si no existen
  if (!document.querySelector('#pwa-update-styles')) {
    const styles = document.createElement('style');
    styles.id = 'pwa-update-styles';
    styles.textContent = `
      .pwa-update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
      }
      
      .pwa-update-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
      }
      
      .pwa-update-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
      }
      
      .pwa-update-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
      }
      
      .pwa-close-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 4px;
        transition: background 0.3s ease;
      }
      
      .pwa-close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(notification);
  
  // Auto-remover después de 10 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
}

// Función para actualizar la PWA
function updatePWA() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}

// Función para verificar estado del cache
async function checkCacheStatus() {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      const staticCache = cacheNames.find(name => name.startsWith('hlastre-pwa'));
      const dynamicCache = cacheNames.find(name => name.startsWith('hlastre-dynamic'));
      
      if (staticCache) {
      }
      
      if (dynamicCache) {
      }
    } catch (error) {
    }
  }
}

// Función para verificar si la app está instalada como PWA
function checkPWAInstallation() {
  // Detectar si está en modo standalone (instalada)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone === true;
  
  if (isStandalone) {
    document.body.classList.add('pwa-installed');
    
    // Agregar indicador visual si es necesario
    const pwaIndicator = document.createElement('div');
    pwaIndicator.className = 'pwa-indicator';
    pwaIndicator.innerHTML = '<i class="fas fa-mobile-alt"></i>';
    pwaIndicator.title = 'Ejecutándose como aplicación instalada';
    document.body.appendChild(pwaIndicator);
  }
}

// --- Footer language switcher integration for all pages ---
function setupFooterLangSwitcher() {
  // Función para configurar el selector de idioma cuando esté listo
  function configureLangSwitcher() {
    const langBtn = document.getElementById('footer-lang-btn');
    const langMenu = document.getElementById('footer-lang-menu');
    const langOptions = document.querySelectorAll('.footer-lang-switcher .lang-option');

    if (langBtn && langMenu) {
      // Remover event listeners existentes para evitar duplicados
      const newLangBtn = langBtn.cloneNode(true);
      langBtn.parentNode.replaceChild(newLangBtn, langBtn);
      
      const newLangMenu = langMenu.cloneNode(true);
      langMenu.parentNode.replaceChild(newLangMenu, langMenu);
      
      // Re-obtener referencias después del clonado
      const freshLangBtn = document.getElementById('footer-lang-btn');
      const freshLangMenu = document.getElementById('footer-lang-menu');
      const freshLangOptions = document.querySelectorAll('.footer-lang-switcher .lang-option');

      freshLangBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const expanded = freshLangBtn.getAttribute('aria-expanded') === 'true';
        freshLangBtn.setAttribute('aria-expanded', !expanded);
        freshLangMenu.style.display = expanded ? 'none' : 'flex';
        freshLangBtn.blur();
      });

      document.addEventListener('click', function (e) {
        if (!freshLangMenu.contains(e.target) && e.target !== freshLangBtn) {
          setTimeout(function() {
            freshLangMenu.style.display = 'none';
            freshLangBtn.setAttribute('aria-expanded', 'false');
          }, 120);
        }
      });

      freshLangOptions.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const selectedLang = btn.getAttribute('data-lang');
          setLanguage(selectedLang);
          freshLangMenu.style.display = 'none';
          freshLangBtn.setAttribute('aria-expanded', 'false');
          btn.blur();
        });
      });
    } else {
    }
  }

  // Intentar configurar inmediatamente
  configureLangSwitcher();

  // Si no se pudo configurar, intentar de nuevo después de delays progresivos
  const attempts = [100, 300, 500, 1000, 2000];
  attempts.forEach(delay => {
    setTimeout(() => {
      if (!document.getElementById('footer-lang-btn') || 
          !document.getElementById('footer-lang-btn').hasAttribute('data-configured')) {
        configureLangSwitcher();
        const langBtn = document.getElementById('footer-lang-btn');
        if (langBtn) {
          langBtn.setAttribute('data-configured', 'true');
        }
      }
    }, delay);
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
  
  // Actualizar el selector oculto para compatibilidad con i18n.min.js
  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.value = lang;
    // Disparar evento change para activar el sistema i18n.min.js
    const event = new Event('change', { bubbles: true });
    languageSelector.dispatchEvent(event);
  }

  // 1. Actualiza textos si existe la función global
  if (typeof window.updateTexts === "function") {
    window.updateTexts(lang);
  }

  // 2. Si hay función de i18n del archivo i18n.min.js, y es diferente a esta función
  if (typeof window.setLanguage === "function" && window.setLanguage.toString() !== setLanguage.toString()) {
    try {
      // Guardamos referencia temporal
      const baseSetLanguage = setLanguage;
      window.setLanguage(lang);
      // Restauramos nuestra función
      window.setLanguage = baseSetLanguage;
    } catch (error) {
    }
  }

  // 3. Llamar sistema i18n si existe como variable global TRANSLATIONS
  if (typeof window.TRANSLATIONS === "object" && window.TRANSLATIONS[lang]) {
    try {
      // Aplicar traducciones directamente si el objeto existe
      for (const [key, text] of Object.entries(window.TRANSLATIONS[lang])) {
        const element = document.getElementById(key);
        if (element) {
          element.innerHTML = text;
        }
      }
      
      // Activar sistema typewriter si existe
      if (typeof window.getTypewriterStrings === "function" && typeof window.updateTypewriterStrings === "function") {
        const strings = window.getTypewriterStrings(lang);
        window.updateTypewriterStrings(strings);
      }
    } catch (error) {
    }
  }

  // 4. Forzar reinicio del typewriter
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

  // 5. Ajuste visual para separación de idiomas en el footer (si no puedes editar CSS)
  const langMenu = document.getElementById('footer-lang-menu');
  if (langMenu) {
    langMenu.style.gap = "0.7rem";
    langMenu.style.marginLeft = "0.7rem";
    langMenu.querySelectorAll('.lang-option').forEach(btn => {
      btn.style.marginLeft = "0.3rem";
      btn.style.marginRight = "0.3rem";
    });
  }

  // 6. Solo cambia el texto, nunca sobrescribe atributos/clases
  translateNavbar(lang);

  // 7. --- Corrige enlaces CvLAC si el texto se traduce dinámicamente ---
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

  // 8. Guardar preferencia de idioma
  localStorage.setItem('preferred-language', lang);
}

// --- Año dinámico en el footer ---
function updateCurrentYear() {
  const yearElement = document.getElementById('currentYearDynamic');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Inicialización final para asegurar que todo funcione
function finalInitialization() {
  updateCurrentYear();
  
  // Asegurar que el selector de idioma esté configurado
  if (typeof window.setupFooterLangSwitcher === 'function') {
    window.setupFooterLangSwitcher();
  }
  
  // Configurar el selector oculto si existe
  const languageSelector = document.getElementById("language-selector");
  if (languageSelector && typeof window.TRANSLATIONS !== 'undefined') {
    // Usar preferencia guardada, luego idioma del navegador, luego español por defecto
    const savedLang = localStorage.getItem('preferred-language');
    const userLang = navigator.language.slice(0, 2);
    const defaultLang = savedLang || (window.TRANSLATIONS[userLang] ? userLang : "es");
    
    languageSelector.value = defaultLang;
    
    // Aplicar idioma inicial
    if (typeof window.setLanguage === 'function') {
      window.setLanguage(defaultLang);
    }
  } else if (languageSelector) {
    // Fallback si no hay TRANSLATIONS disponible
    const savedLang = localStorage.getItem('preferred-language') || 'es';
    languageSelector.value = savedLang;
    setLanguage(savedLang);
  }
}

// Ejecutar inicialización final después de que todo esté cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', finalInitialization);
} else {
  finalInitialization();
}

// También ejecutar después de window.load para asegurar que todos los recursos estén cargados
window.addEventListener('load', () => {
  setTimeout(finalInitialization, 100);
});
