function getRandomNumber(min,max) {
  if (max <= min) {
    throw('Ошибка');
  }
  if (min <= 0 || max <= 0) {
    throw('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
}

function checkLegth(str, maxLegth) {
  return str.length > maxLegth;
}
checkLegth(1, 140);

/*
Структура каждого объекта должна быть следующей:

id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии. Описание придумайте самостоятельно.

likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}
У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

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

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createComments = () => ({
  id: getRandomNumber(1, 100),
  avatar: `photos/${getRandomNumber(1, 6)}.svg.`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const comments = [];
const QUANTITYCOMMENTS = 10;
for (let i = 1; i <= QUANTITYCOMMENTS; i++) {
  comments.push(createComments());
}

const createPosts = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: comments[getRandomPositiveInteger(0, comments.length - 1)]
});

const posts = [];
const QUANTITYPOSTS = 25;
for (let i = 1; i <= QUANTITYPOSTS; i++) {
  posts.push(createPosts(i));
}

function postsRandElement(posts) {
  const rand = Math.floor(Math.random() * posts.length);
  return posts[rand];
}
