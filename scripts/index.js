const modalWindowProfile = document.querySelector('.popup_type_edit-profile');
const popupProfileButtonClose = modalWindowProfile.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__button');
const formPopupProfile = document.querySelector('.popup__form_type-profile');
const nameInput = document.querySelector('[name = "namePopup"]');
const infoInput = document.querySelector('[name = "infoPopup"]');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template');
const addCardButton = document.querySelector('.profile__button-pic');

const modalWindowElement = document.querySelector('.popup_type_add-card')
const modalCloseElement = modalWindowElement.querySelector('.popup__close');
const formPopupCard = document.querySelector('.popup__form_type-card');
const inputName = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

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
  };
};

function closePopupOverlay(event) {
  if(event.target.classList.contains('popup')) {
    closePopup(event.target);
  };
};

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

function onCardSubmit(event) {
  event.preventDefault();
  renderItem(cardsContainer, createElement(inputName.value, inputLink.value));
  const submitButton = event.target.querySelector('.popup__save');
  const inactiveButtonClass = {inactiveButtonClass: 'popup__save_disabled'};
  disableButton(submitButton, inactiveButtonClass);
  closePopup(modalWindowElement);
  event.target.reset();
}

function createElement(name, link) {
  const keepingElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const title = keepingElement.querySelector('.element__title');
  const img = keepingElement.querySelector('.element__pictures');
  const deleteButton = keepingElement.querySelector('.element__delete');
  title.textContent = name;
  img.src = link;
  img.alt = name;

  keepingElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })

  function deleteElement(evt) {
    const element = evt.target.closest('.element');
    element.remove();
  }

  deleteButton.addEventListener('click', deleteElement);

  img.addEventListener('click', function () {
    popupImg.src = img.src;
    popupImg.alt = img.alt;
    captionPopup.textContent = title.textContent;
    openPopup(modalWindowImage);
  });

  return keepingElement;
}

function renderItem(cardsContainer, keepingElement) {
  cardsContainer.prepend(keepingElement);
}

cards.forEach(item => {
  renderItem(cardsContainer, createElement(item.name, item.link))
});

profileEditButton.addEventListener('click', openPopupEdit);

popupProfileButtonClose.addEventListener('click', () => closePopup(modalWindowProfile));

formPopupProfile.addEventListener('submit', onProfileSubmit);

addCardButton.addEventListener('click', () => openPopup(modalWindowElement));

modalCloseElement.addEventListener('click', () => closePopup(modalWindowElement));

formPopupCard.addEventListener('submit', onCardSubmit);

modalCloseImage.addEventListener('click', () => closePopup(modalWindowImage));