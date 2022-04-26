const profileEdit = document.querySelector('.profile__button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');
const formPopup = document.querySelector('.popup__form');
const nameInput = document.querySelector('[name = "namePopup"]');
const infoInput = document.querySelector('[name = "infoPopup"]');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

function toggleModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
  nameInput.value = nameProfile.textContent;
  infoInput.value = descriptionProfile.textContent;
}

function onSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = infoInput.value;
  toggleModalWindow();
}

profileEdit.addEventListener('click', toggleModalWindow);

modalCloseBtn.addEventListener('click', toggleModalWindow);

formPopup.addEventListener('submit', onSubmit);