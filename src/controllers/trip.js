import SiteSortComponent from "../components/site-sort.js";
import SiteFormComponent from "../components/site-form.js";
import PointComponent from "../components/point.js";
import DayListComponent from "../components/day-list.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import SiteFilterComponent, {SortType} from "../components/site-filter.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const sitePageMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = document.querySelector(`.page-header`);
const siteTropControl = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripControlHeaderFilter = siteTropControl.querySelector(`h2:nth-child(2)`);

const renderDateInfo = (day, index) => {
  const dayInfoComponent = new DayInfoComponent(day, index);
  return dayInfoComponent;
};
const renderPoint = (tripEventList, point) => {

  const replacePointToForm = () => {
    replace(pointFormComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointFormComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointComponent = new PointComponent(point);
  pointComponent.setClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const pointFormComponent = new SiteFormComponent(point);
  pointFormComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(tripEventList, pointComponent, RenderPosition.BEFOREEND);
};

const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.FUTURE:
      sortedPoints = showingPoints.sort((a, b) => b.startDate - a.startDate);
      break;
    case SortType.PAST:
      sortedPoints = showingPoints.sort((a, b) => a.startDate - b.startDate);
      break;
    case SortType.EVERYTHING:
      sortedPoints = showingPoints;
      break;
  }

  return sortedPoints;
};

const renderPoints = (points) => {
  const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

  tripDays.map((day, index) => {
    const tripDayEvents = points.slice().filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    const dateInfo = renderDateInfo(day, index);
    const tripEventList = dateInfo.getElement().querySelector(`.trip-events__list`);

    tripDayEvents.forEach((point) => {
      renderPoint(tripEventList, point);
    });

    const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

    render(siteTripDays, dateInfo, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._siteSortComponent = new SiteSortComponent();
    this._dayListComponent = new DayListComponent();
    this._siteFilterComponent = new SiteFilterComponent();

  }

  render(points) {
    render(siteTropControl, this._siteFilterComponent, RenderPosition.AFTER_END, siteTripControlHeaderFilter);

    const container = this._container;
    if (points.length === 0) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._siteSortComponent, RenderPosition.BEFOREEND);


    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    renderPoints(points);

    this._siteFilterComponent.setSortTypeChangeHandler((sortType) => {
      const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);
      siteTripDays.innerHTML = ``;
      const sortedPoints = getSortedPoints(points, sortType);

      renderPoints(sortedPoints);
    });
  }
}

