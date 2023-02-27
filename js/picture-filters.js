const DEFAULT_FILTER_VALUE = 100;
const filters = {
  none: {
    effect: '',
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

const previewPhotoElement = document.querySelector('.img-upload__preview');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsRadioElement = document.querySelector('.img-upload__effects');

let currentFilter = filters.none;
let currentFilterClass = '';
let currentFilterValue = DEFAULT_FILTER_VALUE;

sliderElement.classList.add('visually-hidden');

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
    previewPhotoElement.classList.remove(currentFilterClass);
  }

  currentFilter = effect;
  currentFilterValue = effect.maxValue;

  if (effect.effect !== '') {
    currentFilterClass = `effects__preview--${effect.effect}`;
    previewPhotoElement.classList.add(currentFilterClass);
  }

  if (effect.filter !== filters.none.filter) {
    previewPhotoElement.style['filter'] = `${effect.filter}(${effect.maxValue}${effect.measurement})`;
  }
  else {
    previewPhotoElement.style['filter'] = '';
  }

  effectLevelValueElement.value = currentFilterValue;

  if (effect.hideFilter) {
    sliderElement.classList.add('visually-hidden') ;
  } else {
    sliderElement.classList.remove('visually-hidden');
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.minValue,
      max: effect.maxValue
    },
    start: effect.maxValue,
    step: effect.step
  });
};

const changeFilterValue = (value) => {
  currentFilterValue = value;
  previewPhotoElement.style['filter'] = `${currentFilter.filter}(${value}${currentFilter.measurement})`;
};

const onEffectsRadioChange = (evt) => {
  const value = evt.target.value;
  changeFilter(filters[value]);
};

const resetRadiosValue = () => {
  const filterRadios = effectsRadioElement.querySelectorAll('.effects__radio');
  filterRadios.forEach((element) => {
    element.checked = false;
  });
  filterRadios[0].checked = true;
};

const resetFilters = () => {
  changeFilter(filters.none);
  resetRadiosValue();
};

effectsRadioElement.addEventListener('change', onEffectsRadioChange);

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;
  changeFilterValue(sliderValue);
});

export {resetFilters};
