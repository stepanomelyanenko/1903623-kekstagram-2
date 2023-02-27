import {isEscapeKey} from './utils.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onCloseErrorClick = (evt) => {
  evt.preventDefault();
  closeError();
};

const onErrorClick = (evt) => {
  if (evt.target.nodeName !== 'DIV') {
    evt.preventDefault();
    closeError();
  }
};

const  onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeError();
  }
};

function closeError() {
  const errorElement = document.querySelector('.error');

  errorElement.querySelector('.error__button').removeEventListener('click', onCloseErrorClick);
  errorElement.removeEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onEscKeyDown);

  errorElement.remove();
}

const showError = (errorText) => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = errorText;

  errorElement.querySelector('.error__button').addEventListener('click', onCloseErrorClick);
  errorElement.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onEscKeyDown);

  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);
};

export {showError, closeError};
