const makeOrder = document.querySelector(".product__make-order");
const modalFormSize = document.querySelector(".modal");
const btnInModal = document.querySelector(".form-size__add");
const overlay = document.querySelector(".page-body__overlay");

//добавить товар в корзину (кнопка "Заказать" на главной)
makeOrder.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFormSize.classList.add("modal--opened");
  overlay.classList.add("page-body__overlay--opened");
});

//закрыть модальное окно кнопкой "Добавить"
btnInModal.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFormSize.classList.remove("modal--opened");
  overlay.classList.remove("page-body__overlay--opened");
});

//закрыть модальное окно клавишей ESC
window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalFormSize.classList.contains("modal--opened")) {
      evt.preventDefault();
      modalFormSize.classList.remove("modal--opened");
      overlay.classList.remove("page-body__overlay--opened");
    }
  }
});
