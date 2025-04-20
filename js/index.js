//Burger menu
const menu = document.querySelector('.menu');
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');

function toggleMenu() {
  if (menu) {
    menu.classList.toggle('menu_opened');
  }
}

if (openMenuBtn) {
  openMenuBtn.addEventListener('click', toggleMenu);
}
if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', toggleMenu);
}

//Scroll
const navBar = document.querySelector('.topheader');
if (navBar) {
  let prevY = window.scrollY;
  window.addEventListener('scroll', function () {
    if (prevY > window.scrollY) {
      navBar.classList.remove('off');
    }

    if (window.scrollY > 50) {
      navBar.classList.add('solid');
    } else {
      navBar.classList.remove('solid');
    }

    prevY = window.scrollY;
  });
}

//Cerrar menú al seleccionar una opción
const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

if (menuLinks.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const menuLink = document.querySelector(`.menu a[href="#${id}"]`);

        if (entry.isIntersecting && menuLink) {
          const currentSelected = document.querySelector('.menu a.selected');
          if (currentSelected) {
            currentSelected.classList.remove('selected');
          }
          menuLink.classList.add('selected');
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', function () {
      if (menu) {
        menu.classList.remove('menu_opened');
      }
    });

    const hash = menuLink.getAttribute('href');
    const target = document.querySelector(hash);
    if (target) {
      observer.observe(target);
    }
  });
}

//Efecto maquina de escribir

const typed = new Typed('.typed', {
  strings: [
    '<i class ="names">Hassir Lastre</i>',
    '<i class ="names">Formador</i>',
    '<i class ="names">Consultor</i>',
    '<i class ="names">Asesor</i>',
    '<i class ="names">Mentor</i>',
    '<i class ="names">Speaker</i>',
    '<i class ="names">Web Developer</i>',
  ],

  stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
  typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
  startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
  backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
  smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
  shuffle: false, // Alterar el orden en el que escribe las palabras.
  backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
  loop: true, // Repetir el array de strings
  loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
  showCursor: true, // Mostrar cursor palpitanto
  cursorChar: '|', // Caracter para el cursor
  contentType: 'html', // 'html' o 'null' para texto sin formato
});
