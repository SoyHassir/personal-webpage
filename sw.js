// Service Worker for Hassir Lastre personal website
// This script enables offline functionality by caching important resources

// Cache name with version - change this when updating resources
const CACHE_NAME = 'hassir-lastre-v4'; // <<-- Actualizado (ej. a v4)

// List of resources to cache for offline access
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css', 
  '/js/index.js',   
  '/img/Logo.svg',
  '/img/Logo.webp',
  '/img/profile-image.svg',
  '/img/profile-image.webp',
  '/img/about-image.svg',
  '/img/about-image.webp',
  '/img/contact-img.svg',
  '/img/contact-img.webp',
  '/img/favicon-new.svg?v=2024', 
  '/site.webmanifest',

  // External resources
  'https://cdn.jsdelivr.net/npm/typed.js@2.0.12',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap',

  // Test IE route resources
  '/tools-pages/test-ie/',
  '/tools-pages/test-ie/index.html',
  '/tools-pages/test-ie/styles.css', 
  '/tools-pages/test-ie/script.js',  

  // i-validation resources
  '/tools-pages/i-validation/',                
  '/tools-pages/i-validation/index.html',      
  '/tools-pages/i-validation/style.css',       
  '/tools-pages/i-validation/script.js',       
  '/tools-pages/i-validation/audio/podcast_poc.mp3', 
  '/tools-pages/i-validation/resources/guia_PoC.pdf',      
  '/tools-pages/i-validation/resources/plantilla_para_definir_PoC.pdf' 
];

// Install event - cache all required resources when SW is installed
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Abriendo caché y añadiendo URLs principales');
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
      })
      .then(() => {
        console.log('Service Worker: Todos los recursos principales cacheados, instalación completa.');
        return self.skipWaiting(); 
      })
      .catch(error => {
        console.error('Service Worker: Falló la precarga de la caché durante la instalación:', error);
      })
  );
});

// Fetch event - intercept requests and serve from cache when available
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(cachedResponse => {
            return cachedResponse || caches.match('/index.html'); 
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          networkResponse => {
            if(!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        ).catch(error => {
          console.error('Service Worker: Fallo al obtener de la red y no está en caché:', event.request.url, error);
        });
      })
  );
});

// Activate event - clean up old caches when SW is activated
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; 
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Cachés antiguas limpiadas, activación completa.');
      return self.clients.claim(); 
    })
  );
});