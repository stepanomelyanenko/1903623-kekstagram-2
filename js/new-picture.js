import {isEscapeKey} from './utils.js';
import {resetPhotoScale} from './picture-scale.js';
import {resetFilters} from './picture-filters.js';

const uploadPhotoInputElement = document.querySelector('#upload-file');
const uploadPhotoOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelBtnElement = document.querySelector('#upload-cancel');

const onUploadPhotoInputChange = (evt) => {
  evt.preventDefault();
  if (uploadPhotoInputElement.value) {
    openUploadOverlay();
  }
};

const onUploadPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadCancelBtnClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

function openUploadOverlay() {
  uploadPhotoOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtnElement.addEventListener('click', onUploadCancelBtnClick);
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
  }
}

uploadPhotoInputElement.addEventListener('change', onUploadPhotoInputChange);

export {openUploadOverlay, closeUploadOverlay};
