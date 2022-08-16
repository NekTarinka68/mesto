import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  submitDeleteCard(del) {
    this._submitDeleteCard = del;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', event => {
      event.preventDefault();
      this._submitDeleteCard();
    })
    super.setEventListeners();
  }
}