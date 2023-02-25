import {checkStringLength} from './utils.js';
import {sendData} from './api.js';
import {showError} from './error.js';
import {showSuccess} from './success.js';
import {closeUploadOverlay} from './new-picture.js';

const pictureForm = document.querySelector('#upload-select-image');

const MAX_HASH_TAGS_VALUE = 5;
const MAX_HASH_TAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 120;

const submitButton = document.querySelector('#upload-submit');

const validateHashTags = (hashTagsString) => {
  if (hashTagsString.length === 0) {
    return true;
  }

  const hashTags = hashTagsString.toLowerCase().split(' ');

  if (hashTags.length > MAX_HASH_TAGS_VALUE) {
    return false;
  }

  return hashTags.every((hashTag) => /(^|\B)#(?![0-9]+\b)([a-zA-Z0-9]{1,19})(\b|\r)/g.test(hashTag)
    && checkStringLength(hashTag, MAX_HASH_TAG_LENGTH));
};

const validateComment = (comment) => (checkStringLength(comment, MAX_COMMENT_LENGTH));

const pristine = new Pristine(pictureForm);

pristine.addValidator(
  pictureForm.querySelector('.text__hashtags'),
  validateHashTags,
  'До 5 хэш-тегов, разделённых пробелом. После знака # допустимы только буквы и цифры'
);

pristine.addValidator(
  pictureForm.querySelector('.text__description'),
  validateComment,
  'Максимум 120 символов!'
);

const blockSubmitButton = (text) => {
  submitButton.disabled = true;
  submitButton.textContent = text;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};


pictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton('Сохраняю...');
    sendData(
      () => {
        closeUploadOverlay();
        showSuccess('Публикация отправлена');
        unblockSubmitButton();
      },
      () => {
        closeUploadOverlay();
        showError('Ошибка отправки. Попробуйте позже');
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  } else {
    blockSubmitButton('Неправильно заполнены поля!');
    setTimeout(unblockSubmitButton, 3000);
  }
});
