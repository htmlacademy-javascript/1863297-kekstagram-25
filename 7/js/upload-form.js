import { onZoomImageUpClick, onZoomImageDownClick, onZoomImageDropClick } from './zoom.js';
import { onEffectListAddEffectChange, onEffectListDropEffectClick } from './add-effect.js';
import { pristine } from './utils/validate.js';
import { sendData } from './api.js';
import { UPLOAD_URL } from './api.js';

const uploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImageForm = document.querySelector('.img-upload__overlay');
const uploadImageCloseButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const imageComment = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');

const onCloseUploadImageFormClick = () => {
  uploadImageForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = null;
  hashtagsInput.value = '';
  imageComment.value = '';
  onZoomImageDropClick();
  onEffectListDropEffectClick();
  pristine.reset();
};

const onUploadImageFormEscKeydown = (evt) => {
  evt.preventDefault();
  onCloseUploadImageFormClick();
};

const onEscKey = (evt) => {
  evt.stopPropagation();
};

hashtagsInput.addEventListener('keydown', onEscKey);
imageComment.addEventListener('keydown', onEscKey);

function onOpenUploadImageFormChange() {
  if (this.files[0]) {
    const previewImg = new FileReader();
    previewImg.addEventListener('load', () => {
      imagePreview.setAttribute('src', previewImg.result);
      uploadImageForm.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.querySelector('.scale__control--smaller').addEventListener('click', onZoomImageDownClick);
      document.querySelector('.scale__control--bigger').addEventListener('click', onZoomImageUpClick);
      document.addEventListener('keydown', onUploadImageFormEscKeydown);
      document.querySelector('.effects__list').addEventListener('change', onEffectListAddEffectChange);
    }, false);

    previewImg.readAsDataURL(this.files[0]);
  }
}

uploadInput.addEventListener('change', onOpenUploadImageFormChange);

uploadImageCloseButton.addEventListener('click', onCloseUploadImageFormClick);

const setUserFormSubmit = (onSuccess, onFail) => {
  const onSendDataSubmit = (evt) => {
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
  imgUploadForm.addEventListener('submit', onSendDataSubmit);
};

export { onOpenUploadImageFormChange, onCloseUploadImageFormClick, setUserFormSubmit };
