import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [ 
  { name: 'Озеро Байкал', 
    link: 'images/Байкал-Иркутск.jpg'}, 
  { name: 'Волгоград', 
    link: 'images/Волгоград.jpg'}, 
  { name: 'Казань', 
    link: 'images/Казань.jpg'}, 
  { name: 'Камчатка', 
    link: 'images/Камчатка.jpg'}, 
  { name: 'Тюмень', 
    link: 'images/Тюмень.jpg'}, 
  { name: 'Краснодарский край', 
    link: 'images/Краснодарский-край.jpg'} 
]; 

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const modalWindowProfile = document.querySelector('.popup_type_edit-profile');
const popupProfileButtonClose = modalWindowProfile.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__button');
const formPopupProfile = document.querySelector('.popup__form_type-profile');
const nameInput = document.querySelector('[name = "namePopup"]');
const infoInput = document.querySelector('[name = "infoPopup"]');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const formValidatorProfile = new FormValidator(config, formPopupProfile);

const cardsContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__button-pic');

const modalWindowElement = document.querySelector('.popup_type_add-card')
const modalCloseElement = modalWindowElement.querySelector('.popup__close');
const formPopupCard = document.querySelector('.popup__form_type-card');
const inputName = modalWindowElement.querySelector('.popup__input_type_title');
const inputLink = modalWindowElement.querySelector('.popup__input_type_link');
const formValidatorCard = new FormValidator(config, formPopupCard);

const modalWindowImage = document.querySelector('.popup_type-img');
const modalCloseImage = modalWindowImage.querySelector('.popup__close');
const popupImg = modalWindowImage.querySelector('.popup__image');
const captionPopup = modalWindowImage.querySelector('.popup__caption');

function openPopup(popup) {
  popup.classList.add('popup_is-active');
  document.addEventListener('keydown', closePopupEscape);
  popup.addEventListener('mousedown', closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-active');
  document.removeEventListener('keydown', closePopupEscape);
  popup.removeEventListener('mousedown', closePopupOverlay);
}

function closePopupEscape (event) {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-active'));
  }
}

function closePopupOverlay(event) {
  if(event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

function openPopupEdit() {
  openPopup(modalWindowProfile);
  nameInput.value = nameProfile.textContent;
  infoInput.value = descriptionProfile.textContent;
}

function onProfileSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = infoInput.value;
  closePopup(modalWindowProfile);
}

function openImage(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  captionPopup.textContent = name;
  openPopup(modalWindowImage);
}

function onCardSubmit(event) {
  event.preventDefault();
  const cards = {};
  cards.name = inputName.value;
  cards.link = inputLink.value;
  formPopupCard.reset();
  renderItem(cards);
  closePopup(modalWindowElement);
}

function createElement(data) {
  const card = new Card(data, '#template', openImage);
  const cardElement = card.createCard();
  return cardElement;
}

function renderItem(data) {
cardsContainer.append(createElement(data));
}

initialCards.forEach((element) => renderItem(element));

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

profileEditButton.addEventListener('click', openPopupEdit);

popupProfileButtonClose.addEventListener('click', () => closePopup(modalWindowProfile));

formPopupProfile.addEventListener('submit', onProfileSubmit);

addCardButton.addEventListener('click', () => openPopup(modalWindowElement));

modalCloseElement.addEventListener('click', () => closePopup(modalWindowElement));

formPopupCard.addEventListener('submit', onCardSubmit);

modalWindowImage.addEventListener('click', () => openPopup);

modalCloseImage.addEventListener('click', () => closePopup(modalWindowImage));