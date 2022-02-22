function smth(min,max) {
  const number = Math.random() * (max - min) + min;
  return number;
}
smth(0, 20);



function checkLegth() {
  const str = true;
  const maxLegth = 100;

  if (maxLegth >= 140) {
    str = false
  }
  return str
}
