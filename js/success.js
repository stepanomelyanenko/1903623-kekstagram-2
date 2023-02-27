import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const onCloseSuccessClick = (evt) => {
  evt.preventDefault();
  closeSuccess();
};

const onSuccessClick = (evt) => {
  if (evt.target.nodeName !== 'DIV') {
    evt.preventDefault();
    closeSuccess();
  }
};

const  onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccess();
  }
};

function closeSuccess()  {
  const successElement = document.querySelector('.success');

  successElement.querySelector('.success__button').removeEventListener('click', onCloseSuccessClick);
  successElement.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onEscKeyDown);

  successElement.remove();
}

const showSuccess = (successText) => {
  const successFragment = document.createDocumentFragment();
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__title').textContent = successText;

  successElement.querySelector('.success__button').addEventListener('click', onCloseSuccessClick);
  successElement.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onEscKeyDown);

  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);
};

export {showSuccess, closeSuccess};
