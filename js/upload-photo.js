const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('#upload-file');
const previewElement = document.querySelector('.img-upload__preview').children[0];

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
});
