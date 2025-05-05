// Modern UI Enhancement for Hassir Lastre Sierra website

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
});

// Preloader
function initPreloader() {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = '<div class="preloader-spinner"></div>';
  document.body.appendChild(preloader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remove preloader from DOM after animation completes
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 500);
  });
}

// Navigation
// Navigation
function initNavigation() {
  const menu = document.querySelector('.menu');
  const openMenuBtn = document.querySelector('.open-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const navBar = document.querySelector('.topheader');
  const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

  openMenuBtn.style.display = 'block';
  closeMenuBtn.style.display = 'none';
  
  // Función mejorada para alternar el menú
  function toggleMenu() {
    menu.classList.toggle('menu_opened');
    
    // Si el menú está abierto, mostrar X y ocultar burger
    if (menu.classList.contains('menu_opened')) {
      closeMenuBtn.style.display = 'block';
      openMenuBtn.style.display = 'none';
    } else {
      // Si el menú está cerrado, mostrar burger y ocultar X
      closeMenuBtn.style.display = 'none';
      openMenuBtn.style.display = 'block';
    }
  }
  
  // Asegurar que el botón de cierre esté oculto inicialmente
  closeMenuBtn.classList.add('hidden');
  
  // Agregar event listeners a los botones del menú
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  
  // Cerrar menú al hacer clic en elementos del menú
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', function() {
      // Cerrar el menú
      menu.classList.remove('menu_opened');
      
      // Mostrar el botón hamburguesa y ocultar el botón X explícitamente
      document.querySelector('.open-menu').style.display = 'block';
      document.querySelector('.close-menu').style.display = 'none';
    });
  });
  
  // Intersection Observer para secciones
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const menuLink = document.querySelector(`.menu a[href="#${id}"]`);
        
        if (entry.isIntersecting && menuLink) {
          document.querySelectorAll('.menu a.selected').forEach(item => {
            item.classList.remove('selected');
          });
          menuLink.classList.add('selected');
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );
  
  // Observar todas las secciones
  menuLinks.forEach((menuLink) => {
    const hash = menuLink.getAttribute('href');
    const target = document.querySelector(hash);
    if (target) {
      observer.observe(target);
    }
  });
  
  // Efecto de scroll para la barra de navegación
  let prevScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    // Mostrar/ocultar navbar al hacer scroll
    if (prevScrollY > window.scrollY) {
      navBar.classList.remove('off');
    } 
    
    // Agregar fondo sólido al hacer scroll hacia abajo
    if (window.scrollY > 50) {
      navBar.classList.add('solid');
    } else {
      navBar.classList.remove('solid');
    }
    
    prevScrollY = window.scrollY;
  });
}

// Typewriter effect
function initTypewriter() {
  const typed = new Typed('.typed', {
    strings: [
      '<i class="names">Hassir Lastre Sierra</i>',
      '<i class="names">Profesor Universitario</i>',
      '<i class="names">Investigador Junior</i>',
      '<i class="names">Consultor Estratégico</i>',
      '<i class="names">Analista de Datos</i>',
    ],
    stringsElement: '#cadenas-texto',
    typeSpeed: 75,
    startDelay: 300,
    backSpeed: 75,
    smartBackspace: true,
    shuffle: false,
    backDelay: 1500,
    loop: true,
    loopCount: false,
    showCursor: true,
    cursorChar: '|',
    contentType: 'html',
  });
}

// Scroll animations
function initScrollEffects() {
  // Add animation classes to elements
  const fadeElements = document.querySelectorAll('.card, .greeting, h2');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
  });
  
  const leftElements = document.querySelectorAll('.about-container');
  leftElements.forEach(el => {
    el.classList.add('slide-in-left');
  });
  
  const rightElements = document.querySelectorAll('.about-image-container, .contact-info');
  rightElements.forEach(el => {
    el.classList.add('slide-in-right');
  });
  
  const zoomElements = document.querySelectorAll('.image, .contac-image-container');
  zoomElements.forEach(el => {
    el.classList.add('zoom-in');
  });
  
  // Intersection Observer for animations
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation is triggered
          animationObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Observe all elements with animation classes
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in').forEach(el => {
    animationObserver.observe(el);
  });
}

// Dark mode toggle
function initDarkMode() {
  // Create dark mode toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Cambiar tema');
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  document.body.appendChild(themeToggle);
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  
  // Toggle dark mode
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
}

// Back to top button
function initBackToTop() {
  // Create back to top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Volver arriba');
  backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backToTop);
  
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Scroll to top on click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Animation triggers on scroll
function initAnimations() {
  // Add subtle parallax effect to sections
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Apply parallax to home section
    const homeSection = document.querySelector('.home');
    if (homeSection) {
      homeSection.style.backgroundPositionY = `${scrollY * 0.5}px`;
    }
    
    // Apply slight rotation to profile image on scroll
    const profileImage = document.querySelector('.image');
    if (profileImage) {
      const rotation = scrollY * 0.02;
      profileImage.style.transform = `rotate(${rotation}deg)`;
    }
  });
}

// Service Worker Registration
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registrado correctamente:', registration.scope);
        })
        .catch(error => {
          console.log('Registro de ServiceWorker fallido:', error);
        });
    });
  }
}

