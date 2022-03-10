function getRandomNumber(min,max) {
  if (max <= min) {
    throw('Ошибка');
  }
  if (min <= 0 || max <= 0) {
    throw('Ошибка');
  }
  return Math.round(Math.random() * (max - min) + min);
}

function checkLegth (str, maxLegth) {
  return str.length > maxLegth;
}

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {getRandomNumber, checkLegth, getRandomPositiveInteger};
