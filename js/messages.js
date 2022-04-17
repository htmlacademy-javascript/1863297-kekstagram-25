import { isEscEvent } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const messagesTypes = {
  success: successTemplate,
  error: errorTemplate,
};

const deleteMessagePopup = () => {
  const messagePopup = document.querySelector('.success') || document.querySelector('.error');
  if (messagePopup) {
    messagePopup.remove();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    deleteMessagePopup();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('keydown', deleteMessagePopup);
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    deleteMessagePopup();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onMessagePopupButtonClick = () => {
  deleteMessagePopup();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', deleteMessagePopup);
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
