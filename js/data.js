import {getRandomNumber, getRandomPositiveInteger} from './utils.js';

const MAXNUMBERCOMMENTS = 100;
const MAXNUMBERLIKES = 200;
const MINNUMBERLIKES = 15;
const MAXNUMBERAVATAR = 6;
const AMTCOMMENTS = 10;
const AMTPOSTS = 25;

const comments = [];
const posts = [];

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

const createComments = () => ({
  id: getRandomNumber(1, MAXNUMBERCOMMENTS),
  avatar: `photos/${getRandomNumber(1, MAXNUMBERAVATAR)}.svg.`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const createPosts = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(MINNUMBERLIKES, MAXNUMBERLIKES),
  comments: comments,
});

const postsRandElement = () => {
  const rand = Math.floor(Math.random() * posts.length);
  return posts[rand];
};

for (let i = 0; i < AMTCOMMENTS; i++) {
  comments.push(createComments());
}

for (let i = 0; i < AMTPOSTS; i++) {
  posts.push(createPosts(i));
}

export {postsRandElement};
