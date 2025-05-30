// Use strict mode
'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI components
  initPreloader();
  initNavigation();
  initTypewriter();
  initScrollEffects();
  initDarkMode();
  initBackToTop();
  initAnimations();
  initServiceWorker();
  initLazyLoading();
});

// Lazy loading for images
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Resto del JavaScript se mantiene igual...