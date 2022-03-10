import {DESCRIPTIONS, NAMES, MESSAGES, getRandomNumber, getRandomPositiveInteger} from './utils.js';

const maxNumberComments = 100;
const maxNumberLikes = 200;
const minNumberLikes = 15;
const maxNumberAvatar = 6;

const comments = [];
const posts = [];

const createComments = () => ({
  id: getRandomNumber(1, maxNumberComments),
  avatar: `photos/${getRandomNumber(1, maxNumberAvatar)}.svg.`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const createPosts = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(minNumberLikes, maxNumberLikes),
  comments: comments,
});

const postsRandElement = () => {
  const rand = Math.floor(Math.random() * posts.length);
  return posts[rand];
};

const AMTCOMMENTS = 10;
for (let i = 0; i < AMTCOMMENTS; i++) {
  comments.push(createComments());
}

const AMTPOSTS = 25;
for (let i = 0; i < AMTPOSTS; i++) {
  posts.push(createPosts(i));
}

export {postsRandElement};
