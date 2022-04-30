const profileEdit = document.querySelector('.profile__button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');
const formPopup = document.querySelector('.popup__form');
const nameInput = document.querySelector('[name = "namePopup"]');
const infoInput = document.querySelector('[name = "infoPopup"]');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

function popupOpenToggle() {
  modalWindow.classList.add('popup_is-active');
  nameInput.value = nameProfile.textContent;
  infoInput.value = descriptionProfile.textContent;
}

function popupCloseToggle() {
  modalWindow.classList.remove('popup_is-active');
}

function onSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = infoInput.value;
  popupCloseToggle();
}

profileEdit.addEventListener('click', popupOpenToggle);

modalCloseBtn.addEventListener('click', popupCloseToggle);

formPopup.addEventListener('submit', onSubmit);