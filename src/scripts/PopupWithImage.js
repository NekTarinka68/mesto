import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__image');
    this._captionPopup = this._popup.querySelector('.popup__caption');
  }

  open({ link, name }) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._captionPopup.textContent = name;
  }
}