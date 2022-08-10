export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopup = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_is-active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-active');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopup.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', event => this._handleClickByOverlay(event));
  }

  _handleClickByOverlay(event) {
    if(event.target === this._popup) {
      this.close();
    }
  }
}