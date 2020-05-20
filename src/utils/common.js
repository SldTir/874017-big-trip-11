import moment from "moment";

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

const formatDate = (date) => {
  return moment(date).format(`h:mm`);
};

const filtersBusValues = (value, unit) => {
  const filteredValue = value ? `${value}${unit}` : ``;
  return filteredValue;
};

const dateDifference = (startDate, endDate) => {
  const dateB = moment(endDate);
  const dateC = moment(startDate);
  const daysDifference = dateB.diff(dateC, `days`);
  const hourDifference = Math.floor(dateB.diff(dateC, `hour`) % 24);
  const minuteDifference = Math.floor(dateB.diff(dateC, `minute`) % 60);
  return `${filtersBusValues(daysDifference, `D`)} ${filtersBusValues(hourDifference, `H`)} ${filtersBusValues(minuteDifference, `M`)}`;
};

export {getRandomArrayItem, getRandomNumberFloor, getRandomNumberCeil, getRandomNumberMinMax, formatDate, dateDifference};

