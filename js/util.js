const ALERT_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';
const ALERT_SHOW_TIME = 5000;
const MULTIPLICATION_NUMBER = 30;
const SUBTRACT_NUMBER = 10;
const TIMEOUT_DELAY = 500;
const alertTemplate = document.querySelector('#alert').content;


const randomCompareItems = () => Math.floor(Math.random() * MULTIPLICATION_NUMBER) - SUBTRACT_NUMBER;

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

const stopEscPropagation = ((evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

const showAlert = (alertMessage) => {
  const alertElement = alertTemplate.cloneNode(true);
  const alertInner = alertElement.querySelector('.alert__inner');
  alertMessage = ALERT_MESSAGE;
  alertInner.textContent = alertMessage;

  document.body.append(alertInner);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  ALERT_MESSAGE,
  showAlert,
  isEscEvent,
  getRandomItems,
  sortByComments,
  stopEscPropagation,
  debounce
};
