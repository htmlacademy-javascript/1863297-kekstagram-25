const MIN_ZOOM_VALUE = 25;
const MAX_ZOOM_VALUE = 100;
const zoomInput = document.querySelector('.scale__control--value');
let zoomValue = Number(zoomInput.value.slice(0, -1)); //отрежет проценты %
const imagePreview = document.querySelector('.img-upload__preview');

function zoomImageUp(evt) {
  evt.preventDefault();
  if(zoomValue < MAX_ZOOM_VALUE) {
    zoomValue += MIN_ZOOM_VALUE;
    zoomInput.value = `${zoomValue} %`;
    imagePreview.style.transform = `scale(${zoomValue / MAX_ZOOM_VALUE})`;
  }
}

function zoomImageDown(evt) {
  evt.preventDefault();
  if(zoomValue > MIN_ZOOM_VALUE) {
    zoomValue -= MIN_ZOOM_VALUE;
    zoomInput.value = `${zoomValue} %`;
    imagePreview.style.transform = `scale(${zoomValue / MAX_ZOOM_VALUE})`;
  }
}

function zoomImageDrop() {
  zoomValue = MAX_ZOOM_VALUE;
  zoomInput.value = `${zoomValue} %`;
  imagePreview.style.transform = `scale(${zoomValue / MAX_ZOOM_VALUE})`;
}

export {zoomImageUp, zoomImageDown, zoomImageDrop};
