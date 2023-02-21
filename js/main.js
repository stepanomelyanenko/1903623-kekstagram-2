import {generatePictures} from './data.js';
import {showPictures, hidePictures} from './pictures.js';
import {openBigPicture, closeBigPicture} from './big-picture.js';

const pictures = generatePictures(25);
showPictures(pictures);
openBigPicture(pictures[1]);
