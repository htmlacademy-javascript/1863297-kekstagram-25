import { zoomImageUp, zoomImageDown, zoomImageDrop } from './zoom.js';
import { addEffect, dropEffect } from './add-effect.js';
import { pristine } from './utils/validate.js';
import { sendData } from './api.js';
import { stopEscPropagation } from './util.js';

const UPLOAD_URL = 'https://25.javascript.pages.academy/kekstagram';
const body = document.body;
const onUploadInput = document.querySelector('.img-upload__input');
const onImgUploadForm = document.querySelector('.img-upload__form');
const uploadImageForm = document.querySelector('.img-upload__overlay');
const onUploadImageCloseButton = document.querySelector('.img-upload__cancel');
const onHashtagsInput = document.querySelector('.text__hashtags');
const onImageComment = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');

const onUploadImageFormEsc = (evt) => {
  if (stopEscPropagation) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUploadImageForm();
  }
};

const onEscKey = (evt) => {
  if (stopEscPropagation) {
    evt.stopPropagation();
  }
};

onHashtagsInput.addEventListener('keydown', onEscKey);
onImageComment.addEventListener('keydown', onEscKey);

const openUploadImageForm = function () {
  if (this.files[0]) {
    const onPreviewImg = new FileReader();
    onPreviewImg.addEventListener('load', () => {
      imagePreview.setAttribute('src', onPreviewImg.result);
      uploadImageForm.classList.remove('hidden');
      body.classList.add('modal-open');
      document.querySelector('.scale__control--smaller').addEventListener('click', zoomImageDown);
      document.querySelector('.scale__control--bigger').addEventListener('click', zoomImageUp);
      document.addEventListener('keydown', onUploadImageFormEsc);
      document.querySelector('.effects__list').addEventListener('change', addEffect);
    }, false);

    onPreviewImg.readAsDataURL(this.files[0]);
  }
};

const closeUploadImageForm = () => {
  uploadImageForm.classList.add('hidden');
  body.classList.remove('modal-open');
  onUploadInput.value = null;
  onHashtagsInput.value = '';
  onImageComment.value = '';
  zoomImageDrop();
  dropEffect();
  pristine.reset();
  document.removeEventListener('keydown', onUploadImageFormEsc);
};

onUploadInput.addEventListener('change', openUploadImageForm);

onUploadImageCloseButton.addEventListener('click', closeUploadImageForm);

const setUserFormSubmit = (onSuccess, onFail) => {
  const onSendData = (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      evt.preventDefault();
      sendData(
        onSuccess,
        onFail,
        new FormData(evt.target),
        UPLOAD_URL,
      );
    }
  };
  onImgUploadForm.addEventListener('submit', onSendData);
};

export { openUploadImageForm, closeUploadImageForm, setUserFormSubmit };
