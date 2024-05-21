// показ ошибки валидации поля
function showInputError (formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${validationConfig.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validationConfig.errorClass}`);
};

// скрытие ошибки валидации поля
function hideInputError (formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  errorElement.classList.remove(`${validationConfig.errorClass}`);
  errorElement.textContent = '';
};

// проверка на валидность поля
function checkInputValidity (formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
    }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// установка слушателей события на каждое поле
function setEventListeners (formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// валидация каждой формы
function enableValidation (validationConfig) {
  const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// проверка списка полей на валидность
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// функция блокировки\разблокировки отправки формы
function toggleButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
  } else {
      buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
  }
}

// очищение ошибок валидации
function clearValidation (formElement, validationConfig) {
  const inputList = formElement.querySelectorAll(`${validationConfig.inputSelector}`);
  const errorList = formElement.querySelectorAll(`.${validationConfig.errorClass}`);
  inputList.forEach((input) => {
    if (input.classList.contains(`${validationConfig.inputErrorClass}`)) {
      input.classList.remove(`${validationConfig.inputErrorClass}`);
      errorList.forEach((error) => {
        error.textContent = '';
        error.classList.remove(`${validationConfig.errorClass}`);
      })
    }
  })
  // if (formElement.querySelector(`${validationConfig.inputSelector}`).classList.contains(`${validationConfig.inputErrorClass}`)) {
  //   const inputElement = formElement.querySelector(`.${validationConfig.inputErrorClass}`);
  //   const errorElement = formElement.querySelector(`.${validationConfig.errorClass}`);
  //   inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  //   errorElement.textContent = '';
  //   errorElement.classList.remove(`${validationConfig.errorClass}`);
  // }
}

export {enableValidation, clearValidation}