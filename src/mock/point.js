import {getRandomArrayItem} from "../components/utils.js";
const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
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

const generatePoint = () => {
  return ({
    type: getRandomArrayItem(types),
    city: getRandomArrayItem(citys),
    offers,
  }
  );
};

export { generatePoint };
