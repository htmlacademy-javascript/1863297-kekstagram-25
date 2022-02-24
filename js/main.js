function randomNumber(min,max) {
  if (max <= min) {
    throw('Ошибка');
  }
  if (min <= 0 || max <= 0) {
    throw('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
}
randomNumber(1, 30);

function checkLegth(str, maxLegth) {
  let check = true;
  if (str.length > maxLegth) {
    check = false;
  }
  return check;
}
checkLegth(100, 140);
