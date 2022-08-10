import './../pages/index.css'
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const profileEditButton = document.querySelector('.profile__button');
const formPopupProfile = document.querySelector('.popup__form_type-profile');
export const nameInput = document.querySelector('.popup__input_type_name');
export const infoInput = document.querySelector('.popup__input_type_info');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const formValidatorProfile = new FormValidator(config, formPopupProfile);
const info = new UserInfo(nameProfile, descriptionProfile);

const cardsContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__button-pic');
const formPopupCard = document.querySelector('.popup__form_type-card');
const formValidatorCard = new FormValidator(config, formPopupCard);

const modalWindowImage = document.querySelector('.popup_type-img');
const popupImg = modalWindowImage.querySelector('.popup__image');
const captionPopup = modalWindowImage.querySelector('.popup__caption');

//профиль
const editPopupProfile = new PopupWithForm({
  popupSelector: ('.popup_type_edit-profile'),
  handleFormSubmit: data => info.setUserInfo(data)
});

editPopupProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const getInputValues = info.getUserInfo();
  nameInput.value = getInputValues.inputName;
  infoInput.value = getInputValues.inputInfo;
  formValidatorProfile.resetValidation()
  editPopupProfile.open();
});

//карточки
const addPopupCard = new PopupWithForm({
  popupSelector: ('.popup_type_add-card'),
  handleFormSubmit: (data) => {
    const cardsElement = createElement(data, '#template');
    cardsList.addItems(cardsElement);
  }
})

addPopupCard.setEventListeners();

addCardButton.addEventListener('click', () => {
  formPopupCard.reset();
  formValidatorCard.resetValidation();
  addPopupCard.open();
});

function createElement(data) {
  const card = new Card(data, '#template', handleCardClick);
  return card.createCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardsElement = createElement(item);
    cardsList.addItems(cardsElement);
  }
}, cardsContainer);
cardsList.renderItems();

//картинки
const openPopupImage = new PopupWithImage('.popup_type-img');
openPopupImage.setEventListeners();

function handleCardClick(link, name) { 
  popupImg.src = link; 
  popupImg.alt = name; 
  captionPopup.textContent = name; 
  openPopupImage.open({link, name});
}

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();