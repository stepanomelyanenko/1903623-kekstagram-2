import {checkStringLength} from './utils.js';

const pictureForm = document.querySelector('#upload-select-image');

const MAX_HASH_TAGS_VALUE = 5;
const MAX_HASH_TAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 120;

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

pictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // pristine.validate();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
