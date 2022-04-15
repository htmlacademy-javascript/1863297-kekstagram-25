import { stopEscPropagation } from '../util.js';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MIN_SYMBOLS = 2;
const HASHTAGS_MAX_SYMBOLS = 20;
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const DESCRIPTION_MAX_LENGTH = 140;

const pictureUploadForm = document.querySelector('.img-upload__form');
const onPictureUploadHashtags = pictureUploadForm.querySelector('.text__hashtags');
const onPictureUploadDescr = pictureUploadForm.querySelector('.text__description');

const splitHashtags = ((HashtagsString) =>
  HashtagsString.trim().toLowerCase().split(' ').filter((element) => element !== '')
);

const validateTagOnlyHash = ((value) =>
  !(splitHashtags(value).some((element) => (element.charAt(0) === '#' && element.length === 1)))
);

const validateTagFromHash = ((value) =>
  splitHashtags(value).every((element) => element.startsWith('#'))
);

const validateTagsOverflow = ((value) =>
  splitHashtags(value).length <= HASHTAGS_MAX_COUNT
);

const validateTagsDublicate = ((value) =>
  !(splitHashtags(value).some((element, index, arr) => arr.lastIndexOf(element) !== index))
);

const validateTagsLengthMinMax = ((value) =>
  splitHashtags(value).every((element) => element.length >= HASHTAGS_MIN_SYMBOLS && element.length <= HASHTAGS_MAX_SYMBOLS)
);

const validateTagsRegExp = ((value) =>
  splitHashtags(value).every((element) => element.match(HASHTAGS_REGEX))
);

const validateDescrLength = ((value) =>
  value.length <= DESCRIPTION_MAX_LENGTH
);

const pristine = new Pristine(pictureUploadForm, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

pristine.addValidator(onPictureUploadHashtags, validateTagOnlyHash, 'ХешТег не должен состоять только из #.');
pristine.addValidator(onPictureUploadHashtags, validateTagFromHash, 'ХешТег должен состоять из # и хотя бы одного символа.');
pristine.addValidator(onPictureUploadHashtags, validateTagsOverflow, `Максимальное кол-во хештегов ${HASHTAGS_MAX_COUNT} штук.`);
pristine.addValidator(onPictureUploadHashtags, validateTagsDublicate, 'Все хештеги должны быть уникальными.');
pristine.addValidator(onPictureUploadHashtags, validateTagsLengthMinMax, `Длина хештега должна быть больше ${HASHTAGS_MIN_SYMBOLS} и меньше ${HASHTAGS_MAX_SYMBOLS} символов.`);
pristine.addValidator(onPictureUploadHashtags, validateTagsRegExp, 'Хештег должен состоять только из букв и цифр');
pristine.addValidator(onPictureUploadDescr, validateDescrLength, `Длина описания не должна превышать ${DESCRIPTION_MAX_LENGTH} символов`);

onPictureUploadHashtags.addEventListener('keydown', stopEscPropagation);
onPictureUploadDescr.addEventListener('keydown', stopEscPropagation);

export { pristine };
