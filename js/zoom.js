const MIN_ZOOM_VALUE = 25;
const MAX_ZOOM_VALUE = 100;
const zoomInput = document.querySelector('.scale__control--value');
let zoomValue = Number(zoomInput.value.slice(0, -1)); //отрежет проценты %
const imagePreview = document.querySelector('.img-upload__preview');

function onZoomImageUpClick(evt) {
  evt.preventDefault();
  if(zoomValue < MAX_ZOOM_VALUE) {
    zoomValue += MIN_ZOOM_VALUE;
    zoomInput.value = `${zoomValue} %`;
    imagePreview.style.transform = `scale(${zoomValue / MAX_ZOOM_VALUE})`;
  }
}

function onZoomImageDownClick(evt) {
  evt.preventDefault();
  if(zoomValue > MIN_ZOOM_VALUE) {
    zoomValue -= MIN_ZOOM_VALUE;
    zoomInput.value = `${zoomValue} %`;
    imagePreview.style.transform = `scale(${zoomValue / MAX_ZOOM_VALUE})`;
  }
}

function onZoomImageDropClick() {
  zoomValue = MAX_ZOOM_VALUE;
  zoomInput.value = `${zoomValue} %`;
  imagePreview.style.transform = `scale(${zoomValue / MAX_ZOOM_VALUE})`;
}

export {onZoomImageUpClick, onZoomImageDownClick, onZoomImageDropClick};
