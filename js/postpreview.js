import { AMTCOMMENTS } from './data.js';

const templateComment = document.querySelector('#comment')
  .content.querySelector('.social__comment');

const PictureCloseButtonEsc = (evt) => {
  if (evt.keyCode === 27) {
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const buildComments = (createComments) => {
  const element = templateComment.cloneNode(true);
  element.querySelector('.social__text').textContent = createComments.message;
  element.querySelector('.social__picture').setAttribute('src', (createComments.avatar));
  return element;
};

const openBigPost = (post) => {
  const bigPost = document.querySelector('.big-picture');
  bigPost.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', PictureCloseButtonEsc);

  const bigPicture = bigPost.querySelector('.big-picture__img');
  const bigPictureImg = bigPicture.querySelector('img');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < post.comments.length && i < AMTCOMMENTS; i++) {
    fragment.appendChild(buildComments(post.comments[i]));
  }

  bigPictureImg.setAttribute('src', post.url);
  bigPost.querySelector('.likes-count').textContent = post.likes;
  bigPost.querySelector('.social__caption').textContent = post.description;
  bigPost.querySelector('.comments-count').textContent = post.comments.length;
  bigPost.querySelector('.social__comments').innerHTML = '';
  bigPost.querySelector('.social__comments').appendChild(fragment);
};

const PictureCloseButton = document.querySelector('.big-picture__cancel');
PictureCloseButton.addEventListener('click', () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', PictureCloseButtonEsc);
});

export { PictureCloseButton };
export { openBigPost };
