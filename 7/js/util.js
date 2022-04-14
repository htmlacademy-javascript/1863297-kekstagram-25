const alertTemplate = document.querySelector('#alert').content;
const ALERT_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';
const ALERT_SHOW_TIME = 5000;

const randomCompareItems = () => Math.floor(Math.random() * 30) - 10;

const sortByComments = (data) => {
  const arrayPosts = data.slice();
  arrayPosts.sort((first, second) => second.comments.length - first.comments.length);
  return arrayPosts;
};

const getRandomItems = (data, count) => {
  const mixed = [...data].sort(randomCompareItems);

  return mixed.slice(0, count);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (alertMessage) => {
  const allertElement = alertTemplate.cloneNode(true);
  const allertInner = allertElement.querySelector('.alert__inner');
  alertMessage = ALERT_MESSAGE;
  allertInner.textContent = alertMessage;

  document.body.append(allertInner);

  setTimeout(() => {
    allertElement.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
}

const stopEscPropagation = ((evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropogation();
  }
});

export {
  showAlert,
  isEscEvent,
  getRandomItems,
  sortByComments,
  stopEscPropagation,
  debounce
};
