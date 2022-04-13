import {showBigPicture} from './big-photo.js';

const photosTemplate = document.querySelector('#picture').content;
const photosCountainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

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
    const pictureElement = photosTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture').addEventListener('click', onPhotoClick(photo));
    fragment.appendChild(pictureElement);
  });
  imgFilters.classList.remove('img-filters--inactive');
  photosCountainer.appendChild(fragment);
};

export {fillPhotos};
