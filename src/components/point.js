import AbstractComponent from "./abstract-component.js";
import {formatDate, dateDifference} from "../utils/common.js";

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

const createPoint = (point, options) => {
  const {type, city, pretext, offers, price} = point;
  const {startDate, endDate} = options;
  const startTime = formatDate(startDate);
  const endTime = formatDate(endDate);
  const differenceMarkup = dateDifference(startDate, endDate);
  const offersMarkup = createOffersMarkup(offers);
  const typeLowerCase = type.toLowerCase();
  return (
    `<li class="trip-events__item">
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
</li>`);
};

export default class Point extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
    this._element = null;
    this._startDate = point.startDate;
    this._endDate = point.endDate;
  }

  getTemplate() {
    return createPoint(this._point, {startDate: this._startDate, endDate: this._endDate});
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
