# 🚀 Hassir Lastre Sierra - Personal Website

A modern, responsive, SEO-optimized personal website and professional portfolio for Hassir Lastre Sierra. Features bilingual content (ES/EN), dynamic navigation, PWA support, accessibility enhancements, interactive tools, and structured data for academic and consulting credentials.

## Features

- Modern, clean design with intuitive navigation
- Fully responsive (mobile, tablet, desktop)
- SEO optimized (schema.org, Open Graph, meta tags, sitemap, robots.txt)
- Performance: WebP images, lazy loading, preload, defer
- Accessibility: keyboard navigation, skip links, proper labels
- Internationalization: language selector (ES/EN), dynamic translation of navbar and key sections
- PWA: manifest and Service Worker for offline support
- Security: HTTPS, CSP, input validation/escaping
- Modular, scalable structure (CSS variables, helpers, modular JS)
- Interactive tools: Emotional Intelligence Test (with Firebase), PODC Simulator, Business Idea Validation
- Dark mode toggle

## Structure

```
/
├── css/
├── img/
├── js/
├── tools/
│   ├── test-ie/
│   ├── podc-simulator/
│   └── i-validation/
├── service-worker.js
├── site.webmanifest
├── index.html
└── README.md
```

## Author

Hassir Lastre Sierra  
[https://hassirlastre.com](https://hassirlastre.com)

© 2025 Hassir Lastre. All rights reserved.

## 🚀 Cómo probar el proyecto localmente

### Opción 1: Usando http-server (Recomendado)
```bash
# Instalar http-server globalmente (si no lo tienes)
npm install -g http-server

# Navegar al directorio del proyecto
cd personal-website

# Iniciar el servidor
npx http-server ./public -p 8080 --cors
```

### Opción 2: Usando Python
```bash
# Navegar al directorio public
cd public

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

### Opción 3: Usando Node.js
```bash
# Instalar serve globalmente
npm install -g serve

# Iniciar el servidor
serve ./public -p 8080
```

## 🌐 Acceso al sitio

Una vez iniciado el servidor, puedes acceder a:

- **Página principal**: http://localhost:8080/
- **Herramienta i-validation**: http://localhost:8080/tools/i-validation/
- **Manager Toolkit**: http://localhost:8080/tools/manager-toolkit/
- **Test IE**: http://localhost:8080/tools/test-ie/

## 🌙 Funcionalidad Dark Mode

El sitio incluye un sistema completo de dark mode que:

### ✅ Características implementadas:
- **Detección automática**: Respeta la preferencia del sistema operativo
- **Persistencia**: Guarda la preferencia del usuario en localStorage
- **Sin flash**: Aplica el tema inmediatamente al cargar la página
- **Botón flotante**: Toggle fácil de usar en la esquina inferior izquierda
- **Estilos completos**: Afecta a todas las secciones y componentes

### 🎨 Elementos con dark mode:
- Fondo general y secciones
- Textos y tipografías
- Tarjetas y contenedores
- Header y navegación
- Footer
- Botones flotantes
- Elementos de formulario
- Tooltips y elementos decorativos

### 🔧 Cómo funciona:
1. **Script crítico**: Se ejecuta inmediatamente en el `<head>` para evitar flash
2. **CSS inline**: Estilos críticos incluidos en el HTML
3. **CSS completo**: Estilos detallados en `global.css`
4. **JavaScript**: Lógica de toggle y persistencia en `base.js`

## 📁 Estructura del proyecto

```
personal-website/
├── public/                 # Archivos del sitio web
│   ├── index.html         # Página principal
│   ├── css/
│   │   └── global.css     # Estilos principales
│   ├── js/
│   │   ├── base.js        # Funcionalidades globales (dark mode, navegación)
│   │   └── index.js       # Funcionalidades específicas de la página
│   ├── min/               # Archivos minificados
│   ├── tools/             # Herramientas adicionales
│   │   ├── i-validation/
│   │   ├── manager-toolkit/
│   │   └── test-ie/
│   └── img/               # Imágenes optimizadas
├── firebase.json          # Configuración de Firebase
└── README.md             # Este archivo
```

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y gradientes
- **JavaScript ES6+**: Funcionalidades interactivas
- **Font Awesome**: Iconografía
- **Optimización**: Imágenes WebP/AVIF, CSS/JS minificado
- **PWA**: Service Worker y manifest para instalación

## 🎯 Características principales

- ✅ **Responsive Design**: Adaptable a todos los dispositivos
- ✅ **Dark Mode**: Sistema completo de tema oscuro
- ✅ **Accesibilidad**: Cumple estándares WCAG
- ✅ **Performance**: Optimizado para velocidad
- ✅ **SEO**: Meta tags y estructura optimizada
- ✅ **PWA**: Instalable como aplicación

## 🔍 Solución de problemas

### Dark Mode no funciona:
1. Verifica que el archivo `base.js` se esté cargando
2. Revisa la consola del navegador para errores
3. Asegúrate de que Font Awesome esté cargado
4. Limpia el localStorage si hay conflictos

### Servidor no inicia:
1. Verifica que el puerto 8080 esté libre
2. Intenta con otro puerto: `npx http-server ./public -p 3000`
3. Asegúrate de estar en el directorio correcto

### Estilos no se cargan:
1. Verifica que los archivos CSS estén en la ruta correcta
2. Revisa la consola del navegador para errores 404
3. Limpia la caché del navegador

## 📞 Contacto

Para soporte técnico o consultas sobre el proyecto:
- **Email**: hassir.lastre@gmail.com
- **LinkedIn**: [Hassir Lastre Sierra](https://www.linkedin.com/in/hassirlastresierra)
- **GitHub**: [@SoyHassir](https://github.com/SoyHassir)