const effects = ['effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
const none = 'none';
const unset = 'unset';
const block = 'block';
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const imagePreview = document.querySelector('.img-upload__preview');
const effectNone = document.querySelector('#effect-none');

effectLevel.style.display = 'none';

noUiSlider.create(sliderElement, {
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
    className: effects,
    filterName: 'unset',
  },
};

function checkEffect(effect) {
  if (effect === 'none') {
    imagePreview.classList.remove(effectsSettingList[effect].className);
    imagePreview.style.filter = effectsSettingList[effect].filterName;
    sliderValue.value = '';
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effectsSettingList[effect].min,
        max: effectsSettingList[effect].max,
      },
      start: effectsSettingList[effect].start,
      step: effectsSettingList[effect].step,
    });
    imagePreview.classList.add('effectsSettingList[effect].className');
    sliderElement.noUiSlider.on('update', (__, handle, unencoded) => {
      imagePreview.style.filter = `${effectsSettingList[effect].filterName}(${unencoded[handle]}${effectsSettingList[effect].unit})`;
      sliderValue.value = unencoded[handle];
    });
  }
}

function addEffect(evt) {
  const effectName = evt.target.value;
  effectLevel.style.display = none;
  effectLevel.style.display = effectName !== none ? block : none;
  checkEffect(effectName);
}

function dropEffect() {
  imagePreview.classList.remove(...effects);
  imagePreview.style.filter = unset;
  sliderValue.value = '';
  effectLevel.style.display = none;
  effectNone.checked = true;
}

export { addEffect, dropEffect };
