import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeSuccess = () => {
  document.querySelector('.success').remove();
};

const showSuccess = (successText) => {
  const successFragment = document.createDocumentFragment();
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__title').textContent = successText;

  successElement.querySelector('.success__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    closeSuccess();
  }, {once: true});

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccess();
    }
  }, {once: true});

  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);
};

export {showSuccess, closeSuccess};
