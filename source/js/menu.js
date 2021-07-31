const mainMenu = document.querySelector(".main-nav__list");
const toggle = document.querySelector(".main-nav__toggle");

toggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  toggle.classList.toggle("main-nav__toggle--closed");
  toggle.classList.toggle("main-nav__toggle--opened");

  mainMenu.classList.toggle("main-nav__list--closed");
  mainMenu.classList.toggle("main-nav__list--opened");
});
