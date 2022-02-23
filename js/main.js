function randomNumber(min,max) {
  const number = Math.random() * (max - min) + min;
  return number;
}
randomNumber(0, 20);

function checkLegth(maxLegth) {
  let str = true;

  if (maxLegth >= 140) {
    str = false;
  }
  return str;
}
checkLegth(100);
