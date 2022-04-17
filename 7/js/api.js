import { ALERT_MESSAGE } from './util.js';

const DOWNLOAD_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const UPLOAD_URL = 'https://25.javascript.pages.academy/kekstagram';
const FAIL_MESSAGE = 'Не удалось отправить данные. Попробуйте ещё раз';
const POST = 'POST';

const loadData = (onSuccess, onError) => {
  fetch(DOWNLOAD_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error (ALERT_MESSAGE);
      }
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch((error) => {
      onError(error);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(UPLOAD_URL,
    {
      method: POST,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(FAIL_MESSAGE);
      }
    })
    .catch((error) => {
      onError(error);
    });
};

export {loadData, sendData,UPLOAD_URL, DOWNLOAD_URL};
