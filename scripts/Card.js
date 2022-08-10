export default class Card {
  constructor(data, templateSelector, handleCardClick){
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage = this._element.querySelector('.element__pictures');
    this._elementTitle.textContent = this._data.name;
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.element__like');
    this._like.addEventListener('click', () => {
      this._activeLike();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._data.link, this._data.name);
    })
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _activeLike() {
    this._like.classList.toggle('element__like_active')
  }
}