const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const checkStringLength = (str, maxLength) => (str.length <= maxLength);

const isEscapeKey = (evt) => (evt.key === 'Escape');

export {getRandomNumber, checkStringLength, isEscapeKey};
