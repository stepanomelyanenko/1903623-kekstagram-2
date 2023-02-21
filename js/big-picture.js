import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentTemplate = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

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

const showCommentList = (comments) => {
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });

  commentList.appendChild(commentsListFragment);
};

const clearCommentList = () => {
  commentList.innerHTML = '';
};

const openBigPicture = (photo) => {
  const imgElement = bigPicture.querySelector('.big-picture__img').lastElementChild;

  imgElement.src = photo.url;
  imgElement.setAttribute('alt', 'Фото пользователя');
  bigPicture.querySelector('.social__caption').textContent =  photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length.toString();

  //Временно убраны счётчик комментариев и конпка "Загрузить больше"
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

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
