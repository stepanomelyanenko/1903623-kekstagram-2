const checkStringLength = (str, maxLength) => (str.length <= maxLength);

const shuffleArray = (array) => (array.sort(() => Math.random() - 0.5));

const isEscapeKey = (evt) => (evt.key === 'Escape');

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {checkStringLength, shuffleArray, isEscapeKey, debounce};
