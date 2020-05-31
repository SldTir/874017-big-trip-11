import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../const.js";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createSiteFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label data-sort-type="${FilterType.EVERYTHING}" class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label data-sort-type="${FilterType.FUTURE}" class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label data-sort-type="${FilterType.PAST}" class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `
  );
};

export default class SiteFilter extends AbstractComponent {
  constructor() {
    super();

    this._currenFilterType = FilterType.EVERYTHING;
  }

  getTemplate() {
    return createSiteFilterTemplate();
  }

  getSortType() {
    return this._currenFilterType;
  }

  setFilterChangeHandler(handler) {
    const filterInputs = this.getElement().querySelectorAll(`.trip-filters__filter-input`);
    filterInputs.forEach((input) => {
      input.addEventListener(`click`, (evt) => {
        const filterName = getFilterNameById(evt.target.id);
        const filterNameUppercase = filterName[0].toUpperCase() + filterName.slice(1);
        const inputEvent = document.querySelector(`#sort-event`);
        inputEvent.checked = true;
        handler(filterNameUppercase);
      });
    });
  }
}
