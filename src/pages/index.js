import './index.css' 
import Card from "../components/Card.js"; 
import FormValidator from "../components/FormValidator.js"; 
import Section from "../components/Section.js"; 
import PopupWithImage from "../components/PicturePopup.js"; 
import PopupWithForm from "../components/PopupWithForm.js"; 
import UserInfo from "../components/UserInfo.js"; 
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js"; 
import Api from "../components/Api.js";

import { 
  profileEditButton,
  formPopupProfile,
  nameInput,
  infoInput,
  avatarChangeButton,
  formElementAvatar,
  cardAddButton,
  formPopupCard,
  modalWindowImage,
  popupImg,
  captionPopup
} from "../utils/constants.js";

import { apiConfig } from "../utils/constants.js";
import { config } from "../utils/constants.js";

const api = new Api(apiConfig);

const formValidatorProfile = new FormValidator(config, formPopupProfile); 
const formValidatorAvatar = new FormValidator(config, formElementAvatar); 
const formValidatorCard = new FormValidator(config, formPopupCard); 

//промиссы
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, data]) => {
      info.setUserInfo(user);
      info.setUserAvatar(user);
      cardsList.renderItems(data.reverse());
      userId = user._id;
    })
    .catch((err) => console.log(err));

//профиль 
const info = new UserInfo({ 
  nameUserSelector: '.profile__name', 
  descriptionUserSelector: '.profile__description',
  userAvatar: '.profile__avatar'
}) 

const popupEditProfile = new PopupWithForm({ 
  popupSelector: ('.popup_type_edit-profile'), 
  handleFormSubmit: evt => {
    popupEditProfile.loading(true)
    api.getEditProfile(evt)
      .then(() => {
        info.setUserInfo(evt);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditProfile.loading(false))
  }
});

popupEditProfile.setEventListeners(); 

profileEditButton.addEventListener('click', () => { 
  const getInputValues = info.getUserInfo(); 
  nameInput.value = getInputValues.nameUserSelector; 
  infoInput.value = getInputValues.descriptionUserSelector; 
  formValidatorProfile.resetValidation() 
  popupEditProfile.open(); 
}); 

const popupAvatar = new PopupWithForm({
  popupSelector: ('.popup-avatar'),
  handleFormSubmit: data => {
    popupAvatar.loading(true)
    api.getProfileAvatar(data.link)
      .then((data) => {
        info.setUserAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.loading(false))
  }
});

popupAvatar.setEventListeners();

avatarChangeButton.addEventListener('click', () => {
  formElementAvatar.reset();
  formValidatorAvatar.resetValidation()
  popupAvatar.open()
});

//карточки 
const popupAddCard = new PopupWithForm({ 
  popupSelector: ('.popup_type_add-card'), 
  handleFormSubmit: (data) => { 
    popupAddCard.loading(true);
    api.getAddCard(data)
    .then((res) => {
      cardsList.addItems(createElement(res));
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddCard.loading(false)
    })
  } 
});

popupAddCard.setEventListeners();

function createElement(data) { 
  const card = new Card(data, '#template', handleCardClick, userId, {handleDeleteCard}, handleLike, handleDeleteLike ).createCard(); 
  return card; 
} 

const cardsList = new Section({ 
  renderer: (item) => { 
    cardsList.addItems(createElement(item)); 
  },
}, '.elements'); 

cardAddButton.addEventListener('click', () => { 
  formValidatorCard.resetValidation(); 
  popupAddCard.open(); 
}); 

//картинки 
const popupOpenImage = new PopupWithImage('.popup_type-img'); 
popupOpenImage.setEventListeners(); 

function handleCardClick(link, name) {  
  popupImg.src = link;  
  popupImg.alt = name;  
  captionPopup.textContent = name;  
  popupOpenImage.open({link, name}); 
} 

//удаление
const popupDelete = new PopupWithDeleteCard('.popup_type-delete');
popupDelete.setEventListeners();

function handleDeleteCard(cardId) {
  popupDelete.open();
  popupDelete.submitDeleteCard(() => {
    api.getDeleteCard(cardId)
      .then(() => {
        this.getDeleteCard();
        popupDelete.close();
      })
      .catch((err)  => console.log(err))
  })
};

//лайки
function handleLike(card) {
  api.getLikeCard(card._cardId)
    .then((res) => {
      card.activeLike();
      card.numLikes(res.likes);
    })
    .catch((err) => console.log(err))
};

function handleDeleteLike(card) {
  api.getDislikeCard(card._cardId)
    .then((res) => {
      card.deleteLike();
      card.numLikes(res.likes);
    })
    .catch((err) => console.log(err))
};

formValidatorCard.enableValidation(); 
formValidatorProfile.enableValidation(); 
formValidatorAvatar.enableValidation();