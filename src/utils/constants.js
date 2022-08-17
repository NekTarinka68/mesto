export const config = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save', 
  inactiveButtonClass: 'popup__save_disabled', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__error_visible', 
}

export const apiConfig = ({
  host: 'https://nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '1619fec5-c6fd-4772-8d97-05648c9652d9',
    'Content-Type': 'application/json'
  }
})

export const profileEditButton = document.querySelector('.profile__button');
export const formPopupProfile = document.querySelector('.popup__form_type-profile');
export const nameInput = document.querySelector('.popup__input_type_name');
export const infoInput = document.querySelector('.popup__input_type_info');
export const avatarChangeButton = document.querySelector('.profile__button-change-avatar');
export const formElementAvatar = document.querySelector('.popup__form_type-avatar');

export const cardAddButton = document.querySelector('.profile__button-pic');
export const formPopupCard = document.querySelector('.popup__form_type-card');

export const modalWindowImage = document.querySelector('.popup_type-img');
export const popupImg = modalWindowImage.querySelector('.popup__image');
export const captionPopup = modalWindowImage.querySelector('.popup__caption');