import {posts} from './data.js';


const postTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const postListElement = document.querySelector('.pictures');
const postListFragment = document.createDocumentFragment();

posts.forEach ((post) => {
  const postElement = postTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').setAttribute('src', post.url);
  postElement.querySelector('.picture__likes').textContent = post.likes;
  postElement.querySelector('.picture__comments').textContent = post.comments.length;
  postListFragment.appendChild(postElement);
});

postListElement.appendChild(postListFragment);
