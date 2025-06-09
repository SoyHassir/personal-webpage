// Service Worker para cachear archivos estáticos y permitir modo offline

const CACHE_NAME = 'hlastre-pwa-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/min/global.min.css',
  '/min/i18n.min.js',
  '/min/enhanced-animations.min.js',
  '/js/base.js',
  '/js/index.js',
  '/img/optimized-logo/logo-large.avif',
  '/img/optimized-profile/profile-large.avif',
  '/img/cover-home-section.webp',
  '/img/favicon-new.ico',
  '/site.webmanifest'
];

// Instala el SW y cachea archivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Activa el SW y limpia caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Intercepta fetch y responde desde cache si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
