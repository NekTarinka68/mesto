const elements = [
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

const profileEdit = document.querySelector('.profile__button');
const modalWindowProfile = document.querySelector('.popup_type_edit-profile');
const modalCloseProfile = modalWindowProfile.querySelector('.popup__close');
const formPopup = document.querySelector('.popup__form');
const nameInput = document.querySelector('[name = "namePopup"]');
const infoInput = document.querySelector('[name = "infoPopup"]');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

const listContainer = document.querySelector('.elements');
const template = document.querySelector('.template');
const addButton = document.querySelector('.profile__button-pic');
const likeButton = document.querySelector('.element__like');

const modalWindowElement = document.querySelector('.popup_type_add-card')
const modalCloseElement = modalWindowElement.querySelector('.popup__close');
const formPopupCard = document.querySelector('.popup__form_type-card');
const namedCard = document.querySelector('[name = "namedPopup"]');
const linkCard = document.querySelector('[name = "linkPopup"]');

const modalWindowImage = document.querySelector('.popup_type-img');
const modalCloseImage = modalWindowImage.querySelector('.popup__close');
const popupImg = modalWindowImage.querySelector('.popup__image');
const captionPopup = modalWindowImage.querySelector('.popup__caption');

function render() {
  const html = elements.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const name = getElementTemplate.querySelector('.element__title');
  const link = getElementTemplate.querySelector('.element__pictures');
  const deleteButton = getElementTemplate.querySelector('.element__delete');
  name.textContent = item.name;
  link.src = item.link;

  getElementTemplate.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })

  deleteButton.addEventListener('click', deleteElement);

  link.addEventListener('click', function () {
    popupImg.src = link.src;
    captionPopup.textContent = name.textContent;
    modalWindowImage.classList.add('popup_is-active');
  });

  return getElementTemplate;
}

function popupCloseImg() {
  modalWindowImage.classList.remove('popup_is-active');
}

function deleteElement(evt) {
  const elements = evt.target.closest(".element");
  elements.remove();
}

function cardSubmit(event) {
  event.preventDefault();
  const inputName = document.querySelector('.popup__input_type_named').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;
  const cards = getElement ({name: inputName, link: inputLink});
  listContainer.prepend(cards);
  event.target.reset();
  popupCloseCards();
}

function popupOpenEdit() {
  modalWindowProfile.classList.add('popup_is-active');
  nameInput.value = nameProfile.textContent;
  infoInput.value = descriptionProfile.textContent;
}

function popupCloseEdit() {
  modalWindowProfile.classList.remove('popup_is-active');
}

function popupAddCards(){
  modalWindowElement.classList.add('popup_is-active');
}

function popupCloseCards() {
  modalWindowElement.classList.remove('popup_is-active');
}

function onSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = infoInput.value;
  popupCloseEdit();
}

addButton.addEventListener('click', popupAddCards);

profileEdit.addEventListener('click', popupOpenEdit);

modalCloseProfile.addEventListener('click', popupCloseEdit);

modalCloseElement.addEventListener('click', popupCloseCards);

modalCloseImage.addEventListener('click', popupCloseImg);

formPopup.addEventListener('submit', onSubmit);

formPopupCard.addEventListener('submit', cardSubmit);

render();