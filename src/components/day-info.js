import {createElement} from "./utils.js";

const createDayInfo = (day, index) => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    <span class="day__counter">${index + 1}</span>
    <time class="day__date" datetime="2019-03-18">${day.split(` `)[1]} ${day.split(` `)[2]}</time>
    </div>
    <ul class="trip-events__list">
    </ul>
    </li>`
  );
};

export default class DayInfo {
  constructor(day, index) {
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayInfo(this._day, this._index);
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
