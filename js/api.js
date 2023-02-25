const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    }).catch(() => {
      onFail('Не удалось загрузить данные');
    });
};
export {getData};
