import { zoomImageUp, zoomImageDown, zoomImageDrop } from './zoom.js';
import { addEffect, dropEffect } from './add-effect.js';
import { pristine } from './utils/validate.js';
import { sendData } from './api.js';

const UPLOAD_URL = 'https://25.javascript.pages.academy/kekstagram';
const BODY = document.querySelector('body');
const UPLOAD_INPUT = document.querySelector('.img-upload__input');
const IMG_UPLOAD_FORM = document.querySelector('.img-upload__form');
const UPLOAD_IMAGE_FORM = document.querySelector('.img-upload__overlay');
const UPLOAD_IMAGE_CLOSE_BUTTON = document.querySelector('.img-upload__cancel');
const HASTAGS_INPUT = document.querySelector('.text__hashtags');
const IMAGE_COMMENT = document.querySelector('.text__description');
const IMAGE_PREVIEW = document.querySelector('.img-upload__preview img');

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

HASTAGS_INPUT.addEventListener('keydown', onEscKey);
IMAGE_COMMENT.addEventListener('keydown', onEscKey);

const openUploadImageForm = function () {
  if (this.files[0]) {
    const previewImg = new FileReader();
    previewImg.addEventListener('load', () => {
      IMAGE_PREVIEW.setAttribute('src', previewImg.result);
      UPLOAD_IMAGE_FORM.classList.remove('hidden');
      BODY.classList.add('modal-open');
      document.querySelector('.scale__control--smaller').addEventListener('click', zoomImageDown);
      document.querySelector('.scale__control--bigger').addEventListener('click', zoomImageUp);
      document.addEventListener('keydown', onUploadImageFormEsc);
      document.querySelector('.effects__list').addEventListener('change', addEffect);
    }, false);

    previewImg.readAsDataURL(this.files[0]);
  }
};

const closeUploadImageForm = () => {
  UPLOAD_IMAGE_FORM.classList.add('hidden');
  BODY.classList.remove('modal-open');
  UPLOAD_INPUT.value = null;
  HASTAGS_INPUT.value = '';
  IMAGE_COMMENT.value = '';
  zoomImageDrop();
  dropEffect();
  pristine.reset();
  document.removeEventListener('keydown', onUploadImageFormEsc);
};

UPLOAD_INPUT.addEventListener('change', openUploadImageForm);

UPLOAD_IMAGE_CLOSE_BUTTON.addEventListener('click', closeUploadImageForm);

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
  IMG_UPLOAD_FORM.addEventListener('submit', onSendData);
};

export { openUploadImageForm, closeUploadImageForm, setUserFormSubmit };
