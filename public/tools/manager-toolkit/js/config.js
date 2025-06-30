/* ============================
   Manager Toolkit - Configuración
   ============================ */

const ToolkitConfig = {
    // Configuración de carga diferida
    lazyLoading: {
        enabled: true,
        initialCategories: ['estrategia-planeacion', 'finanzas-evaluacion'],
        preloadAdjacent: true, // Precargar categorías adyacentes
        cacheTimeout: 5 * 60 * 1000, // 5 minutos
        maxCachedCategories: 3
    },

    // Configuración de rendimiento
    performance: {
        showIndicator: true,
        indicatorTimeout: 7000, // 7 segundos
        animationDelay: 2000, // 2 segundos
        debounceDelay: 300 // Para búsquedas
    },

    // Configuración de UI
    ui: {
        showLoadingStates: true,
        showCategoryIndicators: true,
        smoothTransitions: true,
        autoHidePerformanceIndicator: true
    },

    // Configuración de cache
    cache: {
        enabled: true,
        strategy: 'lru', // Least Recently Used
        maxSize: 50 // Máximo 50 herramientas en cache
    },

    // Configuración de API (para el asesor IA)
    api: {
        timeout: 30000, // 30 segundos
        retryAttempts: 3,
        retryDelay: 1000 // 1 segundo
    },

    // Configuración de animaciones
    animations: {
        cardDelay: 100, // ms entre animaciones de cards
        modalTransition: 300, // ms para transiciones de modal
        fadeInDuration: 600 // ms para fade in
    },

    // Configuración de debug
    debug: {
        enabled: false,
        logLevel: 'info', // 'error', 'warn', 'info', 'debug'
        showPerformanceLogs: true,
        showCacheLogs: false
    }
};

// Función para obtener configuración
function getConfig(key) {
    const keys = key.split('.');
    let value = ToolkitConfig;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return undefined;
        }
    }
    
    return value;
}

// Función para actualizar configuración
function updateConfig(key, value) {
    const keys = key.split('.');
    let config = ToolkitConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in config)) {
            config[keys[i]] = {};
        }
        config = config[keys[i]];
    }
    
    config[keys[keys.length - 1]] = value;
}

// Función para logging condicional
function log(level, message, ...args) {
    const debugEnabled = getConfig('debug.enabled');
    const logLevel = getConfig('debug.logLevel');
    
    if (!debugEnabled) return;
    
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = levels[logLevel] || 0;
    const messageLevel = levels[level] || 0;
    
    if (messageLevel <= currentLevel) {
        const prefix = `[Manager Toolkit]`;
        switch (level) {
            case 'error':
                console.error(prefix, message, ...args);
                break;
            case 'warn':
                console.warn(prefix, message, ...args);
                break;
            case 'info':
                console.info(prefix, message, ...args);
                break;
            case 'debug':
                console.debug(prefix, message, ...args);
                break;
        }
    }
}

// Función para medir rendimiento
function measurePerformance(name, fn) {
    return async (...args) => {
        const start = performance.now();
        try {
            const result = await fn(...args);
            const duration = performance.now() - start;
            
            if (getConfig('debug.showPerformanceLogs')) {
                log('info', `${name} completado en ${Math.round(duration)}ms`);
            }
            
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            log('error', `${name} falló después de ${Math.round(duration)}ms:`, error);
            throw error;
        }
    };
}

// Función para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exportar para uso global
window.ToolkitConfig = ToolkitConfig;
window.getConfig = getConfig;
window.updateConfig = updateConfig;
window.log = log;
window.measurePerformance = measurePerformance;
window.debounce = debounce;
window.throttle = throttle;

// Configuración de la aplicación
const CONFIG = {
    // API Key de Gemini - Reemplaza con tu clave real
    GEMINI_API_KEY: 'AIzaSyB3DFJdEJZvXX5l9hfCXfKWoKdAUNx43Ec',
    
    // URL base de la API de Gemini
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};

// Función para obtener la API key de forma segura
function getGeminiApiKey() {
    // En producción, esto debería venir de variables de entorno
    // Por ahora, usa la clave del archivo de configuración
    return CONFIG.GEMINI_API_KEY;
}

// Función para construir la URL completa de la API
function getGeminiApiUrl() {
    const apiKey = getGeminiApiKey();
    return `${CONFIG.GEMINI_API_URL}?key=${apiKey}`;
} 