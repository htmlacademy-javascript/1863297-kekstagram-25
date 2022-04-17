import { isEscEvent } from '../util.js';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MIN_SYMBOLS = 2;
const HASHTAGS_MAX_SYMBOLS = 20;
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const DESCRIPTION_MAX_LENGTH = 140;

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadHashtags = pictureUploadForm.querySelector('.text__hashtags');
const pictureUploadDescr = pictureUploadForm.querySelector('.text__description');

const splitHashtags = ((hashtagsString) =>
  hashtagsString.trim().toLowerCase().split(' ').filter((element) => element !== '')
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

pristine.addValidator(pictureUploadHashtags, validateTagOnlyHash, 'ХешТег не должен состоять только из #.');
pristine.addValidator(pictureUploadHashtags, validateTagFromHash, 'ХешТег должен состоять из # и хотя бы одного символа.');
pristine.addValidator(pictureUploadHashtags, validateTagsOverflow, `Максимальное кол-во хештегов ${HASHTAGS_MAX_COUNT} штук.`);
pristine.addValidator(pictureUploadHashtags, validateTagsDublicate, 'Все хештеги должны быть уникальными.');
pristine.addValidator(pictureUploadHashtags, validateTagsLengthMinMax, `Длина хештега должна быть больше ${HASHTAGS_MIN_SYMBOLS} и меньше ${HASHTAGS_MAX_SYMBOLS} символов.`);
pristine.addValidator(pictureUploadHashtags, validateTagsRegExp, 'Хештег должен состоять только из букв и цифр');
pristine.addValidator(pictureUploadDescr, validateDescrLength, `Длина описания не должна превышать ${DESCRIPTION_MAX_LENGTH} символов`);

pictureUploadHashtags.addEventListener('keydown', isEscEvent);
pictureUploadDescr.addEventListener('keydown', isEscEvent);

export { pristine };
