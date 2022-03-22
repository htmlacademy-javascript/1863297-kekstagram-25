const bigPost = (post) => {
  const b = document.querySelector('.big-picture');
  b.classList.remove('hidden');
  const bigPicture = b.querySelector('.big-picture__img');
  const bigPictureImg = bigPicture.querySelector('img')[0];
  bigPictureImg.setAttribute('src', post.url);
};

export {bigPost};


//  b.querySelector('.likes-count').textContent = post.likes;
//  b.querySelector('.social__caption').textContent = post.description;
//  b.querySelector('.comments-count').textContent = post.comments.length;
//  b.querySelector('.social__comments').innerHTML = '';
