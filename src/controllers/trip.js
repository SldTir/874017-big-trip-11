import SiteSortComponent, {SortType} from "../components/site-sort.js";
import DayListComponent from "../components/day-list.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import PointController, {Mode as PointControllerMode, EmptyTask} from "../controllers/point";
import {render, RenderPosition} from "../utils/render.js";

const sitePageMainElement = document.querySelector(`.page-main`);

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
    const addFormBtn = document.querySelector(`.trip-main__event-add-btn`);
    if (oldData === EmptyTask) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
        addFormBtn.disabled = false;
      } else {
        this._pointsModel.addPoint(newData);
        const updatedPoints = this._pointsModel.getPointsAll().sort((a, b) => a.startDate - b.startDate);
        this._removePoints();
        const newDays = renderDays(updatedPoints, this._onViewChange, this._onDataChange);
        this._showedPointControllers = [].concat(newDays);
        const tripEvents = document.querySelector(`.trip-events`);
        const newform = tripEvents.querySelector(`.trip-events__item`);
        newform.innerHTML = ``;
        addFormBtn.disabled = false;
        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
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
