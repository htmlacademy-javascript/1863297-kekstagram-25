const EFFECTS = ['effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
const NONE = 'none';
const UNSET = 'unset';
const BLOCK = 'block';
const SLIDER_ELEMENT = document.querySelector('.effect-level__slider');
const SLIDER_VALUE = document.querySelector('.effect-level__value');
const EFFECT_LEVEL = document.querySelector('.effect-level');
const IMAGE_PREVIEW = document.querySelector('.img-upload__preview');
const EFFECT_NONE = document.querySelector('#effect-none');

EFFECT_LEVEL.style.display = 'none';

noUiSlider.create(SLIDER_ELEMENT, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

const effectsSettingList = {
  chrome: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    className: 'effects__preview--chrome',
    filterName: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    className: 'effects__preview--sepia',
    filterName: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    className: 'effects__preview--marvin',
    filterName: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    className: 'effects__preview--phobos',
    filterName: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    className: 'effects__preview--heat',
    filterName: 'brightness',
    unit: '',
  },
  none: {
    className: EFFECTS,
    filterName: 'unset',
  },
};

function checkEffect(effect) {
  if (effect === 'none') {
    IMAGE_PREVIEW.classList.remove(effectsSettingList[effect].className);
    IMAGE_PREVIEW.style.filter = effectsSettingList[effect].filterName;
    SLIDER_VALUE.value = '';
  } else {
    SLIDER_ELEMENT.noUiSlider.updateOptions({
      range: {
        min: effectsSettingList[effect].min,
        max: effectsSettingList[effect].max,
      },
      start: effectsSettingList[effect].start,
      step: effectsSettingList[effect].step,
    });
    IMAGE_PREVIEW.classList.add('effectsSettingList[effect].className');
    SLIDER_ELEMENT.noUiSlider.on('update', (__, handle, unencoded) => {
      IMAGE_PREVIEW.style.filter = `${effectsSettingList[effect].filterName}(${unencoded[handle]}${effectsSettingList[effect].unit})`;
      SLIDER_VALUE.value = unencoded[handle];
    });
  }
}

function addEffect(evt) {
  const effectName = evt.target.value;
  EFFECT_LEVEL.style.display = NONE;
  EFFECT_LEVEL.style.display = effectName !== NONE ? BLOCK : NONE;
  checkEffect(effectName);
}

function dropEffect() {
  IMAGE_PREVIEW.classList.remove(...EFFECTS);
  IMAGE_PREVIEW.style.filter = UNSET;
  SLIDER_VALUE.value = '';
  EFFECT_LEVEL.style.display = NONE;
  EFFECT_NONE.checked = true;
}

export { addEffect, dropEffect };
