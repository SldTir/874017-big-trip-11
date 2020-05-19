import AbstractSmartComponent from "./abstract-smart-component.js";
import {choosesPretext, generateRanodmArray, offersArray, generateRandomDescription, generateRanodmImagas} from "../mock/point.js";

const createImages = (images) => {
  return images.join(`\n`);
};

const createDescriptions = (descriptions) => {
  return descriptions.join(` `);
};

const createOffer = (offer, isChecked) => {
  const {service, price, value} = offer;
  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${value}-1" type="checkbox" name="event-offer-${value}" ${isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${value}-1">
      <span class="event__offer-title">${service}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
    </div>`
  );
};

const formateDate = (date) => {
  const day = date.getDate().toString().padStart(2, `0`);
  const month = (date.getMonth() + 1).toString().padStart(2, `0`);
  const year = String(date.getFullYear()).slice(2);
  const hours = date.getHours().toString().padStart(2, `0`);
  const minutes = date.getMinutes().toString().padStart(2, `0`);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const createSiteForm = (point, options) => {
  const {startDate, endDate, price, favorite} = point;
  const {type, city, pretext, offers, descriptions, images} = options;
  const offersMarkup = offers.map((offer, index) => createOffer(offer, index <= 1)).join(`\n`);
  const descriptionMarkup = createDescriptions(descriptions);
  const imagesMarkup = createImages(images);
  const startDateMarkup = formateDate(new Date(startDate));
  const endDateMarkup = formateDate(new Date(endDate));
  const typeLowerCase = type.toLowerCase();
  const isCityFlag = city ? `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${descriptionMarkup}</p>

  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${imagesMarkup}
    </div>
  </div>
</section>` : ``;
  const isFavorite = favorite ? `checked` : ``;
  return (
    `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${typeLowerCase}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type} ${pretext}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="${city}"></option>
        <option value="Chamonix"></option>
        <option value="Saint Petersburg"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateMarkup}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateMarkup}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>
   ${isCityFlag}
  </section>`
  );
};
const createSiteFormTemplate = (point, options) => {

  const siteForm = createSiteForm(point, options);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
    ${siteForm}
  </form>`
  );
};

export default class SiteForm extends AbstractSmartComponent {
  constructor(point) {
    super();
    this._point = point;
    this._element = null;

    this._submitHandler = null;
    this._clickFavoriteHandler = null;
    this._type = point.type;
    this.getTemplate = this.getTemplate.bind(this);
    this._city = point.city;
    this._pretext = point.pretext;
    this._offers = point.offers;
    this._descriptions = point.descriptions;
    this._images = point.images;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createSiteFormTemplate(this._point, {type: this._type, city: this._city, pretext: this._pretext, offers: this._offers, descriptions: this._descriptions, images: this._images});
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._clickFavoriteHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._clickFavoriteHandler = handler;
  }
  _subscribeOnEvents() {
    const elemetList = this.getElement().querySelectorAll(`.event__type-input`);
    elemetList.forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        const elementInputValueUpperCase = `${evt.target.value[0].toUpperCase()}${evt.target.value.slice(1)}`;
        this._type = elementInputValueUpperCase;
        this._pretext = choosesPretext(elementInputValueUpperCase);
        this._offers = generateRanodmArray(offersArray);
        this.rerender();
      });
    });

    const inputDestination = this.getElement().querySelector(`.event__input--destination`);
    inputDestination.addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._descriptions = generateRandomDescription();
      this._images = generateRanodmImagas();
      this.rerender();
    });
  }
}
