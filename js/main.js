import { loadData } from './api.js';
import { onCloseUploadImageFormClick } from './upload-form.js';
import { setUserFormSubmit } from './upload-form.js';
import { renderMessagePopup } from './messages.js';
import { showAlert } from './util.js';
import { addFiltersPhotos } from './filters.js';

loadData(
  addFiltersPhotos,
  showAlert,
);

const executeFormSuccess = () => {
  onCloseUploadImageFormClick();
  renderMessagePopup('success');
};

const executeFormError = () => {
  onCloseUploadImageFormClick();
  renderMessagePopup('error');
};

setUserFormSubmit(executeFormSuccess, executeFormError);
