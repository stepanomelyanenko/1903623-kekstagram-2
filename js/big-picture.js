import {isEscapeKey} from './utils.js';
import {showCommentList, clearCommentList} from './comments.js';

const bigPicture = document.querySelector('.big-picture');

const closePictureElement = document.querySelector('.big-picture__cancel');

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onClosePictureClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const openBigPicture = (photo) => {
  const imgElement = bigPicture.querySelector('.big-picture__img').lastElementChild;

  imgElement.src = photo.url;
  imgElement.setAttribute('alt', 'Фото пользователя');
  bigPicture.querySelector('.social__caption').textContent =  photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;

  closePictureElement.addEventListener('click', onClosePictureClick);
  document.addEventListener('keydown', onBigPhotoEscKeydown);

  showCommentList(photo.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  clearCommentList();

  closePictureElement.removeEventListener('click', onClosePictureClick);
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
}

export {openBigPicture, closeBigPicture};
