import {getRandomArrayItem, getRandomNumberFloor, getRandomNumberCeil, getRandomNumberMinMax, getRandomBoolean} from "../utils/common.js";

const NUMBER_OFFERS = 5;
const COMPENSATOR = 1;
const NUMBER_IMAGE = 5;
const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const citys = [`Almaty`, `Bandung`, `Havana`, `Astana`, `Bucharest`, `Jerusalem`, `Gwangju`, `Liverpool`, `Mexico`, `Osaka`];
const offersArray = [{
  service: `Add luggage`,
  price: `30`,
  value: `luggage`,
  isChecked: getRandomBoolean(),
}, {
  service: `Switch to comfort class`,
  price: `100`,
  value: `comfort`,
  isChecked: getRandomBoolean(),
}, {
  service: `Add meal`,
  price: `15`,
  value: `meal`,
  isChecked: getRandomBoolean(),
}, {
  service: `Choose seats`,
  price: `5`,
  value: `seats`,
  isChecked: getRandomBoolean(),
}, {
  service: `Travel by train`,
  price: `40`,
  value: `train`,
  isChecked: getRandomBoolean(),
}];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const choosesPretext = function (element) {
  switch (element) {
    case `Sightseeing`:
      return `in`;
    case `Restaurant`:
      return `in`;
    case `Check-in`:
      return `in`;
    default:
      return `to`;
  }
};

const generateRandomDescription = () => {
  const randomDescriptions = [];
  for (let index = 0; index <= getRandomNumberFloor(NUMBER_OFFERS); index++) {
    let description = getRandomArrayItem(descriptions);
    if (!randomDescriptions.includes(description)) {
      randomDescriptions.push(description);
    } else {
      index = index - COMPENSATOR;
    }
  }
  return randomDescriptions;
};

const generateRanodmImagas = () => {
  const images = [];
  for (let index = 0; index <= getRandomNumberFloor(NUMBER_IMAGE); index++) {
    let randomNumber = getRandomNumberCeil(NUMBER_IMAGE);
    let image = `<img class="event__photo" src="img/photos/${randomNumber}.jpg" alt="Event photo">`;
    if (!images.includes(image)) {
      images.push(image);
    } else {
      index = index - COMPENSATOR;
    }
  }
  return images;
};

const generateRanodmArray = (array) => {
  const randomArray = [];
  for (let index = 0; index <= getRandomNumberFloor(array.length); index++) {
    let randomElement = getRandomArrayItem(array);
    if (!randomArray.includes(randomElement)) {
      randomArray.push(randomElement);
    } else {
      index = index - COMPENSATOR;
    }
  }
  return randomArray;
};

const generateRandomDate = () => {
  const dueDate = new Date();
  const randomSign = Math.random() > 0.5 ? -1 : 1;
  const diff = randomSign * getRandomNumberMinMax(0, 5);
  dueDate.setDate(dueDate.getDate() + diff);
  dueDate.setHours(getRandomNumberMinMax(0, 24));
  dueDate.setMinutes(getRandomNumberMinMax(0, 60));
  return dueDate;
};

const difference = (startDate, endDate) => {
  const differenceTime = endDate - startDate;
  return differenceTime;
};

const generatePoint = function () {
  const dateOne = generateRandomDate().getTime();
  const dateTwo = generateRandomDate().getTime();
  const startDate = Math.min(dateOne, dateTwo);
  const endDate = Math.max(dateOne, dateTwo);

  const type = getRandomArrayItem(types);
  return ({
    id: String(new Date() + Math.random()),
    type,
    city: getRandomArrayItem(citys),
    pretext: choosesPretext(type),
    offers: generateRanodmArray(offersArray),
    descriptions: generateRandomDescription(),
    images: generateRanodmImagas(),
    startDate,
    endDate,
    price: getRandomNumberMinMax(100, 1000),
    timeDifference: difference(startDate, endDate),
    favorite: false,
  }
  );
};

const generatePoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generatePoint);
};

export {generatePoints, choosesPretext, generateRanodmArray, offersArray, generateRandomDescription, generateRanodmImagas};
