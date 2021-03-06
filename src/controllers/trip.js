import SiteSortComponent, {SortType} from "../components/site-sort.js";
import DayListComponent from "../components/day-list.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import SiteFilterComponent from "../components/site-filter.js";
import PointController from "../controllers/point";
import {render, RenderPosition} from "../utils/render.js";

const sitePageMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = document.querySelector(`.page-header`);
const siteTropControl = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripControlHeaderFilter = siteTropControl.querySelector(`h2:nth-child(2)`);


const renderDateInfo = (day, index) => {
  const dayInfoComponent = new DayInfoComponent(day, index);
  return dayInfoComponent;
};


const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedPoints = showingPoints.sort((a, b) => b.timeDifference - a.timeDifference);
      break;
    case SortType.PRICE:
      sortedPoints = showingPoints.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVERYTHING:
      sortedPoints = showingPoints;
      break;
  }

  return sortedPoints;
};

const renderDays = (points, onDataChange, onViewChange) => {
  const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

  const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);
  const ControllersArray = [];

  tripDays.map((day, index) => {
    let tripDayEvents = points.slice().filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    const dateInfo = renderDateInfo(day, index);
    const tripEventList = dateInfo.getElement().querySelector(`.trip-events__list`);

    tripDayEvents.forEach((point) => {
      const pointController = new PointController(tripEventList, onDataChange, onViewChange);
      pointController.render(point);
      ControllersArray.push(pointController);
    });
    render(siteTripDays, dateInfo, RenderPosition.BEFOREEND);
  });
  return ControllersArray;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._showedPointControllers = [];
    this._noPointsComponent = new NoPointsComponent();
    this._siteSortComponent = new SiteSortComponent();
    this._dayListComponent = new DayListComponent();
    this._siteFilterComponent = new SiteFilterComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._siteSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(points) {
    this._points = points;
    const container = this._container;
    if (this._points.length === 0) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(siteTropControl, this._siteFilterComponent, RenderPosition.AFTER_END, siteTripControlHeaderFilter);

    render(container, this._siteSortComponent, RenderPosition.BEFOREEND);

    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    const newDays = renderDays(this._points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newDays);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const ControllersSortArray = [];
    const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

    siteTripDays.innerHTML = ``;
    const sortedPoints = getSortedPoints(this._points, sortType);
    if (sortType !== SortType.EVENT) {
      const dayInfo = new DayInfoComponent();
      render(siteTripDays, dayInfo, RenderPosition.BEFOREEND);

      const tripEventListSort = dayInfo.getElement().querySelector(`.trip-events__list`);

      sortedPoints.forEach((point) => {
        const pointController = new PointController(tripEventListSort, this._onDataChange, this._onViewChange);
        pointController.render(point);
        ControllersSortArray.push(pointController);
      });
      this._showedPointControllers = ControllersSortArray;
    } else {
      const newDays = renderDays(this._points, this._onDataChange, this._onViewChange);
      this._showedPointControllers = newDays;
    }
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }
}
