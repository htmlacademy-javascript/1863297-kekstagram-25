import {fillPhotos} from './previews.js';
import {getRandomItems, sortByComments, debounce} from './util.js';

const RERENDER_DELAY = 500;
const PHOTOS_COUNT = 10;
const form = document.querySelector('.img-filters__form');
const discussed = form.querySelector('#filter-discussed');
const randomItem = form.querySelector('#filter-random');
const defaultItem = form.querySelector('#filter-default');

const addFiltersPhotos = (photos) => {

  fillPhotos(photos);

  const sortFunction = (order) => {
    switch (order) {
      case discussed:
        defaultItem.classList.remove('img-filters__button--active');
        randomItem.classList.remove('img-filters__button--active');
        discussed.classList.add('img-filters__button--active');
        fillPhotos(sortByComments(photos));
        break;
      case randomItem:
        defaultItem.classList.remove('img-filters__button--active');
        discussed.classList.remove('img-filters__button--active');
        randomItem.classList.add('img-filters__button--active');
        fillPhotos(getRandomItems(photos, PHOTOS_COUNT));
        break;
      case defaultItem:
        randomItem.classList.remove('img-filters__button--active');
        discussed.classList.remove('img-filters__button--active');
        defaultItem.classList.add('img-filters__button--active');
        fillPhotos(photos);
        break;
    }
  };

  form.addEventListener('click', debounce(
    (evt) => sortFunction(evt.target),
    RERENDER_DELAY),
  );
};

export {addFiltersPhotos};
