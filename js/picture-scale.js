const PHOTO_SCALE_STEP = 25;
const PHOTO_SCALE_DEFAULT = 100;

const scaleInputElement = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const previewPhoto = document.querySelector('.img-upload__preview');

let photoScaleValue = PHOTO_SCALE_DEFAULT;

const setScaleAttribute = () => (previewPhoto.style['transform'] = `scale(${photoScaleValue/100})`);

const onScaleSmallerClick = () => {
  if (photoScaleValue === 25) {
    return;
  }

  photoScaleValue = photoScaleValue - PHOTO_SCALE_STEP;
  scaleInputElement.value =`${photoScaleValue}%`;
  setScaleAttribute();
};

const onScaleBiggerClick = () => {
  if (photoScaleValue === 100) {
    return;
  }

  photoScaleValue = photoScaleValue + PHOTO_SCALE_STEP;
  scaleInputElement.value = `${photoScaleValue}%`;
  setScaleAttribute();
};

const resetPhotoScale = () => {
  photoScaleValue = PHOTO_SCALE_DEFAULT;
  scaleInputElement.value =`${photoScaleValue}%`;
  setScaleAttribute();
};

scaleSmallerBtn.addEventListener('click', onScaleSmallerClick);
scaleBiggerBtn.addEventListener('click', onScaleBiggerClick);

export {resetPhotoScale};
