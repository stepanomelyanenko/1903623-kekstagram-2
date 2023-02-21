import {generatePictures} from './data.js';
import {showPictures} from './pictures.js';
import {openBigPicture} from './big-picture.js';
import './new-photo.js';
import  './picture-form-validation.js';

const pictures = generatePictures(25);
showPictures(pictures);
// openBigPicture(pictures[1]);
