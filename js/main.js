import { loadData } from './api.js';
import { closeUploadImageForm } from './upload-form.js';
import { setUserFormSubmit } from './upload-form.js';
import { renderMessagePopup } from './messages.js';
import { showAlert } from './util.js';
import { addFiltersPhotos } from './filters.js';


const DOWNLOAD_URL = 'https://25.javascript.pages.academy/kekstagram/data';

loadData(
  addFiltersPhotos,
  showAlert,
  DOWNLOAD_URL,
);

const executeFormSuccess = () => {
  closeUploadImageForm();
  renderMessagePopup('success');
};

const executeFormError = () => {
  closeUploadImageForm();
  renderMessagePopup('error');
};

setUserFormSubmit(executeFormSuccess, executeFormError);
