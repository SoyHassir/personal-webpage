/* ============================
   Funcionalidad específica: I-Validation
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    initInfografiaInteractions();
    initInteractiveButton();
    initThemeToggle();
});

function initPageAnimations() {
    const sectionsToAnimate = document.querySelectorAll('.fade-in');
    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }
}

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
            if (clickedItem) {
                clickedItem.classList.add('active');
                // Hide the "(click)" text in the clicked title
                const clickIndicator = clickedItem.querySelector('.click-indicator');
                if (clickIndicator) {
                    clickIndicator.style.display = 'none';
                }
            }
        }
    };

    window.closeModal = function() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.querySelectorAll('.interactive-item.active').forEach(activeItem => {
                    // Restore the "(click)" text when the modal is closed
                    const clickIndicator = activeItem.querySelector('.click-indicator');
                    if (clickIndicator) {
                        clickIndicator.style.display = '';
                    }
                    activeItem.classList.remove('active');
                });
                if (lastFocusedElement) lastFocusedElement.focus();
            }, 300);
        }
    };

    if (modalOverlay) {
        // Click fuera del modal para cerrar
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) closeModal();
        });
        
        // Botón X para cerrar
        const closeButton = modalOverlay.querySelector('.modal-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', function(event) {
                event.preventDefault();
                closeModal();
            });
        }
        
        // Escape key para cerrar
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    const interactiveItems = document.querySelectorAll('.interactive-item');
    interactiveItems.forEach(item => {
        const onclickAttribute = item.getAttribute('onclick');
        let detailsPanelId = null;
        if (onclickAttribute) {
            const matchToggle = onclickAttribute.match(/toggleDetails\('([^']+)'\)/);
            const matchOpenModal = onclickAttribute.match(/openModalWithContent\([^,]+,\s*'([^']+)'/);

            if (matchToggle && matchToggle[1]) {
                detailsPanelId = matchToggle[1];
                const detailsPanel = document.getElementById(detailsPanelId);
                if (detailsPanel) {
                    const titleElement = item.querySelector('.tech-title, .interactive-title');
                    let title = "Details";
                    if (titleElement) {
                        // Clonar el elemento y quitar el indicador (click) para obtener solo el título
                        const titleClone = titleElement.cloneNode(true);
                        const clickIndicator = titleClone.querySelector('.click-indicator');
                        if (clickIndicator) clickIndicator.remove();
                        title = titleClone.textContent.trim();
                    }
                    const contentHTML = detailsPanel.innerHTML;
                    detailsPanel.style.display = 'none !important';

                    item.removeAttribute('onclick');
                    item.addEventListener('click', function(event) {
                        event.preventDefault();
                        openModalWithContent(title, contentHTML, item);
                    });
                    item.setAttribute('role', 'button');
                    item.setAttribute('aria-haspopup', 'dialog');
                }
            }
        } else {
            const detailsPanel = item.querySelector('.details-panel');
            if(detailsPanel && detailsPanel.id){
                const titleElement = item.querySelector('.tech-title, .interactive-title');
                let title = "Details";
                if (titleElement) {
                    // Clonar el elemento y quitar el indicador (click) para obtener solo el título
                    const titleClone = titleElement.cloneNode(true);
                    const clickIndicator = titleClone.querySelector('.click-indicator');
                    if (clickIndicator) clickIndicator.remove();
                    title = titleClone.textContent.trim();
                }
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

// Inicializar botón interactivo
function initInteractiveButton() {
    const button = document.getElementById('show-interactive-btn');
    if (button) {
        button.addEventListener('click', showInteractiveElements);
        console.log('Interactive button initialized');
    } else {
        console.log('Interactive button not found');
    }
}

// Función para mostrar elementos interactivos estilo Genially
function showInteractiveElements() {
    console.log('showInteractiveElements called!');
    const body = document.body;
    
    // Agregar clase para mostrar todos los elementos
    body.classList.add('show-all-interactive');
    console.log('Added show-all-interactive class');
    
    // Remover la clase después de 3 segundos
    setTimeout(() => {
        body.classList.remove('show-all-interactive');
        console.log('Removed show-all-interactive class');
    }, 3000);
}

// Inicializar toggle de tema
function initThemeToggle() {
    const themeToggleButton = document.getElementById('dark-mode-toggle');
    if (themeToggleButton) {
        // Verificar si hay un tema guardado en localStorage
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
        
        // Agregar event listener para el toggle
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
            themeToggleButton.blur();
        });
        
        console.log('Theme toggle initialized');
    } else {
        console.log('Theme toggle button not found');
    }
}


