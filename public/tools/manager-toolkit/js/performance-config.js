/**
 * Performance Configuration for Manager Toolkit
 * Configuración para optimizaciones de rendimiento
 */

const PerformanceConfig = {
    // Skeleton Loading
    skeleton: {
        enabled: true,
        cardCount: 12,
        animationDuration: 1500,
        showFilters: true,
        showTabs: true
    },
    
    // Debouncing
    debouncing: {
        enabled: true,
        searchDelay: 300,
        filterDelay: 200,
        scrollDelay: 16, // ~60fps
        visualFeedback: true
    },
    
    // Event Delegation
    eventDelegation: {
        enabled: true,
        globalHandlers: true,
        keyboardSupport: true,
        accessibility: true
    },
    
    // Intersection Observer
    intersectionObserver: {
        enabled: true,
        rootMargin: '50px',
        threshold: 0.1,
        lazyLoad: true,
        animationDelay: 50
    },
    
    // Performance Monitoring
    monitoring: {
        enabled: true,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        measureOperations: true,
        trackMetrics: true
    },
    
    // Accessibility
    accessibility: {
        screenReaderAnnouncements: true,
        keyboardNavigation: true,
        focusManagement: true,
        ariaLabels: true
    },
    
    // Fallbacks
    fallbacks: {
        enableLegacySupport: true,
        gracefulDegradation: true,
        errorHandling: true
    }
};

// Función para obtener configuración
function getPerformanceConfig(path) {
    const keys = path.split('.');
    let config = PerformanceConfig;
    
    for (const key of keys) {
        if (config && typeof config === 'object' && key in config) {
            config = config[key];
        } else {
            return undefined;
        }
    }
    
    return config;
}

// Función para actualizar configuración
function updatePerformanceConfig(path, value) {
    const keys = path.split('.');
    let config = PerformanceConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in config)) {
            config[key] = {};
        }
        config = config[key];
    }
    
    config[keys[keys.length - 1]] = value;
}

// Función para verificar si una optimización está habilitada
function isOptimizationEnabled(optimization) {
    return getPerformanceConfig(`${optimization}.enabled`) !== false;
}

// Función para obtener delay de debouncing
function getDebounceDelay(type) {
    return getPerformanceConfig(`debouncing.${type}Delay`) || 300;
}

// Función para obtener configuración de Intersection Observer
function getIntersectionObserverConfig() {
    return {
        rootMargin: getPerformanceConfig('intersectionObserver.rootMargin'),
        threshold: getPerformanceConfig('intersectionObserver.threshold')
    };
}

// Función para logging de rendimiento
function logPerformance(message, level = 'info') {
    if (!getPerformanceConfig('monitoring.enabled')) return;
    
    const logLevel = getPerformanceConfig('monitoring.logLevel');
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    
    if (levels[level] >= levels[logLevel]) {
        const timestamp = new Date().toISOString();
        const prefix = '[Performance]';
        
        switch (level) {
            case 'debug':
                console.debug(`${prefix} ${timestamp}: ${message}`);
                break;
            case 'info':
                console.info(`${prefix} ${timestamp}: ${message}`);
                break;
            case 'warn':
                console.warn(`${prefix} ${timestamp}: ${message}`);
                break;
            case 'error':
                console.error(`${prefix} ${timestamp}: ${message}`);
                break;
        }
    }
}

// Función para medir rendimiento de operaciones
function measurePerformance(name, operation) {
    if (!getPerformanceConfig('monitoring.measureOperations')) {
        return operation();
    }
    
    return async (...args) => {
        const start = performance.now();
        try {
            const result = await operation(...args);
            const duration = performance.now() - start;
            
            logPerformance(`${name} completado en ${Math.round(duration)}ms`, 'info');
            
            if (duration > 100) {
                logPerformance(`${name} tardó ${Math.round(duration)}ms (lento)`, 'warn');
            }
            
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            logPerformance(`${name} falló después de ${Math.round(duration)}ms: ${error.message}`, 'error');
            throw error;
        }
    };
}

// Exportar configuración global
window.PerformanceConfig = PerformanceConfig;
window.getPerformanceConfig = getPerformanceConfig;
window.updatePerformanceConfig = updatePerformanceConfig;
window.isOptimizationEnabled = isOptimizationEnabled;
window.getDebounceDelay = getDebounceDelay;
window.getIntersectionObserverConfig = getIntersectionObserverConfig;
window.logPerformance = logPerformance;
window.measurePerformance = measurePerformance; 