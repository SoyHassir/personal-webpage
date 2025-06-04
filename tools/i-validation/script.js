document.addEventListener('DOMContentLoaded', () => {
    // Initialize common components (adapted from index-original.js)
    initNavigation(); // Hamburger menu and scroll effects on navbar
    initDarkMode(); // Dark Mode functionality
    initBackToTop(); // "Back to Top" button
    initPageAnimations(); // Scroll animations for this page (fade-in)

    // Infographic-specific logic (handling modals or detail panels)
    initInfografiaInteractions();

    // Current year in the footer
    const yearSpan = document.getElementById('currentYearDynamic');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// --- COMMON FUNCTIONS ADAPTED FROM index-original.js ---

function initNavigation() {
    const menu = document.querySelector('.menu');
    const openMenuBtn = document.querySelector('.open-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navBar = document.querySelector('.topheader');

    if (!menu || !openMenuBtn || !closeMenuBtn || !navBar) {
        console.warn("Navigation elements not found. Ensure the classes .menu, .open-menu, .close-menu, and .topheader exist.");
        return;
    }

    function setupMenuVisibility() {
        if (window.innerWidth >= 768) {
            openMenuBtn.style.display = 'none';
            closeMenuBtn.style.display = 'none'; // On desktop, the menu doesn't open/close this way
            menu.classList.remove('menu_opened'); // Ensure it's closed on desktop
        } else {
            openMenuBtn.style.display = 'block';
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
            if (window.innerWidth < 768) {
                openMenuBtn.style.display = 'block';
            }
        }
    }

    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    const allMenuLinks = document.querySelectorAll('.menu a');
    allMenuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', function() {
            if (menu.classList.contains('menu_opened')) {
                const href = menuLink.getAttribute('href');
                if (!href || !href.startsWith('#') || href === 'index.html' || href.includes('hassirlastre.com')) {
                    menu.classList.remove('menu_opened');
                    closeMenuBtn.style.display = 'none';
                    if (window.innerWidth < 768) {
                        openMenuBtn.style.display = 'block';
                    }
                }
            }
        });
    });

    let prevScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navBar.classList.add('solid');
        } else {
            navBar.classList.remove('solid');
        }
        prevScrollY = window.scrollY;
    });
}

function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        const newThemeToggle = document.createElement('button');
        newThemeToggle.className = 'theme-toggle';
        newThemeToggle.setAttribute('aria-label', 'Toggle theme');
        newThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        document.body.appendChild(newThemeToggle);
        const createdThemeToggle = document.querySelector('.theme-toggle');
        if (createdThemeToggle) setupDarkModeLogic(createdThemeToggle);
    } else {
        setupDarkModeLogic(themeToggle);
    }
}

function setupDarkModeLogic(toggleButton) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
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
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
        const newBackToTop = document.createElement('button');
        newBackToTop.className = 'back-to-top';
        newBackToTop.setAttribute('aria-label', 'Back to top');
        newBackToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(newBackToTop);
        const createdBackToTop = document.querySelector('.back-to-top');
        if (createdBackToTop) setupBackToTopLogic(createdBackToTop);
    } else {
        setupBackToTopLogic(backToTop);
    }
}

function setupBackToTopLogic(buttonElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            buttonElement.classList.add('visible');
        } else {
            buttonElement.classList.remove('visible');
        }
    });
    buttonElement.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) closeModal();
        });
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
                    const title = item.querySelector('.tech-title, .interactive-title')?.textContent.trim() || "Details";
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
                const title = item.querySelector('.tech-title, .interactive-title')?.textContent.trim() || "Details";
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
