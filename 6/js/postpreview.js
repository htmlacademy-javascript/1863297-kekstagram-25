const bigPost = (post) => {
  const b = document.querySelector('.big-picture');
  b.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const bigPicture = b.querySelector('.big-picture__img');
  const bigPictureImg = bigPicture.querySelector('img');
  bigPictureImg.setAttribute('src', post.url);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < post.comments.length && i < 10; i++) {
    fragment.appendChild(buildComments(post.comments[i]));
  };
  b.querySelector('.likes-count').textContent = post.likes;
  b.querySelector('.social__caption').textContent = post.description;
  b.querySelector('.comments-count').textContent = post.comments.length;
  b.querySelector('.social__comments').innerHTML = '';
  b.querySelector('.social__comments').appendChild(fragment);
};

const PictureCloseButtonEsc = (evt) => {
  if (evt.keyCode === 27) {
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const PictureCloseButton = document.querySelector('.big-picture__cancel');
document.addEventListener('keydown', PictureCloseButtonEsc);
PictureCloseButton.addEventListener('click', function () {
  document.querySelector('.big-picture').classList.add('hidden');
});

const buildComments = (createComments) => {
  const element = templateComment.cloneNode(true);
  element.querySelector('.social__text').textContent = createComments.MESSAGES;
  element.querySelector('.social__picture')
    .setAttribute('src', (createComments.avatar));

};

export {PictureCloseButton};
export {bigPost};
console.log();
