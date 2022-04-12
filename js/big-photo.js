const PAGE_SIZE = 5;
const ESC_KEY_CODE = 27;
const BIG_PICTURE = document.querySelector('.big-picture');
const BIG_PICTURE_IMG = BIG_PICTURE.querySelector('.big-picture__img img');
const BIG_PICTURE_LIKES = BIG_PICTURE.querySelector('.likes-count');
const BIG_PICTURE_COMMENTS = BIG_PICTURE.querySelector('.comments-count');
const BIG_PICTURE_COMMENT = BIG_PICTURE.querySelector('.comment-count');
const BIG_PICTURE_DESCRIPTION = BIG_PICTURE.querySelector('.social__caption');
const BIG_PICTURE_COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
const BIG_PICTURE_COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader');
const CANCEL_BUTTON = BIG_PICTURE.querySelector('.big-picture__cancel');
const COMMENTS_LIST = document.querySelector('.social__comments');
const COMMENT_TEMPLATE = document.querySelector('#social__comment').content;
const BODY = document.querySelector('body');
let currentPage = 1;
let comments = [];

const getPictureComments = () => {
  const fragment = document.createDocumentFragment();
  const count = PAGE_SIZE * currentPage;
  const showMore = count < comments.length;
  BIG_PICTURE_COMMENT.textContent = count < comments.length ? count : comments.length;

  comments.slice(0, count-1).forEach((comment) => {
    const {avatar, name, message} = comment;
    const commentElement = COMMENT_TEMPLATE.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    fragment.appendChild(commentElement);
  });

  if (showMore) {
    BIG_PICTURE_COMMENTS_LOADER.classList.remove('hidden');
  } else {
    BIG_PICTURE_COMMENTS_LOADER.classList.add('hidden');
  }
  return fragment;
};

const renderComments = () => {
  COMMENTS_LIST.textContent = '';
  COMMENTS_LIST.appendChild(getPictureComments());
};

const onShowMoreClick = () => {
  currentPage++;
  renderComments();
};

BIG_PICTURE_COMMENTS_LOADER.addEventListener('click', onShowMoreClick);

const showBigPicture = (photo) => {
  BIG_PICTURE.classList.remove('hidden');
  BIG_PICTURE_IMG.src = photo.url;
  BIG_PICTURE_LIKES.textContent = photo.likes;
  BIG_PICTURE_COMMENTS.textContent = photo.comments.length;
  BIG_PICTURE_DESCRIPTION.textContent = photo.description;
  BIG_PICTURE_COMMENTS_COUNT.classList.remove('hidden');
  comments = photo.comments;
  currentPage = 1;
  renderComments();
  BODY.classList.add('modal-open');
};

const changeClass = () => {
  BIG_PICTURE.classList.add('hidden');
  BIG_PICTURE_COMMENTS_COUNT.classList.add('hidden');
  BODY.classList.remove('modal-open');
};

const addButtonClass = () => {
  changeClass();
};

const hidePopup = (evt) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    changeClass();
  }
};

CANCEL_BUTTON.addEventListener ('click', addButtonClass);
document.addEventListener('keydown', hidePopup);

export {showBigPicture};
