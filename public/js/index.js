/* ============================
   Funcionalidad específica: Página principal
   ============================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter(window.getTypewriterStrings(document.documentElement.lang));
  // Initialize UI components
  initScrollEffects();
  initAnimations();
});

// Devuelve los textos del typewriter según el idioma
window.getTypewriterStrings = function(lang) {
  if (lang === "en") {
    return [
      '<i class="names">Hassir Lastre Sierra</i>',
      '<i class="names">University Professor</i>',
      '<i class="names">Junior Researcher</i>',
      '<i class="names">Strategic Consultant</i>',
      '<i class="names">Data Analyst</i>',
    ];
  }
  // Español por defecto
  return [
    '<i class="names">Hassir Lastre Sierra</i>',
    '<i class="names">Profesor Universitario</i>',
    '<i class="names">Investigador Junior</i>',
    '<i class="names">Consultor Estratégico</i>',
    '<i class="names">Analista de Datos</i>',
  ];
};

// Typewriter effect
function initTypewriter(strings) {
  const typedElement = document.querySelector('.typed');
  if (typedElement) {
    if (window.typedInstance) {
      window.typedInstance.destroy();
    }
    window.typedInstance = new Typed('.typed', {
      strings: strings || window.getTypewriterStrings(document.documentElement.lang),
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

// Animation triggers on scroll
function initAnimations() {
  // Add enhanced parallax effect to sections
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Apply stronger parallax to home section background
    const homeSection = document.querySelector('.home');
    if (homeSection) {
      homeSection.style.backgroundPositionY = `${scrollY * 0.8}px`;
      
      // Parallax para el cover image (pseudo-elemento ::after)
      // Usamos CSS custom properties para controlar el movimiento
      const coverTranslateY = scrollY * 0.6;
      const coverTranslateX = Math.sin(scrollY * 0.001) * 10; // Movimiento horizontal sutil
      const coverScale = 1 + (scrollY * 0.00008); // Escalado más sutil
      
      homeSection.style.setProperty('--cover-translateY', `${coverTranslateY}px`);
      homeSection.style.setProperty('--cover-translateX', `${coverTranslateX}px`);
      homeSection.style.setProperty('--cover-scale', coverScale);
    }
    
    // Apply subtle floating to profile image (sin rotación)
    const profileImage = document.querySelector('.image');
    if (profileImage) {
      const translateY = Math.sin(scrollY * 0.005) * 8; // Flotación más sutil
      profileImage.style.transform = `translateY(${translateY}px)`;
    }
    
    // Parallax layers - diferentes velocidades para elementos decorativos
    // Limitar el efecto solo cuando estamos en la sección home
    const homeHeight = homeSection ? homeSection.offsetHeight : 0;
    const isInHomeSection = scrollY < homeHeight;
    
    if (isInHomeSection) {
      const slowLayer = document.querySelector('.parallax-slow');
      if (slowLayer) {
        const movement = Math.min(scrollY * 0.1, homeHeight * 0.15);
        slowLayer.style.transform = `translateY(${movement}px)`;
      }
      
      const mediumLayer = document.querySelector('.parallax-medium');
      if (mediumLayer) {
        const movement = Math.min(scrollY * 0.2, homeHeight * 0.25);
        mediumLayer.style.transform = `translateY(${movement}px)`;
      }
      
      const fastLayer = document.querySelector('.parallax-fast');
      if (fastLayer) {
        const movement = Math.min(scrollY * 0.3, homeHeight * 0.35);
        fastLayer.style.transform = `translateY(${movement}px)`;
      }
    }
    
    // Parallax effect on other sections
    const aboutSection = document.querySelector('#sobre-mi');
    if (aboutSection) {
      aboutSection.style.backgroundPositionY = `${scrollY * 0.3}px`;
    }
    
    const servicesSection = document.querySelector('#servicios');
    if (servicesSection) {
      servicesSection.style.backgroundPositionY = `${scrollY * 0.2}px`;
    }
  });
}

// Exponer función para cambio de idioma
window.updateTypewriterStrings = function(strings) {
  initTypewriter(strings);
};

//# sourceMappingURL=index.js.map