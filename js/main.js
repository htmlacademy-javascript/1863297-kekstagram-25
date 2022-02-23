function randomNumber(min,max) {
  const number = Math.random() * (max - min) + min;
  return number;
}
randomNumber(0, 20);

function checkLegth(str, maxLegth) {
  let check = true;
  if (str.length > maxLegth) {
    check = false;
  }
  return check;
}
checkLegth(100, 140);
