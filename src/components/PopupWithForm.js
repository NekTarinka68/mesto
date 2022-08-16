import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popupForm.querySelector('.popup__save');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }
  
  _getInputValues () {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    })
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  loading(isLoading){
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...'
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  };
}