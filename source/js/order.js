const makeOrder = document.querySelector(".product__make-order");
const modalFormSize = document.querySelector(".modal");
const overlay = document.querySelector(".page-body__overlay");

makeOrder.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFormSize.classList.add("modal--opened");
  overlay.classList.add("page-body__overlay--opened");
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalFormSize.classList.contains("modal--opened")) {
      evt.preventDefault();
      modalFormSize.classList.remove("modal--opened");
      overlay.classList.remove("page-body__overlay--opened");
    }
  }
});
