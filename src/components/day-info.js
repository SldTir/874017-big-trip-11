import {createElement} from "./utils.js";

const createDayInfo = (point, index) => {
  const {day, daysEventsMarkup} = point;

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    <span class="day__counter">${index + 1}</span>
    <time class="day__date" datetime="2019-03-18">${day.split(` `)[1]} ${day.split(` `)[2]}</time>
    </div>
    <ul class="trip-events__list">
    ${daysEventsMarkup}
    </ul>
    </li>`
  );
};

export default class DayInfo {
  constructor(point, index) {
    this._point = point;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayInfo(this._point, this._index);
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
