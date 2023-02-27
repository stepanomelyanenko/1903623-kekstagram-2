import {openBigPicture} from './big-picture.js';

const picturesElement = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

let pictures = [];

const showPictures = (photos) => {
  pictures = photos;
  photos.forEach(({url, comments, likes}, index) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('photo-index', index);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesElement.appendChild(picturesListFragment);
};

const hidePictures = () => {
  picturesElement.querySelectorAll('.picture').forEach( (pictureElement) => {
    pictureElement.remove();
  });
};

const onPhotoListClick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    evt.preventDefault();
    openBigPicture(pictures[evt.target.getAttribute('photo-index')]);
  }
};

picturesElement.addEventListener('click', onPhotoListClick);

export {showPictures, hidePictures};
