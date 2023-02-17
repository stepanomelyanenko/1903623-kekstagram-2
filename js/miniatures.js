import {generatePictures} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictures = generatePictures(25);
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

pictures.forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(picturesListFragment);
