/* ============================
   Data Loader - Manager Toolkit
   ============================ */

class ToolkitDataLoader {
    constructor() {
        this.data = [];
        this.categories = [
            'estrategia-planeacion',
            'finanzas-evaluacion', 
            'gestion-proyectos-riesgos',
            'descubrimiento-cliente',
            'analisis-datos-pronosticos',
            'diseno-mejora-procesos',
            'ideacion-validacion',
            'gestion-talento-cultura',
            'tecnologia-infraestructura'
        ];
        this.loadedCount = 0;
        this.totalFiles = this.categories.length;
        this.loadedCategories = new Set(); // Track categorías cargadas
        this.loadingPromises = new Map(); // Cache de promesas de carga
    }

    // Cargar todos los archivos de datos
    async loadAllData() {
        try {
            // console.log('🔄 Iniciando carga de datos del Manager Toolkit...');
            
            const loadPromises = this.categories.map(category => 
                this.loadCategoryData(category)
            );

            const results = await Promise.all(loadPromises);
            
            // Combinar todos los datos
            this.data = results.flat();
            
            // console.log(`✅ Datos cargados exitosamente: ${this.data.length} herramientas`);
            return this.data;
            
        } catch (error) {
            console.error('❌ Error cargando datos:', error);
            throw error;
        }
    }

    // NUEVO: Carga diferida por categoría
    async loadCategoryOnDemand(categoryName) {
        // Si ya está cargada, retornar datos existentes
        if (this.loadedCategories.has(categoryName)) {
            return this.data.filter(tool => tool.category === categoryName);
        }

        // Si ya está cargando, esperar
        if (this.loadingPromises.has(categoryName)) {
            return await this.loadingPromises.get(categoryName);
        }

        // Iniciar carga
        const loadPromise = this.loadCategoryData(categoryName);
        this.loadingPromises.set(categoryName, loadPromise);

        try {
            const categoryData = await loadPromise;
            this.loadedCategories.add(categoryName);
            this.loadingPromises.delete(categoryName);
            return categoryData;
        } catch (error) {
            this.loadingPromises.delete(categoryName);
            throw error;
        }
    }

    // NUEVO: Precargar categorías específicas
    async preloadCategories(categoryNames) {
        const promises = categoryNames
            .filter(cat => !this.loadedCategories.has(cat))
            .map(cat => this.loadCategoryOnDemand(cat));
        
        if (promises.length > 0) {
            // console.log(`🔄 Precargando categorías: ${categoryNames.join(', ')}`);
            await Promise.all(promises);
        }
    }

    // Cargar datos de una categoría específica
    async loadCategoryData(category) {
        try {
            const response = await fetch(`/tools/manager-toolkit/data/${category}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.loadedCount++;
            
            // console.log(`📁 Cargado: ${category}.json (${data.length} herramientas)`);
            
            return data;
            
        } catch (error) {
            console.error(`❌ Error cargando ${category}.json:`, error);
            // Retornar array vacío en caso de error para no romper la aplicación
            return [];
        }
    }

    // Obtener todas las herramientas
    getAllTools() {
        return this.data;
    }

    // Obtener herramientas por categoría (con carga diferida)
    async getToolsByCategory(categoryName) {
        if (categoryName === 'Todos') {
            // Si no están todas cargadas, cargar las faltantes
            if (this.loadedCategories.size < this.categories.length) {
                const missingCategories = this.categories.filter(cat => !this.loadedCategories.has(cat));
                await this.preloadCategories(missingCategories);
            }
            return this.data;
        }

        // Cargar categoría específica si no está cargada
        if (!this.loadedCategories.has(categoryName)) {
            await this.loadCategoryOnDemand(categoryName);
        }

        return this.data.filter(tool => tool.category === categoryName);
    }

    // Obtener categorías únicas
    getUniqueCategories() {
        const categories = [...new Set(this.data.map(item => item.category))];
        categories.sort();
        return ['Todos', ...categories];
    }

    // Obtener herramienta por ID
    getToolById(id) {
        return this.data.find(tool => tool.id === id);
    }

    // Verificar si los datos están cargados
    isDataLoaded() {
        return this.data.length > 0;
    }

    // NUEVO: Verificar si una categoría está cargada
    isCategoryLoaded(categoryName) {
        return this.loadedCategories.has(categoryName);
    }

    // Obtener estadísticas de carga
    getLoadStats() {
        return {
            totalTools: this.data.length,
            loadedFiles: this.loadedCount,
            totalFiles: this.totalFiles,
            categories: this.getUniqueCategories().length - 1, // -1 por "Todos"
            loadedCategories: this.loadedCategories.size,
            pendingLoads: this.loadingPromises.size
        };
    }

    // NUEVO: Limpiar cache de categorías no utilizadas
    cleanupUnusedCategories(keepCategories = []) {
        const categoriesToKeep = new Set(['Todos', ...keepCategories]);
        const unusedCategories = this.categories.filter(cat => !categoriesToKeep.has(cat));
        
        unusedCategories.forEach(cat => {
            if (this.loadedCategories.has(cat)) {
                this.loadedCategories.delete(cat);
                // Remover datos de categorías no utilizadas
                this.data = this.data.filter(tool => tool.category !== cat);
            }
        });

        // console.log(`🧹 Limpieza de cache: ${unusedCategories.length} categorías removidas`);
    }
}

// Exportar para uso global
window.ToolkitDataLoader = ToolkitDataLoader; 