const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputElement, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputElement, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formEl,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formEl, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
};

const toggleButtonState = (inputList, buttonEl, config) => {
  const isInvalid = hasInvalidInput(inputList);

  if (isInvalid) {
    disableButton(buttonEl);

    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.disabled = false;

    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
