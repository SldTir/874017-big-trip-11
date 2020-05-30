import SiteSortComponent, { SortType } from "../components/site-sort.js";
import DayListComponent from "../components/day-list.js";
import PointComponent from "../components/point.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import PointController, { Mode as PointControllerMode, EmptyTask } from "../controllers/point";
import { render, RenderPosition } from "../utils/render.js";

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
      pointController.render(point, PointControllerMode.DEFAULT);
      ControllersArray.push(pointController);
    });
    render(siteTripDays, dateInfo, RenderPosition.BEFOREEND);
  });
  return ControllersArray;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    console.log(this._container);
    this._pointsModel = pointsModel;

    this._showedPointControllers = [];
    this._noPointsComponent = new NoPointsComponent();
    this._siteSortComponent = new SiteSortComponent();
    this._dayListComponent = new DayListComponent();
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._siteSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const points = this._pointsModel.getPoints();
    if (points.length === 0) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._siteSortComponent, RenderPosition.BEFOREEND);

    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    this._renderDays(points);
  }

  createPoint() {
    if (this._createPoint) {
      return;
    }
    const siteTripEvents = this._container;
    this._creatingPoint = new PointController(siteTripEvents, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyTask, PointControllerMode.ADDING);
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    const abc = this._container.querySelector(`.trip-days`);
    abc.innerHTML = ``;
    this._showedPointControllers = [];
  }

  _renderDays(points) {
    const newDays = renderDays(points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newDays);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const ControllersSortArray = [];
    const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

    siteTripDays.innerHTML = ``;
    const sortedPoints = getSortedPoints(this._pointsModel.getPoints(), sortType);
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
      const newDays = renderDays(this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
      this._showedPointControllers = newDays;
    }
  }

  _updatePoints() {
    this._removePoints();
    this._renderDays(this._pointsModel.getPoints());
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyTask) {
      this._creatingPoint = null;
      if (newData === EmptyTask) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
        this._showedPointControllers = this._showedPointControllers.length;
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
