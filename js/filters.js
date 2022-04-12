import {fillPhotos} from './previews.js';
import {getRandomItems, sortByComments, debounce} from './util.js';

const RERENDER_DELAY = 500;
const PHOTOS_COUNT = 10;
const FORM = document.querySelector('.img-filters__form');
const DISCUSSED = FORM.querySelector('#filter-discussed');
const RANDOM_ITEM = FORM.querySelector('#filter-random');
const DEFAULT_ITEM = FORM.querySelector('#filter-default');

const addFiltersHandler = (photos) => {

  fillPhotos(photos);

  const sortFunction = (order) => {
    switch (order) {
      case DISCUSSED:
        DEFAULT_ITEM.classList.remove('img-filters__button--active');
        RANDOM_ITEM.classList.remove('img-filters__button--active');
        DISCUSSED.classList.add('img-filters__button--active');
        fillPhotos(sortByComments(photos));
        break;
      case RANDOM_ITEM:
        DEFAULT_ITEM.classList.remove('img-filters__button--active');
        DISCUSSED.classList.remove('img-filters__button--active');
        RANDOM_ITEM.classList.add('img-filters__button--active');
        fillPhotos(getRandomItems(photos, PHOTOS_COUNT));
        break;
      case DEFAULT_ITEM:
        RANDOM_ITEM.classList.remove('img-filters__button--active');
        DISCUSSED.classList.remove('img-filters__button--active');
        DEFAULT_ITEM.classList.add('img-filters__button--active');
        fillPhotos(photos);
        break;
    }
  };

  FORM.addEventListener('click', debounce(
    (evt) => sortFunction(evt.target),
    RERENDER_DELAY),
  );
};

export {addFiltersHandler};
