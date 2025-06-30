/* ============================
   Manager Toolkit - JavaScript
   ============================ */

// Usar el nuevo data loader
let dataLoader;
let toolkitData = [];

// Estado de la aplicación
let appState = {
    activeCategory: 'Todos',
    currentTool: null,
    isLoading: false,
    startTime: performance.now(),
    currentTabIndex: 0,
    currentCardIndex: 0
};

// Elementos del DOM
let elements = {};

// ===== SISTEMA DE ANIMACIONES COHESIVO =====
// Unificado con la página principal

class ToolkitAnimations {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.initStaggerAnimations();
        this.initSmoothAnimations();
        this.initMicroInteractions();
        this.initMobileOptimizations();
        this.initToolkitSpecificAnimations();
    }

    initStaggerAnimations() {
        // Aplicar fade-in individual a cada tarjeta de herramientas
        const cards = document.querySelectorAll('.tool-card');
        if (cards.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Aplicar delay escalonado para crear efecto stagger
                        const index = Array.from(cards).indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100 * index); // 100ms de delay entre cada tarjeta
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que la tarjeta esté completamente visible
            });

            cards.forEach(card => {
                observer.observe(card);
            });
            this.observers.set('cards', observer);
        }

        // Aplicar stagger a los botones de categoría
        const categoryFilters = document.querySelector('.category-filters');
        if (categoryFilters) {
            categoryFilters.classList.add('stagger-container');
            const buttons = categoryFilters.querySelectorAll('.category-button');
            buttons.forEach((button, index) => {
                button.classList.add('stagger-item');
                button.style.animationDelay = `${0.05 * (index + 1)}s`;
            });
        }
    }

    initSmoothAnimations() {
        const elements = document.querySelectorAll('.bounce-in, .elastic-in, .smooth-scale, .fade-in');
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(element => {
                observer.observe(element);
            });
            this.observers.set('smooth', observer);
        }
    }

    initMicroInteractions() {
        // Aplicar micro-interacciones a las tarjetas
        document.querySelectorAll('.tool-card:not(.micro-hover)').forEach(card => {
            card.classList.add('micro-hover');
        });

        // Aplicar micro-pulse a botones
        document.querySelectorAll('.gemini-button:not(.micro-pulse)').forEach(button => {
            button.classList.add('micro-pulse');
        });

        // Aplicar micro-pulse a botones de categoría activos
        document.querySelectorAll('.category-button.active:not(.micro-pulse)').forEach(button => {
            button.classList.add('micro-pulse');
        });
    }

    initMobileOptimizations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        } else if (window.innerWidth <= 768 || 'ontouchstart' in window) {
            document.body.classList.add('mobile-optimized');
            const style = document.createElement('style');
            style.textContent = `
                .mobile-optimized .bounce-in,
                .mobile-optimized .elastic-in {
                    transition-duration: 0.4s !important;
                }
                .mobile-optimized .micro-hover:hover {
                    transform: translateY(-4px) scale(1.01) !important;
                }
                .mobile-optimized .tool-card:hover {
                    transform: translateY(-4px) scale(1.01) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    initToolkitSpecificAnimations() {
        // Animaciones específicas del toolkit
        this.initModalAnimations();
        this.initTabAnimations();
        this.initLoadingStates();
    }

    initModalAnimations() {
        const modal = document.getElementById('modal-overlay');
        if (modal) {
            // Animación de entrada del modal
            const showModal = () => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            };

            // Animación de salida del modal
            const hideModal = () => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            };

            // Event listeners para el modal
            document.addEventListener('click', (e) => {
                if (e.target === modal || e.target.closest('.close-modal')) {
                    hideModal();
                }
            });

            // Exponer funciones globalmente
            window.showToolkitModal = showModal;
            window.hideToolkitModal = hideModal;
        }
    }

    initTabAnimations() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase activa de todos los tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase activa al tab clickeado
                button.classList.add('active');
                
                // Animación de transición de contenido
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.tab === button.dataset.tab) {
                        content.classList.add('active');
                        content.style.animation = 'fadeInUp 0.3s ease-out';
                    }
                });
            });
        });
    }

    initLoadingStates() {
        // Estados de carga con animaciones
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.innerHTML = `
                <div class="loading-dots">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            `;
        });
    }

    applyToNewElements(elements, animationClass = 'fade-in') {
        if (elements && elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(element => {
                if (!element.classList.contains(animationClass)) {
                    element.classList.add(animationClass);
                }
                observer.observe(element);
            });
        }
    }

    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }

    initCardAnimations() {
        // Limpiar observer anterior si existe
        if (this.observers.has('cards')) {
            this.observers.get('cards').disconnect();
        }
        
        // Aplicar fade-in individual a cada tarjeta de herramientas
        const cards = document.querySelectorAll('.tool-card');
        if (cards.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Aplicar delay escalonado para crear efecto stagger
                        const index = Array.from(cards).indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100 * index); // 100ms de delay entre cada tarjeta
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que la tarjeta esté completamente visible
            });

            cards.forEach(card => {
                // Resetear estado de la tarjeta
                card.classList.remove('visible');
                observer.observe(card);
            });
            this.observers.set('cards', observer);
        }
    }
}

// Inicializar animaciones del toolkit
window.toolkitAnimations = new ToolkitAnimations();

// === CONFIGURACIÓN DE GEMINI ===
// (Eliminada la constante GEMINI_API_KEY, solo se usa el proxy local)

// Inicialización optimizada
async function initializeApp() {
    try {
        const startTime = performance.now();
        
        // Inicializar optimizaciones de rendimiento
        if (window.PerformanceOptimizations) {
            window.performanceOptimizations = new PerformanceOptimizations();
        }
        
        // Crear instancia del data loader
        dataLoader = new ToolkitDataLoader();
        
        // Mostrar skeleton loading mientras se cargan los datos
        if (window.performanceOptimizations) {
            window.performanceOptimizations.createSkeletonCards();
        }
        
        // Cargar todos los datos inicialmente para que funcione
        toolkitData = await dataLoader.loadAllData();
        
        // Inicializar la aplicación
        initializeElements();
        renderCategoryFilters();
        await renderCards(); // Ahora es async
        setupEventListeners();
        setupKeyboardNavigation();
        
        // Mostrar estadísticas en consola
        const stats = dataLoader.getLoadStats();
        const loadTime = Math.round(performance.now() - startTime);
        
        // console.log(`🎯 Manager Toolkit inicializado: ${stats.totalTools} herramientas en ${stats.loadedCategories} categorías cargadas en ${loadTime}ms`);
        
        // Anunciar carga completa para lectores de pantalla
        announceToScreenReader(`Manager Toolkit cargado con ${stats.totalTools} herramientas disponibles`);
        
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
        showErrorMessage('Error cargando las herramientas. Por favor, recarga la página.');
    }
}

// Función para anunciar mensajes a lectores de pantalla
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remover después de un tiempo
    setTimeout(() => {
        if (announcement.parentNode) {
            announcement.parentNode.removeChild(announcement);
        }
    }, 1000);
}

// Mostrar mensaje de error en la UI
function showErrorMessage(message) {
    const errorHtml = `
        <div class="error-message" style="text-align: center; padding: 2rem; color: #e74c3c;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;" aria-hidden="true"></i>
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Recargar página
            </button>
        </div>
    `;
    
    if (elements.cardsGrid) {
        elements.cardsGrid.innerHTML = errorHtml;
    } else {
        document.body.innerHTML = errorHtml;
    }
}

// Inicializar elementos del DOM
function initializeElements() {
    elements = {
        categoryFilters: document.getElementById('category-filters'),
        cardsGrid: document.getElementById('cards-grid'),
        modalOverlay: document.getElementById('modal-overlay'),
        modalContent: document.getElementById('modal-content'),
        closeModal: document.getElementById('close-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalMotto: document.getElementById('modal-motto'),
        modalTabs: document.getElementById('modal-tabs'),
        modalBodyContent: document.getElementById('modal-body-content')
    };
}

// Configurar navegación por teclado
function setupKeyboardNavigation() {
    // Navegación por teclado para filtros de categoría
    elements.categoryFilters.addEventListener('keydown', (e) => {
        const buttons = elements.categoryFilters.querySelectorAll('.category-button');
        const currentIndex = Array.from(buttons).findIndex(btn => btn === document.activeElement);
        
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
                buttons[prevIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (document.activeElement.classList.contains('category-button')) {
                    document.activeElement.click();
                }
                break;
        }
    });

    // Navegación por teclado para tarjetas
    elements.cardsGrid.addEventListener('keydown', (e) => {
        const cards = elements.cardsGrid.querySelectorAll('.tool-card');
        const currentIndex = Array.from(cards).findIndex(card => card === document.activeElement);
        
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % cards.length;
                cards[nextIndex].focus();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? cards.length - 1 : currentIndex - 1;
                cards[prevIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                const cols = Math.floor(elements.cardsGrid.offsetWidth / 320); // Aproximadamente el ancho de una card
                const downIndex = Math.min(currentIndex + cols, cards.length - 1);
                cards[downIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const upIndex = Math.max(currentIndex - cols, 0);
                cards[upIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (document.activeElement.classList.contains('tool-card')) {
                    document.activeElement.click();
                }
                break;
        }
    });

    // Navegación por teclado para modal
    document.addEventListener('keydown', (e) => {
        if (elements.modalOverlay.hidden) return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'Tab':
                // Mantener el foco dentro del modal
                const focusableElements = elements.modalContent.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
                break;
        }
    });
}

// Obtener categorías únicas usando el data loader
function getUniqueCategories() {
    if (dataLoader && dataLoader.isDataLoaded()) {
        return dataLoader.getUniqueCategories();
    }
    return ['Todos'];
}

// Renderizar filtros de categoría
function renderCategoryFilters() {
    const categories = getUniqueCategories();
    elements.categoryFilters.innerHTML = categories.map((category, index) => `
        <button 
            data-category="${category}" 
            class="category-button ${appState.activeCategory === category ? 'active' : ''}"
            role="tab"
            aria-selected="${appState.activeCategory === category}"
            aria-controls="cards-grid"
            tabindex="${appState.activeCategory === category ? '0' : '-1'}"
        >
            ${category}
            ${dataLoader && dataLoader.isCategoryLoaded(category) ? '<span class="loaded-indicator" aria-label="Categoría cargada">✓</span>' : ''}
        </button>
    `).join('');
}

// Renderizar cards (ahora async)
async function renderCards() {
    if (appState.isLoading) return;
    
    appState.isLoading = true;
    
    // Si no hay optimizaciones de rendimiento, mostrar loading tradicional
    if (!window.performanceOptimizations) {
        showLoadingState();
    }
    
    try {
        // Usar datos cargados directamente
        const filteredData = toolkitData.filter(item => {
            return appState.activeCategory === 'Todos' || item.category === appState.activeCategory;
        });
        
        if (filteredData.length === 0) {
            elements.cardsGrid.innerHTML = `
                <div class="no-results" role="status" aria-live="polite">
                    <p>No se encontraron herramientas en esta categoría.</p>
                </div>
            `;
            announceToScreenReader('No se encontraron herramientas en esta categoría');
            return;
        }

        // Renderizar cards con optimizaciones de rendimiento
        const cardsHTML = filteredData.map((item, index) => `
            <div 
                class="tool-card lazy-load performance-optimized" 
                data-id="${item.id}"
                role="gridcell"
                tabindex="0"
                aria-label="Herramienta: ${item.title}. ${item.motto}"
                onkeydown="handleCardKeydown(event, '${item.id}')"
                style="animation-delay: ${index * 50}ms;"
            >
                <span class="category-badge" aria-label="Categoría: ${item.category}">${item.category}</span>
                <h3>${item.title}</h3>
                <p class="motto">${item.motto}</p>
                <div class="view-more">Ver más</div>
            </div>
        `).join('');
        
        elements.cardsGrid.innerHTML = cardsHTML;
        
        // Reinicializar animaciones para las nuevas tarjetas
        if (window.toolkitAnimations) {
            window.toolkitAnimations.initCardAnimations();
        }
        
        // Aplicar animaciones de entrada con Intersection Observer
        if (window.performanceOptimizations && window.performanceOptimizations.intersectionObserver) {
            const cards = elements.cardsGrid.querySelectorAll('.tool-card');
            cards.forEach(card => {
                window.performanceOptimizations.intersectionObserver.observe(card);
            });
        }
        
        // Actualizar indicadores de carga en filtros
        renderCategoryFilters();
        
        // Anunciar cambio de categoría
        announceToScreenReader(`Mostrando ${filteredData.length} herramientas en la categoría ${appState.activeCategory}`);
        
    } catch (error) {
        console.error('Error renderizando cards:', error);
        showErrorMessage('Error cargando las herramientas de esta categoría.');
    } finally {
        appState.isLoading = false;
        
        // Ocultar skeleton loading si existe
        if (window.performanceOptimizations) {
            const skeletonCards = elements.cardsGrid.querySelectorAll('.skeleton-card');
            skeletonCards.forEach(card => card.remove());
        }
    }
}

// Manejar teclas en tarjetas
function handleCardKeydown(event, toolId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(toolId);
    }
}

// Mostrar estado de carga
function showLoadingState() {
    elements.cardsGrid.innerHTML = `
        <div class="loading" role="status" aria-live="polite">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;" aria-hidden="true"></i>
            <p>Cargando herramientas...</p>
        </div>
    `;
}

// Ocultar estado de carga
function hideLoadingState() {
    // El contenido ya se actualiza en renderCards
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de categoría con debouncing
    elements.categoryFilters.addEventListener('click', async (e) => {
        if (e.target.classList.contains('category-button')) {
            const newCategory = e.target.dataset.category;
            
            if (newCategory === appState.activeCategory) return;
            
            // Aplicar debouncing visual si hay optimizaciones
            if (window.performanceOptimizations) {
                window.performanceOptimizations.addDebouncingVisualFeedback(elements.categoryFilters);
            }
            
            appState.activeCategory = newCategory;
            
            // Actualizar UI de filtros
            document.querySelectorAll('.category-button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === appState.activeCategory);
                btn.setAttribute('aria-selected', btn.dataset.category === appState.activeCategory);
                btn.setAttribute('tabindex', btn.dataset.category === appState.activeCategory ? '0' : '-1');
            });
            
            // Renderizar cards con nueva categoría
            await renderCards();
        }
    });

    // Event delegation para cards (mejorado)
    elements.cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.tool-card, .skeleton-card');
        if (card) {
            // Aplicar optimizaciones si están disponibles
            if (window.performanceOptimizations) {
                window.performanceOptimizations.handleCardClick(card, e);
            } else {
                // Fallback a la funcionalidad original
                openModal(card.dataset.id);
            }
        }
    });

    // Event delegation para modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) {
            closeModal();
        }
    });

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.modalOverlay.hidden) {
            closeModal();
        }
    });
    
    // Event delegation global para botones de IA y otros elementos
    document.addEventListener('click', (e) => {
        // Botones de IA
        if (e.target.matches('.gemini-button')) {
            if (window.performanceOptimizations) {
                window.performanceOptimizations.handleAIButtonClick(e.target, e);
            } else {
                // Fallback a la funcionalidad original
                const buttonId = e.target.id;
                if (buttonId === 'generate-steps-btn') {
                    handleGenerateSteps();
                } else if (buttonId === 'generate-case-study-btn') {
                    handleGenerateCaseStudy();
                }
            }
        }
        
        // Botón de copiar
        if (e.target.matches('.copy-button')) {
            if (window.performanceOptimizations) {
                window.performanceOptimizations.handleCopyButtonClick(e.target, e);
            } else {
                copyMermaidCode(e.target);
            }
        }
    });
}

// Abrir modal usando el data loader
function openModal(toolId) {
    appState.currentTool = dataLoader ? dataLoader.getToolById(toolId) : toolkitData.find(t => t.id === toolId);
    if (!appState.currentTool) return;

    elements.modalTitle.textContent = appState.currentTool.title;
    elements.modalMotto.textContent = appState.currentTool.motto;
    
    renderModalTabs();
    renderTabContent('definicion');

    // Mostrar modal con accesibilidad
    elements.modalOverlay.hidden = false;
    elements.modalOverlay.classList.add('show');
    
    // Animar entrada
    setTimeout(() => {
        elements.modalContent.style.transform = 'scale(1)';
        elements.modalContent.style.opacity = '1';
    }, 10);

    // Enfocar el primer elemento del modal
    setTimeout(() => {
        const firstFocusable = elements.modalContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }, 100);

    // Anunciar apertura del modal
    announceToScreenReader(`Modal abierto: ${appState.currentTool.title}`);
}

// Cerrar modal
function closeModal() {
    elements.modalContent.style.transform = 'scale(0.95)';
    elements.modalContent.style.opacity = '0';
    
    setTimeout(() => {
        elements.modalOverlay.classList.remove('show');
        elements.modalOverlay.hidden = true;
        appState.currentTool = null;
        
        // Devolver el foco al elemento que abrió el modal
        const lastActiveElement = document.querySelector('.tool-card:focus');
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }, 300);

    // Anunciar cierre del modal
    announceToScreenReader('Modal cerrado');
}

// Renderizar tabs del modal
function renderModalTabs() {
    const tabs = [
        { id: 'definicion', name: 'Definición' },
        { id: 'insight', name: 'Insight' },
        { id: 'diagrama', name: 'Diagrama' },
        { id: 'key_points', name: appState.currentTool.keyPoints ? 'Puntos Clave' : 'Casos de Uso' },
        { id: 'asesor_ia', name: 'Asesor IA ✨' }
    ];

    elements.modalTabs.innerHTML = tabs.map((tab, index) => `
        <button 
            class="tab-button ${tab.id === 'definicion' ? 'active' : ''}" 
            data-tab="${tab.id}"
            role="tab"
            aria-selected="${tab.id === 'definicion'}"
            aria-controls="modal-body-content"
            tabindex="${tab.id === 'definicion' ? '0' : '-1'}"
            id="tab-${tab.id}"
        >
            ${tab.name}
        </button>
    `).join('');

    // Event delegation para tabs
    elements.modalTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.tab-button, .skeleton-tab');
        if (tab) {
            // Aplicar optimizaciones si están disponibles
            if (window.performanceOptimizations) {
                window.performanceOptimizations.handleTabClick(tab, e);
            } else {
                // Fallback a la funcionalidad original
                const tabId = tab.dataset.tab;
                if (tabId) {
                    // Actualizar estado de tabs
                    document.querySelectorAll('.tab-button').forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-selected', 'false');
                        btn.setAttribute('tabindex', '-1');
                    });
                    
                    tab.classList.add('active');
                    tab.setAttribute('aria-selected', 'true');
                    tab.setAttribute('tabindex', '0');
                    
                    renderTabContent(tabId);
                    
                    // Anunciar cambio de tab
                    announceToScreenReader(`Cambiado a la sección: ${tab.textContent}`);
                }
            }
        }
    });

    // Navegación por teclado para tabs
    elements.modalTabs.addEventListener('keydown', (e) => {
        const tabs = elements.modalTabs.querySelectorAll('.tab-button');
        const currentIndex = Array.from(tabs).findIndex(tab => tab === document.activeElement);
        
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % tabs.length;
                tabs[nextIndex].click();
                tabs[nextIndex].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
                tabs[prevIndex].click();
                tabs[prevIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (document.activeElement.classList.contains('tab-button')) {
                    document.activeElement.click();
                }
                break;
        }
    });
}

// Renderizar contenido de tab
function renderTabContent(tabId) {
    let html = '';

    switch (tabId) {
        case 'definicion':
            html = `<p>${appState.currentTool.definition}</p>`;
            break;
        case 'insight':
            html = `<p>${appState.currentTool.insight}</p>`;
            break;
        case 'diagrama':
            html = createDiagram(appState.currentTool);
            break;
        case 'key_points':
            if (appState.currentTool.keyPoints && appState.currentTool.keyPoints.length > 0) {
                html = `<ul>${appState.currentTool.keyPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
            } else if (appState.currentTool.useCases && appState.currentTool.useCases.length > 0) {
                html = `<div class="use-cases">${appState.currentTool.useCases.map(useCase => `
                    <div class="use-case">
                        <h4>${useCase.title}</h4>
                        <p>${useCase.text}</p>
                    </div>
                `).join('')}</div>`;
            } else {
                html = `<p class="no-content">No hay puntos clave o casos de uso disponibles.</p>`;
            }
            break;
        case 'asesor_ia':
            html = `
                <div class="ai-advisor">
                    <div class="ai-section">
                        <h3>Obtener Pasos de Acción</h3>
                        <p>Pídele a la IA que genere los primeros pasos prácticos para aplicar esta herramienta en una empresa.</p>
                        <button id="generate-steps-btn" class="gemini-button" aria-describedby="steps-description">
                            <span class="loader hidden" id="steps-loader"></span>
                            Generar Pasos de Acción ✨
                        </button>
                        <div id="steps-description" class="sr-only">Botón para generar pasos de acción usando inteligencia artificial</div>
                        <div id="steps-output" class="ai-output" aria-live="polite"></div>
                    </div>
                    <div class="ai-section">
                        <h3>Generar Caso de Estudio por Industria</h3>
                        <p>Escribe una industria (ej. Salud, Finanzas, Retail) para generar un caso de estudio ficticio.</p>
                        <div class="input-group">
                            <label for="industry-input" class="sr-only">Industria</label>
                            <input 
                                type="text" 
                                id="industry-input" 
                                placeholder="Escribe una industria..." 
                                class="search-input"
                                aria-describedby="case-study-description"
                            >
                            <button id="generate-case-study-btn" class="gemini-button" aria-describedby="case-study-description">
                                <span class="loader hidden" id="case-study-loader"></span>
                                Generar Caso ✨
                            </button>
                        </div>
                        <div id="case-study-description" class="sr-only">Botón para generar caso de estudio usando inteligencia artificial</div>
                        <div id="case-study-output" class="ai-output" aria-live="polite"></div>
                    </div>
                </div>
            `;
            break;
    }

    elements.modalBodyContent.innerHTML = html;
    elements.modalBodyContent.setAttribute('role', 'tabpanel');
    elements.modalBodyContent.setAttribute('aria-labelledby', `tab-${tabId}`);

    // Configurar event listeners para IA si es necesario
    if (tabId === 'asesor_ia') {
        setupAIEventListeners();
    }
}

// Crear diagrama
function createDiagram(tool) {
    if (tool.diagramType === 'mermaid' && tool.mermaidCode) {
        return `
            <div class="mermaid-code-container">
                <button 
                    class="copy-button" 
                    onclick="copyMermaidCode(this)"
                    aria-label="Copiar código Mermaid"
                >
                    Copiar
                </button>
                <p class="code-description">Código para visualizar en un editor de Mermaid.js:</p>
                <pre class="mermaid-code" role="textbox" aria-label="Código Mermaid"><code>${tool.mermaidCode.trim()}</code></pre>
            </div>
        `;
    }

    switch (tool.diagramType) {
        case 'swot_matrix':
            return `
                <div class="diagram-container" role="region" aria-label="Matriz FODA">
                    <div class="swot-grid">
                        <div class="swot-cell strengths" role="region" aria-label="Fortalezas">
                            <h4>Fortalezas (Interno)</h4>
                            <p>Capacidades internas que dan una ventaja.</p>
                        </div>
                        <div class="swot-cell weaknesses" role="region" aria-label="Debilidades">
                            <h4>Debilidades (Interno)</h4>
                            <p>Factores internos que son una desventaja.</p>
                        </div>
                        <div class="swot-cell opportunities" role="region" aria-label="Oportunidades">
                            <h4>Oportunidades (Externo)</h4>
                            <p>Factores externos que pueden ser aprovechados.</p>
                        </div>
                        <div class="swot-cell threats" role="region" aria-label="Amenazas">
                            <h4>Amenazas (Externo)</h4>
                            <p>Factores externos que pueden causar problemas.</p>
                        </div>
                    </div>
                </div>
            `;
        default:
            return `<p>No hay diagrama disponible para esta herramienta.</p>`;
    }
}

// Configurar event listeners para IA
function setupAIEventListeners() {
    const generateStepsBtn = document.getElementById('generate-steps-btn');
    const generateCaseStudyBtn = document.getElementById('generate-case-study-btn');
    const industryInput = document.getElementById('industry-input');

    if (generateStepsBtn) {
        generateStepsBtn.addEventListener('click', handleGenerateSteps);
    }

    if (generateCaseStudyBtn) {
        generateCaseStudyBtn.addEventListener('click', handleGenerateCaseStudy);
    }

    // Permitir generar caso de estudio con Enter
    if (industryInput) {
        industryInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleGenerateCaseStudy();
            }
        });
    }
}

function limpiarMarkdown(texto) {
    // Elimina líneas que solo contienen ``` o ```html
    return texto.replace(/```html\n?|```\n?/g, '');
}

// Manejar generación de pasos
async function handleGenerateSteps() {
    const button = document.getElementById('generate-steps-btn');
    const loader = document.getElementById('steps-loader');
    const output = document.getElementById('steps-output');

    if (!button || !loader || !output) return;

    // Actualizar estado del botón
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    loader.classList.remove('hidden');
    output.innerHTML = '';

    // Anunciar inicio del proceso
    announceToScreenReader('Generando pasos de acción, por favor espere...');

    const prompt = `Como un consultor de gestión experimentado, y basándote en la siguiente herramienta de gestión:
    Título: ${appState.currentTool.title}
    Definición: ${appState.currentTool.definition}
    Genera 3 pasos de acción iniciales, claros y concisos para que una empresa mediana comience a implementar esta metodología. La respuesta debe estar en español y en formato HTML, usando listas <ul> y <li> con negritas <strong> para los títulos de cada paso.`;

    try {
        const result = await callGeminiAPI(prompt);
        output.innerHTML = limpiarMarkdown(result);
        
        // Anunciar éxito
        announceToScreenReader('Pasos de acción generados exitosamente');
        
    } catch (error) {
        output.innerHTML = '<p class="error">Lo sentimos, ocurrió un error al contactar al Asesor de IA. Por favor, intente de nuevo más tarde.</p>';
        
        // Anunciar error
        announceToScreenReader('Error al generar pasos de acción');
    }

    // Restaurar estado del botón
    loader.classList.add('hidden');
    button.disabled = false;
    button.setAttribute('aria-busy', 'false');
}

// Manejar generación de caso de estudio
async function handleGenerateCaseStudy() {
    const industryInput = document.getElementById('industry-input');
    const industry = industryInput.value.trim();
    
    if (!industry) {
        announceToScreenReader('Por favor, ingrese una industria antes de generar el caso de estudio');
        industryInput.focus();
        return;
    }

    const button = document.getElementById('generate-case-study-btn');
    const loader = document.getElementById('case-study-loader');
    const output = document.getElementById('case-study-output');

    if (!button || !loader || !output) return;

    // Actualizar estado del botón
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    loader.classList.remove('hidden');
    output.innerHTML = '';

    // Anunciar inicio del proceso
    announceToScreenReader(`Generando caso de estudio para la industria ${industry}, por favor espere...`);

    const prompt = `Escribe un caso de estudio breve y convincente (aproximadamente 150-200 palabras) sobre cómo una empresa ficticia en la industria de '${industry}' aplicó exitosamente la metodología de '${appState.currentTool.title}'. El caso de estudio debe describir el problema inicial, el enfoque que tomaron usando la metodología, y los resultados positivos que lograron. La respuesta debe estar en español y en formato HTML con un título <h4> y párrafos <p>.`;

    try {
        const result = await callGeminiAPI(prompt);
        output.innerHTML = limpiarMarkdown(result);
        
        // Anunciar éxito
        announceToScreenReader(`Caso de estudio para ${industry} generado exitosamente`);
        
    } catch (error) {
        output.innerHTML = '<p class="error">Lo sentimos, ocurrió un error al contactar al Asesor de IA. Por favor, intente de nuevo más tarde.</p>';
        
        // Anunciar error
        announceToScreenReader('Error al generar caso de estudio');
    }

    // Restaurar estado del botón
    loader.classList.add('hidden');
    button.disabled = false;
    button.setAttribute('aria-busy', 'false');
}

// Llamar a la API de Gemini
async function callGeminiAPI(prompt) {
    // Detectar si estamos en desarrollo o producción
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
        // En desarrollo: usar API directa (como en tu ejemplo)
        const apiKey = ""; // Clave vacía para desarrollo
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error de red: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                throw new Error("Respuesta inválida de la API de Gemini.");
            }
        } catch (error) {
            console.error("Error al llamar a la API de Gemini:", error);
            return `<p class="text-red-600">Lo sentimos, ocurrió un error al contactar al Asesor de IA. Por favor, intente de nuevo más tarde.</p>`;
        }
    } else {
        // En producción: usar proxy de Render
        const apiUrl = 'https://gemini-proxy-368279970472.southamerica-west1.run.app/api/gemini';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            
            if (!response.ok) {
                throw new Error(`Error de red: ${response.statusText}`);
            }
            
            const result = await response.json();
            if (result.text) {
                return result.text;
            } else {
                throw new Error("Respuesta inválida del proxy de Gemini.");
            }
        } catch (error) {
            console.error("Error al llamar al proxy de Gemini:", error);
            return `<p class="text-red-600">Lo sentimos, ocurrió un error al contactar al Asesor de IA. Por favor, intente de nuevo más tarde.</p>`;
        }
    }
}

// Copiar código Mermaid
function copyMermaidCode(button) {
    const codeElement = button.parentElement.querySelector('.mermaid-code code');
    if (!codeElement) return;

    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Cambiar temporalmente el texto del botón
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        button.setAttribute('aria-label', 'Código copiado al portapapeles');
        
        // Anunciar éxito
        announceToScreenReader('Código Mermaid copiado al portapapeles');
        
        // Restaurar después de 2 segundos
        setTimeout(() => {
            button.textContent = originalText;
            button.setAttribute('aria-label', 'Copiar código Mermaid');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        announceToScreenReader('Error al copiar el código');
    });
}

// Inicializar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
} 