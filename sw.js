// Service Worker for Hassir Lastre personal website
// This script enables offline functionality by caching important resources

// Cache name with version - change this when updating resources
const CACHE_NAME = 'hassir-lastre-v2';

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
  // External resources
  'https://cdn.jsdelivr.net/npm/typed.js@2.0.12',
  // New test route resources
  '/test-ie/',
  '/test-ie/index.html',
  '/test-ie/css/style.css',
  '/test-ie/js/script.js'
];

// Install event - cache all required resources when SW is installed
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - intercept requests and serve from cache when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network and cache the response
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
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
          // Delete any outdated caches
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});