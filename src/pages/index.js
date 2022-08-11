import './index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
const nameInput = document.querySelector('.popup__input_type_name');
const infoInput = document.querySelector('.popup__input_type_info');
const formValidatorProfile = new FormValidator(config, formPopupProfile);

const cardsContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__button-pic');
const formPopupCard = document.querySelector('.popup__form_type-card');
const formValidatorCard = new FormValidator(config, formPopupCard);

const modalWindowImage = document.querySelector('.popup_type-img');
const popupImg = modalWindowImage.querySelector('.popup__image');
const captionPopup = modalWindowImage.querySelector('.popup__caption');

//профиль
const info = new UserInfo({
  nameuser: '.profile__name',
  description: '.profile__description'
})

const popupEditProfile = new PopupWithForm({
  popupSelector: ('.popup_type_edit-profile'),
  handleFormSubmit: (data) => info.setUserInfo(data)
});

popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const getInputValues = info.getUserInfo();
  nameInput.value = getInputValues.nameuser;
  infoInput.value = getInputValues.description;
  formValidatorProfile.resetValidation()
  popupEditProfile.open();
});

//карточки
const popupAddCard = new PopupWithForm({
  popupSelector: ('.popup_type_add-card'),
  handleFormSubmit: (data) => {
    const cardsElement = createElement(data, '#template');
    cardsList.addItems(cardsElement);
  }
})

popupAddCard.setEventListeners();

addCardButton.addEventListener('click', () => {
  formValidatorCard.resetValidation();
  popupAddCard.open();
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
const popupOpenImage = new PopupWithImage('.popup_type-img');
popupOpenImage.setEventListeners();

function handleCardClick(link, name) { 
  popupImg.src = link; 
  popupImg.alt = name; 
  captionPopup.textContent = name; 
  popupOpenImage.open({link, name});
}

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();