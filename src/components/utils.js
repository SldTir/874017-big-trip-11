const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomNumberFloor = (length) => {
  return Math.floor(Math.random() * length);
};

const getRandomNumberCeil = (length) => {
  return Math.ceil(Math.random() * length);
};

const getRandomNumberMinMax = (min, max) => {
  return Math.ceil(Math.random() * (max - min)) + min;
};

export {getRandomArrayItem, getRandomNumberFloor, getRandomNumberCeil, getRandomNumberMinMax};
