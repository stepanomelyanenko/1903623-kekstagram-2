import {showPictures} from './pictures.js';
import './new-picture.js';
import  './picture-form-validation.js';
import {getData} from './api.js';
import {showError} from './error.js';

getData((pictures) => {
  showPictures(pictures);
}, showError);
