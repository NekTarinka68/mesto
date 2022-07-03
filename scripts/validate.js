const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) { 
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
=======

>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
};


const toggleButtonState = (inputList, buttonElement, config) => {
if (hasInvalidInput(inputList, config)) {
<<<<<<< HEAD
<<<<<<< HEAD
  disableButton(buttonElement, config);
} else {
  activeButton(buttonElement, config);
} 
}; 

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activeButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass); 
  buttonElement.disabled = false;
};

=======
=======
>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
  buttonElement.classList.add(config.inactiveButtonClass);
} else {
  buttonElement.classList.remove(config.inactiveButtonClass); 
} 
}; 

<<<<<<< HEAD
>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
=======
>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); 
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const validation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {  
      evt.preventDefault();
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
    //const fieldsetList = Array.from(formElement.querySelectorAll(config.formSelector)); 
   //fieldsetList.forEach((fieldSet) => {                        
     //setEventListeners(fieldSet.config);
    //});
<<<<<<< HEAD
>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
=======
>>>>>>> c641e2792aa4c941390df18056a83a37f049c23b
    setEventListeners(formElement, config);
  });
};

validation(config);