import AbstractComponent from "./abstract-component.js";

const checkDay = (day) => {
  if (day) {
    const dayText = `${day.split(` `)[1]} ${day.split(` `)[2]}`;
    return dayText;
  }
  return ``;
};

const checkIndex = (index) => {
  if (index === false) {
    return ``;
  }
  const indexText = `${index + 1}`;
  return indexText;
};

const createDayInfo = (day = false, index = false) => {
  const timeText = checkDay(day);
  const indexText = checkIndex(index);
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    <span class="day__counter">${indexText}</span>
    <time class="day__date" datetime="2019-03-18">${timeText}</time>
    </div>
    <ul class="trip-events__list">
    </ul>
    </li>`
  );
};

export default class DayInfo extends AbstractComponent {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayInfo(this._day, this._index);
  }
}
