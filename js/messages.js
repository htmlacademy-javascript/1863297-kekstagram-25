import { isEscEvent } from './util.js';

const SUCCES_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');

const messagesTypes = {
  success: SUCCES_TEMPLATE,
  error: ERROR_TEMPLATE,
};

const deleteMessagePopup = () => {
  const messagePopup = document.querySelector('.success') || document.querySelector('.error');
  if (messagePopup) {
    messagePopup.remove();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    deleteMessagePopup();
    document.removeEventListener('click', onDocumentClick);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    deleteMessagePopup();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onMessagePopupButtonClick = () => {
  deleteMessagePopup();
};

const renderMessagePopup = (type) => {
  const messagePopup = messagesTypes[type].cloneNode(true);
  document.body.appendChild(messagePopup);
  const messagePopupButton = messagePopup.querySelector('button');
  messagePopupButton.addEventListener('click', onMessagePopupButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {renderMessagePopup};
