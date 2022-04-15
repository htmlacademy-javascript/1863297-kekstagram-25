import { stopEscPropagation } from './util.js';

const PAGE_SIZE = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureComment = bigPicture.querySelector('.comment-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const onBigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const onCancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment').content;
const body = document.body;
let currentPage = 1;
let comments = [];

const getPictureComments = () => {
  const fragment = document.createDocumentFragment();
  const count = PAGE_SIZE * currentPage;
  const showMore = count < comments.length;
  bigPictureComment.textContent = count < comments.length ? count : comments.length;

  comments.slice(0, count-1).forEach((comment) => {
    const {avatar, name, message} = comment;
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    fragment.appendChild(commentElement);
  });

  if (showMore) {
    onBigPictureCommentsLoader.classList.remove('hidden');
  } else {
    onBigPictureCommentsLoader.classList.add('hidden');
  }
  return fragment;
};

const renderComments = () => {
  commentsList.textContent = '';
  commentsList.appendChild(getPictureComments());
};

const onShowMoreClick = () => {
  currentPage++;
  renderComments();
};

onBigPictureCommentsLoader.addEventListener('click', onShowMoreClick);

const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentsCount.classList.remove('hidden');
  comments = photo.comments;
  currentPage = 1;
  renderComments();
  body.classList.add('modal-open');
};

const changeClass = () => {
  bigPicture.classList.add('hidden');
  bigPictureCommentsCount.classList.add('hidden');
  body.classList.remove('modal-open');
};

const addButtonClass = () => {
  changeClass();
};

const hidePopup = () => {
  if (stopEscPropagation) {
    changeClass();
  }
};

onCancelButton.addEventListener ('click', addButtonClass);
document.addEventListener('keydown', hidePopup);

export {showBigPicture};
