import {isEscapeKey} from './utils.js';
import {resetPhotoScale} from './picture-scale.js';
import {resetFilters} from './picture-filters.js';

const uploadPhotoInputElement = document.querySelector('#upload-file');
const uploadPhotoOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelBtnElement = document.querySelector('#upload-cancel');
const hashTagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');

const isOnInputFocus = () => (hashTagsInputElement === document.activeElement || descriptionInputElement === document.activeElement);

const onUploadPhotoInputChange = (evt) => {
  evt.preventDefault();
  if (uploadPhotoInputElement.value) {
    openUploadOverlay();
  }
};

const onUploadPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isOnInputFocus()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadCancelBtnClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

function changeMiniatureBackground() {
  const miniatures = document.querySelectorAll('.effects__preview');
  const backgroundFile = uploadPhotoInputElement.files[0];

  miniatures.forEach((item) => {
    item.style.backgroundImage = `url(${  URL.createObjectURL(backgroundFile)  })`;
  });
}

function openUploadOverlay() {
  uploadPhotoOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtnElement.addEventListener('click', onUploadCancelBtnClick);
  changeMiniatureBackground();
}

function closeUploadOverlay(clearData = true) {
  uploadPhotoOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtnElement.removeEventListener('click', onUploadCancelBtnClick);

  if (clearData) {
    uploadPhotoInputElement.value = null;
    resetPhotoScale();
    resetFilters();
    hashTagsInputElement.value = '';
    descriptionInputElement.value = '';
  }
}

uploadPhotoInputElement.addEventListener('change', onUploadPhotoInputChange);

export {openUploadOverlay, closeUploadOverlay};
