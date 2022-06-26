const modalWindowProfile = document.querySelector('.popup_type_edit-profile');
const popupProfileButtonClose = modalWindowProfile.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__button');
const formPopupProfile = document.querySelector('.popup__form_type-profile');
const nameInput = document.querySelector('[name = "namePopup"]');
const infoInput = document.querySelector('[name = "infoPopup"]');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

const cardContainer = document.querySelector('.elements');
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
}

function closePopup(popup) {
  popup.classList.remove('popup_is-active');
}

function renderElement() {
  const elementsCard = cards.map((item) => {
    return createElement(item);
  });
  cardContainer.append(...elementsCard);
}

function popupOpenEdit() {
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

function prependToSection (title, link) {
  const newElement = createElement({name:title, link:link});
  cardContainer.prepend(newElement);
}

function onCardSubmit(event) {
  event.preventDefault();
  prependToSection(inputName.value, inputLink.value);
  closePopup(modalWindowElement);
  event.target.reset();
}

function createElement(item) {
  const keepingElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const name = keepingElement.querySelector('.element__title');
  const img = keepingElement.querySelector('.element__pictures');
  const deleteButton = keepingElement.querySelector('.element__delete');
  name.textContent = item.name;
  img.src = item.link;
  img.alt = item.name

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
    captionPopup.textContent = name.textContent;
    openPopup(modalWindowImage);
  });

  return keepingElement;
}

profileEditButton.addEventListener('click', popupOpenEdit);

popupProfileButtonClose.addEventListener('click', () => closePopup(modalWindowProfile));

formPopupProfile.addEventListener('submit', onProfileSubmit);

addCardButton.addEventListener('click', () => openPopup(modalWindowElement));

modalCloseElement.addEventListener('click', () => closePopup(modalWindowElement));

formPopupCard.addEventListener('submit', onCardSubmit);

modalCloseImage.addEventListener('click', () => closePopup(modalWindowImage));

renderElement();