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
  const filteredValue = value > 0 ? `${value}${unit}` : ``;
  return filteredValue;
};

const dateDifference = (startDate, endDate) => {
  const daysDifference = moment.duration(endDate - startDate).days().toString().padStart(2, `0`);
  const hourDifference = moment.duration(endDate - startDate).hours().toString().padStart(2, `0`);
  const minuteDifference = moment.duration(endDate - startDate).minutes().toString().padStart(2, `0`);

  return `${filtersBusValues(daysDifference, `D`)} ${filtersBusValues(hourDifference, `H`)} ${filtersBusValues(minuteDifference, `M`)}`;
};

const convertsDateMilliseconds = (date) => {
  const dateMilliseconds = moment(date, `DD/MM/YY HH:mm`).valueOf();
  return dateMilliseconds;
};

const getRandomBoolean = () => {
  return (Math.floor(Math.random() * 2) === 0);
};

export {getRandomArrayItem, getRandomNumberFloor, getRandomNumberCeil, getRandomNumberMinMax, formatDate, dateDifference, convertsDateMilliseconds, getRandomBoolean};

