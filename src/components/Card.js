export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, {handleDeleteCard}, handleLike, handleDeleteLike){
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this._likes = data.likes;
    this._cardId = data._id
    this._userId = userId;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      if (this._cardLikeButton.classList.contains('element__like_active')) {
          this._handleDeleteLike(this)
      } else {
          this._handleLike(this)
      }
  })
    this._deleteButton.addEventListener('click', () => this._handleDeleteCard(this._cardId));
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._data.link, this._data.name);
    })
  }

  deleteLike() {
    this._cardLikeButton.classList.remove('element__like_active')
  }

  getDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _whoseCard() {
    if (this._ownerId !== this._userId) {
        this._deleteButton.remove();
    }
  }

  numLikes(likes) {
    this._likeCounter = this._element.querySelector('.element__like_numbers')
    if (likes.length) {
        this._likeCounter.textContent = likes.length;
    } else {
        this._likeCounter.textContent = '';
    }
  }

  activeLike() {
    this._cardLikeButton.classList.add('element__like_active')
  }

  _checkLike() {
    this._likes.forEach((item) => {
        if(item._id === this._userId) {
            this._cardLikeButton.classList.add('element__like_active');
        }
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage = this._element.querySelector('.element__pictures');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._cardLikeButton = this._element.querySelector('.element__like');
    this._elementTitle.textContent = this._data.name;
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._checkLike();
    this.numLikes(this._likes);
    this._setEventListeners();
    this._whoseCard();
    return this._element;
  }
}