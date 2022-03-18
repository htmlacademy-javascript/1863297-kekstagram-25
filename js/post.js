/* Заведите модуль, который будет отвечать за отрисовку миниатюр.

На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как трибут src изобраажения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

Подключите модуль в проект. */

import {createPosts} from './data.js';


const postTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const postListElement = document.querySelector('.pictures');
const postListFragment = document.createDocumentFragment();

const post = createPosts();

post.forEach (({url, likes, comments}) => {
  const postElement = postTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').setAttribute('src', url);
  postElement.querySelector('.picture__likes').textContent = likes;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postListFragment.appendChild(postElement);
});

postListElement.appendChild(postListFragment);
