const DESCRIPTIONS = [
  'В Милане',
  'На Кубе',
  'No war',
  'Миру - мир',
  'Не виноватая я, он сам пришел',
  'По пивку?',
  'Курю кальян',
  'Чил',
  'На работе',
  'На даче',
  'Экстемально',
  'Жара',
  'Брр, скорее бы лето',
];

const NAMES = [
  'Александр',
  'Павел',
  'Анастасия',
  'Яна',
  'Владимир',
  'Геннадий',
  'Юлия',
  'Вероника',
  'Алексей',
  'Андрей',
  'Полина',
  'Алина',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

function getRandomNumber(min,max) {
  if (max <= min) {
    throw('Ошибка');
  }
  if (min <= 0 || max <= 0) {
    throw('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
}

function checkLegth (str, maxLegth) {
  return str.length > maxLegth;
}

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {DESCRIPTIONS, NAMES, MESSAGES, getRandomNumber, checkLegth, getRandomPositiveInteger};
