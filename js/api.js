const ALERT_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';
const FAIL_MESSAGE = 'Не удалось отправить данные. Попробуйте ещё раз';
const POST = 'POST';

const loadData = (onSuccess, onError, url) => {
  fetch(url)
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

const sendData = (onSuccess, onError, body, url) => {
  fetch(url,
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

export {loadData, sendData};
