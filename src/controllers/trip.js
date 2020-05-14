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

const renderDays = (points) => {
  const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

  const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

  tripDays.map((day, index) => {
    let tripDayEvents = points.slice().filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    const dateInfo = renderDateInfo(day, index);
    const tripEventList = dateInfo.getElement().querySelector(`.trip-events__list`);

    tripDayEvents.forEach((point) => {
      const pointController = new PointController(tripEventList);
      pointController.render(point);
      return pointController;
    });

    render(siteTripDays, dateInfo, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._noPointsComponent = new NoPointsComponent();
    this._siteSortComponent = new SiteSortComponent();
    this._dayListComponent = new DayListComponent();
    this._siteFilterComponent = new SiteFilterComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._siteSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
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

    renderDays(this._points);
  }

  _onSortTypeChange(sortType) {
    const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

    siteTripDays.innerHTML = ``;
    const sortedPoints = getSortedPoints(this._points, sortType);
    if (sortType !== SortType.EVENT) {
      const dayInfo = new DayInfoComponent();
      render(siteTripDays, dayInfo, RenderPosition.BEFOREEND);

      const tripEventListSort = dayInfo.getElement().querySelector(`.trip-events__list`);

      sortedPoints.forEach((point) => {
        const pointController = new PointController(tripEventListSort);
        pointController.render(point);
        return pointController;
      });
    } else {
      renderDays(this._points);
    }
  }
}


// this._siteSortComponent.setSortTypeChangeHandler((sortType) => {
//   const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

//   siteTripDays.innerHTML = ``;
//   const sortedPoints = getSortedPoints(points, sortType);
//   if (sortType !== SortType.EVENT) {
//     const dayInfo = new DayInfoComponent();
//     render(siteTripDays, dayInfo, RenderPosition.BEFOREEND);

//     const tripEventListSort = dayInfo.getElement().querySelector(`.trip-events__list`);

//     sortedPoints.forEach((point) => {
//       renderPoint(tripEventListSort, point);
//     });
//   } else {
//     renderDays(points);
//   }
// });
