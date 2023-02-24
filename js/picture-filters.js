const DEFAULT_FILTER_VALUE = 100;
const Filters = {
  none: {
    effect: '0',
    minValue: 0,
    maxValue: 100,
    step: 1,
    filter: '',
    measurement: '',
    hideFilter: true
  },
  chrome: {
    effect: 'chrome',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'grayscale',
    measurement: '',
    hideFilter: false
  },
  sepia: {
    effect: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'sepia',
    measurement: '',
    hideFilter: false
  },
  marvin: {
    effect: 'marvin',
    minValue: 0,
    maxValue: 100,
    step: 1,
    filter: 'invert',
    measurement: '%',
    hideFilter: false
  },
  phobos: {
    effect: 'phobos',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    filter: 'blur',
    measurement: 'px',
    hideFilter: false
  },
  heat: {
    effect: 'heat',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    filter: 'brightness',
    measurement: '',
    hideFilter: false
  }
};

const previewPhoto = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsRadioElement = document.querySelector('.img-upload__effects');

let currentFilterClass = '';
let currentFilterValue = DEFAULT_FILTER_VALUE;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeFilter = (effect) => {
  if (currentFilterClass !== '') {
    previewPhoto.classList.remove(currentFilterClass);
  }

  currentFilterValue = effect.maxValue;
  currentFilterClass = `effects__preview--${effect.effect}`;
  previewPhoto.classList.add(currentFilterClass);
  previewPhoto.style['transform'] = `${effect.filter}(${effect.maxValue}${effect.measurement})`;
  effectLevelValue.value = currentFilterValue;

  if (effect.hideFilter) {
    sliderElement.classList.add('visually-hidden') ;
  } else {
    sliderElement.classList.remove('visually-hidden');
  }
};

const onEffectsRadioChange = (evt) => {
  const value = evt.target.value;
  changeFilter(Filters[value]);
};

const resetFilters = () => (changeFilter(Filters.none));

effectsRadioElement.addEventListener('change', onEffectsRadioChange);

export {resetFilters};
