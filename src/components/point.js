import {createElement} from "./utils.js";

const msDay = 86400000;
const msHours = 3600000;
const msMinutes = 60000;
const filtersBusValues = (value, unit) => {
  const filteredValue = value ? `${value}${unit}` : ``;
  return filteredValue;
};

const createOffersMarkup = (offers) => {
  const offersMarkup = offers.slice(0, 2).map((offer) => {
    return (
      `<li class="event__offer">
      <span class="event__offer-title">${offer.service}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
     </li>`);
  }).join(`\n`);
  return offersMarkup;
};

const createTimeDifference = (timeDifference) => {
  const letTime = timeDifference;
  const date = Math.trunc(letTime / msDay);
  const hours = Math.trunc((letTime - date * msDay) / msHours);
  const minutes = Math.trunc((letTime - (date * msDay) - (hours * msHours)) / msMinutes);
  return `${filtersBusValues(date, `D`)} ${filtersBusValues(hours, `H`)} ${filtersBusValues(minutes, `M`)}`;
};

const createPoint = (point) => {
  const {type, city, pretext, offers, startDate, endDate, price, timeDifference} = point;
  const startTime = new Date(startDate).getHours() + `:` + new Date(startDate).getMinutes();
  const endTime = new Date(endDate).getHours() + `:` + new Date(endDate).getMinutes();
  const differenceMarkup = createTimeDifference(timeDifference);
  const offersMarkup = createOffersMarkup(offers);
  const typeLowerCase = type.toLowerCase();
  return (`
  <li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${typeLowerCase}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${pretext} ${city}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T14:30">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T16:05">${endTime}</time>
      </p>
      <p class="event__duration">${differenceMarkup}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersMarkup}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
  `);
};

export default class Point {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createPoint(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
