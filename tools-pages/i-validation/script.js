// script.js (Proyecto Infografía Independiente - Versión Uniforme y Completa)

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes comunes (adaptados de index-original.js)
    initNavigation();      // Menú hamburguesa y efectos de scroll en navbar
    initDarkMode();        // Funcionalidad de Modo Noche
    initBackToTop();       // Botón "Volver Arriba"
    initPageAnimations();  // Animaciones de scroll para esta página (fade-in)
    
    // Lógica específica de la infografía (manejo de modales o paneles de detalle)
    initInfografiaInteractions();

    // Año actual en el footer
    const yearSpan = document.getElementById('currentYearDynamic');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// --- FUNCIONES COMUNES ADAPTADAS DE index-original.js ---

function initNavigation() {
    const menu = document.querySelector('.menu');
    const openMenuBtn = document.querySelector('.open-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navBar = document.querySelector('.topheader');
    // Para esta página independiente, los menuLinks podrían no ser anclas
    // const menuLinks = document.querySelectorAll('.menu a[href^="#"]'); 

    if (!menu || !openMenuBtn || !closeMenuBtn || !navBar) {
        console.warn("Elementos de navegación no encontrados. Asegúrate de que las clases .menu, .open-menu, .close-menu y .topheader existan.");
        return;
    }
  
    function setupMenuVisibility() {
        if (window.innerWidth >= 768) {
            openMenuBtn.style.display = 'none';
            closeMenuBtn.style.display = 'none'; // En desktop, el menú no se abre/cierra así
            menu.classList.remove('menu_opened'); // Asegurar que esté cerrado en desktop
        } else {
            openMenuBtn.style.display = 'block';
            // closeMenuBtn se mostrará solo si el menú está abierto
            if (!menu.classList.contains('menu_opened')) {
                closeMenuBtn.style.display = 'none';
            }
        }
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
            if (window.innerWidth < 768) { // Solo mostrar openMenu si estamos en móvil y el menú está cerrado
                openMenuBtn.style.display = 'block';
            }
        }
    }
  
    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
  
    // Cerrar menú al hacer clic en enlaces que sacan de la página
    const allMenuLinks = document.querySelectorAll('.menu a');
    allMenuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', function() {
            if (menu.classList.contains('menu_opened')) {
                // Si el enlace no es un ancla simple (#) o es a index.html de esta sección (recarga)
                // o si es a un dominio externo (hassirlastre.com)
                const href = menuLink.getAttribute('href');
                if (!href || !href.startsWith('#') || href === 'index.html' || href.includes('hassirlastre.com')) {
                    menu.classList.remove('menu_opened');
                    closeMenuBtn.style.display = 'none';
                    if (window.innerWidth < 768) {
                         openMenuBtn.style.display = 'block';
                    }
                }
                // Si es un ancla a la misma página, podrías querer que el menú se cierre también
                // else if (href.startsWith('#') && href.length > 1) {
                //    menu.classList.remove('menu_opened');
                // }
            }
        });
    });
    
    // Efecto de la barra de navegación al hacer scroll
    let prevScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navBar.classList.add('solid');
        } else {
            navBar.classList.remove('solid');
        }
        // Opcional: ocultar/mostrar navbar al hacer scroll up/down
        // if (prevScrollY > window.scrollY) {
        //   navBar.classList.remove('off'); // 'off' sería una clase que la oculta con transform
        // } else if (window.scrollY > 100) { // Solo ocultar si se ha scrolleado un poco
        //   navBar.classList.add('off');
        // }
        prevScrollY = window.scrollY;
    });
}

function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle'); // Asume que tienes un botón con esta clase
    if (!themeToggle) {
        // Crear el botón si no existe en el HTML de esta página independiente
        const newThemeToggle = document.createElement('button');
        newThemeToggle.className = 'theme-toggle'; // Asegúrate que esta clase esté estilizada en tu CSS
        newThemeToggle.setAttribute('aria-label', 'Cambiar tema');
        newThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        document.body.appendChild(newThemeToggle);
        // Re-seleccionar
        const createdThemeToggle = document.querySelector('.theme-toggle');
        if (createdThemeToggle) setupDarkModeLogic(createdThemeToggle);
    } else {
        setupDarkModeLogic(themeToggle);
    }
}

function setupDarkModeLogic(toggleButton) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode'); // Asegúrate que tu CSS tenga estilos para .dark-mode
        toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        // Por defecto es modo claro, el icono debe ser luna
        toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}

function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top'); // Asume que tienes un botón con esta clase
     if (!backToTop) {
        const newBackToTop = document.createElement('button');
        newBackToTop.className = 'back-to-top'; // Asegúrate que esta clase esté estilizada
        newBackToTop.setAttribute('aria-label', 'Volver arriba');
        newBackToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(newBackToTop);
        // Re-seleccionar
        const createdBackToTop = document.querySelector('.back-to-top');
        if (createdBackToTop) setupBackToTopLogic(createdBackToTop);
    } else {
        setupBackToTopLogic(backToTop);
    }
}

function setupBackToTopLogic(buttonElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            buttonElement.classList.add('visible'); // CSS debe definir .back-to-top.visible
        } else {
            buttonElement.classList.remove('visible');
        }
    });
    buttonElement.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initPageAnimations() { // Renombrado de initAnimations para evitar conflicto si existiera Typed.js etc.
    // Intersection Observer para animaciones de scroll (fade-in)
    const sectionsToAnimate = document.querySelectorAll('.fade-in'); // Usa esta clase en tu HTML
    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // CSS debe definir .fade-in.visible
                    obs.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }
}

// --- LÓGICA ESPECÍFICA DE LA INFOGRAFÍA (MODALES O PANELES) ---
function initInfografiaInteractions() {
    const modalOverlay = document.getElementById('infoModal');
    const modalTitleElem = document.getElementById('modalTitle');
    const modalBodyElem = document.getElementById('modalBody');
    let lastFocusedElement = null;

    window.openModalWithContent = function(title, contentHTML, clickedItem) {
        if (modalOverlay && modalTitleElem && modalBodyElem) {
            lastFocusedElement = clickedItem || document.activeElement;
            modalTitleElem.textContent = title;
            modalBodyElem.innerHTML = contentHTML;
            modalOverlay.style.display = 'flex';
            setTimeout(() => { 
                modalOverlay.classList.add('active');
                const closeButton = modalOverlay.querySelector('.modal-close-button');
                if (closeButton) closeButton.focus();
                else modalOverlay.focus();
            }, 10);
            document.querySelectorAll('.interactive-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });
            if (clickedItem) clickedItem.classList.add('active');
        }
    };

    window.closeModal = function() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.querySelectorAll('.interactive-item.active').forEach(activeItem => {
                    activeItem.classList.remove('active');
                });
                if (lastFocusedElement) lastFocusedElement.focus();
            }, 300); 
        }
    };

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', function(event) { // Escuchar en document para que funcione incluso si el modal no tiene foco
            if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    const interactiveItems = document.querySelectorAll('.interactive-item');
    interactiveItems.forEach(item => {
        const onclickAttribute = item.getAttribute('onclick'); // Manteniendo tu estructura onclick original
        let detailsPanelId = null;
        if (onclickAttribute) {
            // Si usas toggleDetails('id') para el modal
            const matchToggle = onclickAttribute.match(/toggleDetails\('([^']+)'\)/);
            // O si directamente llamas a openModalWithContent desde el HTML (lo cual no es el caso actual)
            const matchOpenModal = onclickAttribute.match(/openModalWithContent\([^,]+,\s*'([^']+)'/);


            if (matchToggle && matchToggle[1]) { // Prioriza toggleDetails si está
                detailsPanelId = matchToggle[1];
                 // Reasignar para usar el modal si el panel de detalle existe
                const detailsPanel = document.getElementById(detailsPanelId);
                if (detailsPanel) {
                    const title = item.querySelector('.tech-title, .interactive-title')?.textContent.trim() || "Detalles";
                    const contentHTML = detailsPanel.innerHTML;
                    detailsPanel.style.display = 'none !important'; // Ocultar el panel original

                    item.removeAttribute('onclick'); 
                    item.addEventListener('click', function(event) {
                        event.preventDefault(); 
                        openModalWithContent(title, contentHTML, item);
                    });
                    item.setAttribute('role', 'button'); 
                    item.setAttribute('aria-haspopup', 'dialog');
                }

            } else if(matchOpenModal && matchOpenModal[1]){ // Si se usa openModal directamente (menos probable ahora)
                 // Esta lógica sería para una implementación diferente
            }
        } else {
             // Si no hay onclick, pero hay un details-panel hijo, podríamos configurarlo
             const detailsPanel = item.querySelector('.details-panel');
             if(detailsPanel && detailsPanel.id){
                const title = item.querySelector('.tech-title, .interactive-title')?.textContent.trim() || "Detalles";
                const contentHTML = detailsPanel.innerHTML;
                detailsPanel.style.display = 'none !important';

                item.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    openModalWithContent(title, contentHTML, item);
                });
                item.setAttribute('role', 'button'); 
                item.setAttribute('aria-haspopup', 'dialog');
             }
        }
    });
}