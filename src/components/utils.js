const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomNumber = (length) => {
  return Math.ceil(Math.random() * length);
};

export {getRandomArrayItem, getRandomNumber};
