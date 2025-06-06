# 🚀 Hassir Lastre Sierra - Personal Website

## Overview

This is the personal website for Hassir Lastre Sierra, Ph.D(c), International Consultant and Trainer. The site showcases professional services, expertise, and contact information in a modern, responsive design. It also includes an emotional intelligence assessment tool with data collection capabilities.

## ✨ Features

- **Modern Design**: Clean and professional layout with intuitive navigation
- **Fully Responsive**: Perfect viewing experience on all devices
- **Performance Optimized**: Fast loading with WebP images and optimized code
- **SEO Ready**: Structured data with schema.org and proper meta tags
- **Offline Support**: Service Worker implementation for offline functionality
- **Typewriter Effect**: Dynamic text animation in the hero section
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Interactive Elements**: Smooth animations and parallax scrolling effects
- **Emotional Intelligence Test**: Interactive assessment tool with results analysis

## 🛠️ Technologies

- HTML5 & CSS3
- Vanilla JavaScript
- Google Analytics
- Progressive Web App features
- WebP image optimization
- Firebase (for test data storage)
- Typed.js for text animation

## 🚀 Performance Optimizations

This website implements several best practices for web performance:

- WebP images with SVG fallbacks
- Semantic HTML structure
- CSS variables for consistent styling
- Deferred JavaScript loading
- Service Worker for offline capabilities
- Optimized asset delivery
- Intersection Observer for efficient animations

## 📱 Responsive Design

The website is fully responsive with dedicated layouts for:
- Mobile devices
- Tablets
- Desktop screens

## 🔍 SEO Enhancements

- Structured data using schema.org
- Open Graph meta tags for social sharing
- Comprehensive sitemap.xml
- Proper robots.txt configuration
- Semantic HTML elements
- Descriptive metadata

## 📊 Applications

The website includes the following applications:

- **Main Site**: Professional portfolio and contact information
- **Emotional Intelligence Test**: Interactive assessment tool with Firebase backend for data collection and analysis

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

© 2025 Hassir Lastre. All rights reserved.

---

Designed and developed by Hassir Lastre Sierra

# Hassir Lastre Personal Website

Sitio web personal y portafolio de Hassir Lastre Sierra.

## Características

- **SEO** optimizado (Open Graph, Twitter Card, canonical, meta).
- **Performance**: imágenes WebP, lazy loading, preload, defer.
- **Accesibilidad**: navegación por teclado, skip links, labels.
- **Internacionalización**: selector de idioma (ES/EN) y textos multilingües.
- **PWA**: manifest y Service Worker para modo offline.
- **Seguridad**: CSP, validación y escape de entradas, HTTPS.
- **Escalabilidad**: variables CSS, helpers, estructura modular JS.

## Estructura

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

## Instalación y desarrollo

1. Clona el repositorio.
2. Sirve el sitio con un servidor estático (ej: `npx serve .` o similar).
3. Accede a `https://localhost:PORT/` para probar el PWA y modo offline.

## PWA

- El Service Worker cachea archivos estáticos para navegación offline.
- El archivo `site.webmanifest` define el icono y nombre de la app.
- Para pruebas de push, consulta la [documentación de Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API).

## Seguridad

- Usa HTTPS siempre.
- Valida y escapa entradas de usuario en formularios y resultados.
- CSP definida en el `<head>` de cada HTML.

## Internacionalización

- Selector de idioma en el header y/o footer.
- Textos clave con IDs y archivos JS de traducción por herramienta/página.
- Traducción dinámica de navbar, botones y secciones clave en todas las páginas y herramientas.

## Mantenimiento

- Variables y helpers CSS centralizados.
- Comentarios de sección en CSS y JS.
- Estructura modular y escalable.

## Autor

Hassir Lastre Sierra  
[https://hassirlastre.com](https://hassirlastre.com)