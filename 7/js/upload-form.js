import { zoomImageUp, zoomImageDown, zoomImageDrop } from './zoom.js';
import { addEffect, dropEffect } from './add-effect.js';
import { pristine } from './utils/validate.js';
import { sendData } from './api.js';

const UPLOAD_URL = 'https://25.javascript.pages.academy/kekstagram';
const body = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImageForm = document.querySelector('.img-upload__overlay');
const uploadImageCloseButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const imageComment = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');

const onUploadImageFormEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUploadImageForm();
  }
};

const onEscKey = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

hashtagsInput.addEventListener('keydown', onEscKey);
imageComment.addEventListener('keydown', onEscKey);

const openUploadImageForm = function () {
  if (this.files[0]) {
    const previewImg = new FileReader();
    previewImg.addEventListener('load', () => {
      imagePreview.setAttribute('src', previewImg.result);
      uploadImageForm.classList.remove('hidden');
      body.classList.add('modal-open');
      document.querySelector('.scale__control--smaller').addEventListener('click', zoomImageDown);
      document.querySelector('.scale__control--bigger').addEventListener('click', zoomImageUp);
      document.addEventListener('keydown', onUploadImageFormEsc);
      document.querySelector('.effects__list').addEventListener('change', addEffect);
    }, false);

    previewImg.readAsDataURL(this.files[0]);
  }
};

const closeUploadImageForm = () => {
  uploadImageForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = null;
  hashtagsInput.value = '';
  imageComment.value = '';
  zoomImageDrop();
  dropEffect();
  pristine.reset();
  document.removeEventListener('keydown', onUploadImageFormEsc);
};

uploadInput.addEventListener('change', openUploadImageForm);

uploadImageCloseButton.addEventListener('click', closeUploadImageForm);

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
  imgUploadForm.addEventListener('submit', onSendData);
};

export { openUploadImageForm, closeUploadImageForm, setUserFormSubmit };
