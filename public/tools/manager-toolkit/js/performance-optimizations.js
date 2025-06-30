/**
 * Performance Optimizations for Manager Toolkit
 * Implementa: Skeleton Loading, Debouncing, Event Delegation, Intersection Observer
 */

class PerformanceOptimizations {
    constructor() {
        this.debounceTimers = new Map();
        this.intersectionObserver = null;
        this.eventDelegationHandlers = new Map();
        this.skeletonElements = new Set();
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupEventDelegation();
        this.setupDebouncing();
        this.setupSkeletonLoading();
    }

    /**
     * Skeleton Loading Implementation
     */
    setupSkeletonLoading() {
        // Crear skeleton cards para la carga inicial
        this.createSkeletonCards();
        
        // Observar cuando se cargan los datos reales
        this.observeDataLoading();
    }

    createSkeletonCards(count = 12) {
        const cardsGrid = document.getElementById('cards-grid');
        if (!cardsGrid) return;

        const skeletonHTML = Array.from({ length: count }, () => `
            <div class="skeleton-card performance-optimized">
                <div class="skeleton skeleton-badge"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-motto"></div>
                <div class="skeleton skeleton-motto"></div>
                <div class="skeleton skeleton-view-more"></div>
            </div>
        `).join('');

        cardsGrid.innerHTML = skeletonHTML;
        
        // Marcar elementos como skeleton
        cardsGrid.querySelectorAll('.skeleton-card').forEach(card => {
            this.skeletonElements.add(card);
        });
    }

    createSkeletonFilters() {
        const categoryFilters = document.getElementById('category-filters');
        if (!categoryFilters) return;

        const categories = ['Todos', 'Estrategia', 'Finanzas', 'Proyectos', 'Cliente', 'Datos', 'Procesos', 'Talento'];
        const skeletonHTML = categories.map(() => `
            <div class="skeleton skeleton-button"></div>
        `).join('');

        categoryFilters.innerHTML = skeletonHTML;
    }

    createSkeletonTabs() {
        const modalTabs = document.getElementById('modal-tabs');
        if (!modalTabs) return;

        const tabs = ['Definición', 'Insight', 'Diagrama', 'Puntos Clave', 'Asesor IA'];
        const skeletonHTML = tabs.map(() => `
            <div class="skeleton skeleton-tab"></div>
        `).join('');

        modalTabs.innerHTML = skeletonHTML;
    }

    createSkeletonContent() {
        const modalBodyContent = document.getElementById('modal-body-content');
        if (!modalBodyContent) return;

        const skeletonHTML = `
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
        `;

        modalBodyContent.innerHTML = skeletonHTML;
    }

    replaceSkeletonWithContent(element, content) {
        if (this.skeletonElements.has(element)) {
            element.innerHTML = content;
            element.classList.remove('skeleton-card');
            this.skeletonElements.delete(element);
            
            // Agregar clase para animación de entrada
            element.classList.add('lazy-load');
            
            // Trigger reflow para que la animación funcione
            element.offsetHeight;
            element.classList.add('loaded');
        }
    }

    observeDataLoading() {
        // Observar cuando se cargan los datos reales
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('tool-card')) {
                            // Remover skeleton correspondiente
                            const skeletonCard = node.previousElementSibling;
                            if (skeletonCard && skeletonCard.classList.contains('skeleton-card')) {
                                skeletonCard.remove();
                                this.skeletonElements.delete(skeletonCard);
                            }
                        }
                    });
                }
            });
        });

        const cardsGrid = document.getElementById('cards-grid');
        if (cardsGrid) {
            observer.observe(cardsGrid, { childList: true, subtree: true });
        }
    }

    /**
     * Debouncing Implementation
     */
    setupDebouncing() {
        // Debouncing para búsqueda y filtros
        this.setupSearchDebouncing();
        this.setupFilterDebouncing();
        this.setupScrollDebouncing();
    }

    debounce(func, delay, key = 'default') {
        return (...args) => {
            if (this.debounceTimers.has(key)) {
                clearTimeout(this.debounceTimers.get(key));
            }
            
            const timer = setTimeout(() => {
                func.apply(this, args);
                this.debounceTimers.delete(key);
            }, delay);
            
            this.debounceTimers.set(key, timer);
        };
    }

    setupSearchDebouncing() {
        const searchInputs = document.querySelectorAll('input[type="search"], input[type="text"]');
        searchInputs.forEach(input => {
            const debouncedSearch = this.debounce((value) => {
                this.performSearch(value);
            }, 300, `search-${input.id}`);
            
            input.addEventListener('input', (e) => {
                this.addDebouncingVisualFeedback(input);
                debouncedSearch(e.target.value);
            });
        });
    }

    setupFilterDebouncing() {
        const categoryFilters = document.getElementById('category-filters');
        if (categoryFilters) {
            const debouncedFilter = this.debounce((category) => {
                this.performFilter(category);
            }, 200, 'category-filter');
            
            this.eventDelegationHandlers.set('category-filter', debouncedFilter);
        }
    }

    setupScrollDebouncing() {
        const debouncedScroll = this.debounce(() => {
            this.handleScrollOptimized();
        }, 16, 'scroll'); // ~60fps
        
        window.addEventListener('scroll', debouncedScroll, { passive: true });
    }

    addDebouncingVisualFeedback(element) {
        element.classList.add('debouncing');
        element.setAttribute('aria-busy', 'true');
        
        setTimeout(() => {
            element.classList.remove('debouncing');
            element.removeAttribute('aria-busy');
        }, 300);
    }

    performSearch(value) {
        // Implementar búsqueda optimizada
        console.log('Búsqueda optimizada:', value);
        // Aquí se integraría con la funcionalidad existente
    }

    performFilter(category) {
        // Implementar filtrado optimizado
        console.log('Filtrado optimizado:', category);
        // Aquí se integraría con la funcionalidad existente
    }

    handleScrollOptimized() {
        // Optimizaciones de scroll
        const navbar = document.querySelector('.topheader');
        if (navbar) {
            const scrolled = window.scrollY > 50;
            navbar.classList.toggle('solid', scrolled);
        }
    }

    /**
     * Event Delegation Implementation
     */
    setupEventDelegation() {
        // Event delegation para cards
        this.setupCardsEventDelegation();
        
        // Event delegation para tabs
        this.setupTabsEventDelegation();
        
        // Event delegation para botones
        this.setupButtonsEventDelegation();
    }

    setupCardsEventDelegation() {
        const cardsGrid = document.getElementById('cards-grid');
        if (!cardsGrid) return;

        cardsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.tool-card, .skeleton-card');
            if (card) {
                this.handleCardClick(card, e);
            }
        });

        // Keyboard navigation
        cardsGrid.addEventListener('keydown', (e) => {
            const card = e.target.closest('.tool-card, .skeleton-card');
            if (card && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.handleCardClick(card, e);
            }
        });
    }

    setupTabsEventDelegation() {
        const modalTabs = document.getElementById('modal-tabs');
        if (!modalTabs) return;

        modalTabs.addEventListener('click', (e) => {
            const tab = e.target.closest('.tab-button, .skeleton-tab');
            if (tab) {
                this.handleTabClick(tab, e);
            }
        });
    }

    setupButtonsEventDelegation() {
        document.addEventListener('click', (e) => {
            // Botones de IA
            if (e.target.matches('.gemini-button')) {
                this.handleAIButtonClick(e.target, e);
            }
            
            // Botón de cerrar modal
            if (e.target.matches('.close-modal, .close-modal *')) {
                this.handleCloseModalClick(e);
            }
            
            // Botón de copiar
            if (e.target.matches('.copy-button')) {
                this.handleCopyButtonClick(e.target, e);
            }
        });
    }

    handleCardClick(card, event) {
        const toolId = card.dataset.id;
        if (toolId) {
            // Integrar con la funcionalidad existente de apertura de modal
            if (typeof openModal === 'function') {
                openModal(toolId);
            }
        }
    }

    handleTabClick(tab, event) {
        const tabId = tab.dataset.tab;
        if (tabId) {
            // Integrar con la funcionalidad existente de tabs
            if (typeof renderTabContent === 'function') {
                renderTabContent(tabId);
            }
        }
    }

    handleAIButtonClick(button, event) {
        const buttonId = button.id;
        if (buttonId === 'generate-steps-btn') {
            if (typeof handleGenerateSteps === 'function') {
                handleGenerateSteps();
            }
        } else if (buttonId === 'generate-case-study-btn') {
            if (typeof handleGenerateCaseStudy === 'function') {
                handleGenerateCaseStudy();
            }
        }
    }

    handleCloseModalClick(event) {
        if (typeof closeModal === 'function') {
            closeModal();
        }
    }

    handleCopyButtonClick(button, event) {
        if (typeof copyMermaidCode === 'function') {
            copyMermaidCode(button);
        }
    }

    /**
     * Intersection Observer Implementation
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleIntersection(entry.target);
                }
            });
        }, options);

        // Observar elementos que necesitan lazy loading
        this.observeLazyElements();
    }

    observeLazyElements() {
        // Observar cards
        const cards = document.querySelectorAll('.tool-card, .skeleton-card');
        cards.forEach(card => {
            this.intersectionObserver.observe(card);
        });

        // Observar elementos del modal
        const modalElements = document.querySelectorAll('.modal-content, .tab-content');
        modalElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    handleIntersection(element) {
        // Agregar clase para animación
        element.classList.add('lazy-load');
        
        // Trigger reflow
        element.offsetHeight;
        
        // Agregar clase loaded después de un pequeño delay
        requestAnimationFrame(() => {
            element.classList.add('loaded');
        });

        // Dejar de observar si ya no es necesario
        if (element.classList.contains('loaded')) {
            this.intersectionObserver.unobserve(element);
        }
    }

    /**
     * Performance Monitoring
     */
    measurePerformance(name, fn) {
        return async (...args) => {
            const start = performance.now();
            try {
                const result = await fn(...args);
                const duration = performance.now() - start;
                this.logPerformance(name, duration);
                return result;
            } catch (error) {
                const duration = performance.now() - start;
                this.logPerformance(name, duration, error);
                throw error;
            }
        };
    }

    logPerformance(name, duration, error = null) {
        const status = error ? '❌' : '✅';
        console.log(`${status} ${name}: ${Math.round(duration)}ms`);
        
        if (duration > 100) {
            console.warn(`⚠️ Performance warning: ${name} took ${Math.round(duration)}ms`);
        }
    }

    /**
     * Cleanup
     */
    cleanup() {
        // Limpiar timers de debouncing
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();

        // Desconectar intersection observer
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }

        // Limpiar event listeners
        this.eventDelegationHandlers.clear();
    }
}

// Inicializar optimizaciones cuando el DOM esté listo
let performanceOptimizations;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        performanceOptimizations = new PerformanceOptimizations();
    });
} else {
    performanceOptimizations = new PerformanceOptimizations();
}

// Exportar para uso global
window.PerformanceOptimizations = PerformanceOptimizations;
window.performanceOptimizations = performanceOptimizations; 