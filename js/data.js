import {getRandomNumber} from './utils.js';

const descriptionSentences = [
  'Каждый из нас понимает очевидную вещь: укрепление и развитие внутренней структуры способствует подготовке и реализации экономической целесообразности принимаемых решений.',
  'Есть над чем задуматься: независимые государства рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.',
  'Равным образом, консультация с широким активом играет определяющее значение для направлений прогрессивного развития.',
  'Равным образом, внедрение современных методик предоставляет широкие возможности для приоретизации разума над эмоциями.',
  'В частности, постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании поэтапного и последовательного развития общества.',
  'Вот вам яркий пример современных тенденций — постоянный количественный рост.',
  'Cфера нашей активности создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса системы обучения кадров, соответствующей насущным потребностям.',
  'Однозначно, элементы политического процесса являются только методом политического участия и рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. ',
  'Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление обеспечивает актуальность экономической целесообразности принимаемых решений. ',
  'Следует отметить, что социально-экономическое развитие требует анализа соответствующих условий активизации.',
  'Безусловно, граница обучения кадров требует анализа глубокомысленных рассуждений.',
  'Для современного мира убеждённость некоторых оппонентов способствует подготовке и реализации позиций, занимаемых участниками в отношении поставленных задач.'
];
const commentSentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. ',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. ',
  'Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Авдотья',
  'Яков',
  'Персефона',
  'Святослав',
  'Валера',
  'Златослава',
  'Светозар',
  'Янус',
  'Метрофан'
];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error ({'text': `Перебраны все числа из диапазона от ${min} до ${max}`});
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePublicationId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateCommentId = createRandomIdFromRangeGenerator(1, 2 ** 20);

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: commentSentences[getRandomNumber(0, commentSentences.length - 1)],
  name: names[getRandomNumber(0, names.length - 1)]
});

const generatePublication = () => ({
  id: generatePublicationId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: descriptionSentences[getRandomNumber(0, descriptionSentences.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(5, 15)}, generateComment)
});

const generatePictures = (amount) => (Array.from({length: amount}, () => generatePublication()));

export {generatePictures};
