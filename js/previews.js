import {showBigPicture} from './big-photo.js';

const PHOTOS_TEMPLATE = document.querySelector('#picture').content;
const PHOTOS_CONTAINER = document.querySelector('.pictures');
const IMG_FILTERS = document.querySelector('.img-filters');

const onPhotoClick = (photo) => () => {
  showBigPicture(photo);
};

const fillPhotos = (similarPhotos) => {
  const fragment = document.createDocumentFragment();
  const removePhotos = document.querySelectorAll('.picture');
  removePhotos.forEach((element) => {
    element.parentNode.removeChild(element);
  });

  similarPhotos.forEach((photo) => {
    const {url, likes, comments} = photo;
    const pictureElement = PHOTOS_TEMPLATE.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture').addEventListener('click', onPhotoClick(photo));
    fragment.appendChild(pictureElement);
  });
  IMG_FILTERS.classList.remove('img-filters--inactive');
  PHOTOS_CONTAINER.appendChild(fragment);
};

export {fillPhotos};
