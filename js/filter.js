import {debounce, shuffleArray} from './utils.js';
import {hidePictures, showPictures} from './pictures.js';

const RERENDER_DELAY = 500;

const Filters = {
  default: 'filter-default',
  random: 'filter-random',
  mostCommented: 'filter-discussed'
};

const filters = document.querySelector('.img-filters');

let currentFilter = Filters.default;
let filteredDefaultPictures = [];

const compareByComments = (pictureA, pictureB) => (pictureB.comments.length - pictureA.comments.length);

const showFilters = (pictures) => {
  filters.classList.remove('img-filters--inactive');
  filteredDefaultPictures = pictures;
};

const onFiltersFormClick = function (evt) {
  const changePhotos = (cb) => {
    cb();
  };

  if (evt.target.nodeName === 'BUTTON') {
    evt.preventDefault();

    if (currentFilter !== evt.target.id) {
      filters.querySelector(`#${currentFilter}`).classList.remove('img-filters__button--active');
      filters.querySelector(`#${evt.target.id}`).classList.add('img-filters__button--active');
      currentFilter = evt.target.id;

      switch (currentFilter) {
        case Filters.default:
          changePhotos(debounce(() => {
            hidePictures();
            showPictures(filteredDefaultPictures);
          }, RERENDER_DELAY));
          break;
        case Filters.random:
          changePhotos(debounce(() => {
            hidePictures();
            showPictures(shuffleArray(filteredDefaultPictures.slice()).slice(10));
          }, RERENDER_DELAY));
          break;
        case Filters.mostCommented:
          changePhotos(debounce(() => {
            hidePictures();
            showPictures(shuffleArray(filteredDefaultPictures.slice().sort(compareByComments)));
          }, RERENDER_DELAY));
          break;
        default:
          changePhotos(debounce(() => {
            hidePictures();
            showPictures(shuffleArray(filteredDefaultPictures));
          }, RERENDER_DELAY));
      }
    }
  }
};

filters.addEventListener('click', onFiltersFormClick);

export {showFilters};
