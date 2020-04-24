import {getRandomArrayItem, getRandomNumberFloor, getRandomNumberCeil, getRandomNumberMinMax} from "../components/utils.js";

const NUMBER_OFFERS = 5;
const COMPENSATOR = 1;
const NUMBER_IMAGE = 5;
const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const citys = [`Almaty`, `Bandung`, `Havana`, `Astana`, `Bucharest`, `Jerusalem`, `Gwangju`, `Liverpool`, `Mexico`, `Osaka`];
const offers = [{
  service: `Add luggage`,
  price: `30`,
  value: `luggage`,
}, {
  service: `Switch to comfort class`,
  price: `100`,
  value: `comfort`,
}, {
  service: `Add meal`,
  price: `15`,
  value: `meal`,

}, {
  service: `Choose seats`,
  price: `5`,
  value: `seats`,
}, {
  service: `Travel by train`,
  price: `40`,
  value: `train`,
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

const generateRandomDate = () => {
  const dueDate = new Date();
  const randomSign = Math.random() > 0.5 ? -1 : 1;
  const diff = randomSign * getRandomNumberMinMax(0, 10);
  dueDate.setDate(dueDate.getDate() + diff);
  dueDate.setHours(getRandomNumberMinMax(0, 24));
  dueDate.setMinutes(getRandomNumberMinMax(0, 60));
  // const randomDay = dueDate.getDate().toString().padStart(2, `0`);
  // const randomMonth = dueDate.getMonth().toString().padStart(2, `0`);
  // const randomYear = Array.from(String(dueDate.getFullYear()), String).slice(2).join(``);
  // const randomDate = randomDay + `/` + randomMonth + `/` + randomYear;
  return dueDate;
};

const generatePoint = function () {
  const dateOne = generateRandomDate();
  const dateTwo = generateRandomDate();
  const type = getRandomArrayItem(types);
  return ({
    type,
    city: getRandomArrayItem(citys),
    pretext: choosesPretext(type),
    offers,
    descriptions: generateRandomDescription(),
    images: generateRanodmImagas(),
    startDate: Math.min(dateOne.getTime(), dateTwo.getTime()),
    endDate: Math.max(dateOne.getTime(), dateTwo.getTime()),
    price: getRandomNumberMinMax(100, 1000),
  }
  );
};

const generatePoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generatePoint);
};

export {generatePoints};
