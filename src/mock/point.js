import { getRandomArrayItem } from "../components/utils.js";
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


const generatePoint = function () {
  const type = getRandomArrayItem(types);
  return ({
    type,
    city: getRandomArrayItem(citys),
    pretext: choosesPretext(type),
    offers,
  }
  );
};

export {generatePoint };
