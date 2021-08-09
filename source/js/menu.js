const mainNav = document.querySelector(".main-nav");
const menuOverall = document.querySelector(".main-nav__list--overall");
const menuLinks = document.querySelector(".main-nav__list--user-links");
const toggle = document.querySelector(".main-nav__toggle");

if (mainNav.classList.contains("main-nav--no-js")) {
  mainNav.classList.remove('main-nav--no-js');
}

toggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  toggle.classList.toggle("main-nav__toggle--closed");
  toggle.classList.toggle("main-nav__toggle--opened");

  menuOverall.classList.toggle("main-nav__list--closed");
  menuOverall.classList.toggle("main-nav__list--opened");

  menuLinks.classList.toggle("main-nav__list--closed");
  menuLinks.classList.toggle("main-nav__list--opened");
});
