import {isEscapeKey} from './utils.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeError = () => {
  document.querySelector('.error').remove();
};

const showError = (errorText) => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = errorText;

  errorElement.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    closeError();
  }, {once: true});

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeError();
    }
  }, {once: true});

  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);
};

export {showError, closeError};
