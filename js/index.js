//Burger menu
const toogleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toogleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

//Scroll
const navBar = document.querySelector('nav');
let prevY = window.scrollY;
window.addEventListener('scroll', function () {
  if (prevY > window.scrollY) {
    navBar.classList.remove('off');
  } else {
    navBar.classList.add('off');
  }

  if (window.scrollY > 60) {
    navBar.classList.add('solid');
  } else {
    navBar.classList.remove('solid');
  }

  prevY = window.scrollY;
});
