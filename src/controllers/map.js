import SiteSortComponent from "../components/site-sort.js";
import SiteFormComponent from "../components/site-form.js";
import PointComponent from "../components/point.js";
import DayListComponent from "../components/day-info.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import { render, replace, RenderPosition } from "../utils/render.js";

const renderDateInfo = (container, day, index) => {
  render(container, new DayInfoComponent(day, index), RenderPosition.BEFOREEND);
};

const renderPoint = (point, index) => {
  const dayListElement = document.querySelectorAll(`.trip-events__list`);

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
  const editPoint = pointComponent.getElement().querySelector(`.event__rollup-btn`);
  editPoint.addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const pointFormComponent = new SiteFormComponent(point);
  const editFormPoint = pointFormComponent.getElement();
  editFormPoint.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(dayListElement[index], pointComponent, RenderPosition.BEFOREEND);
};

const renderTravelMap = (container, points) => {

  if (points.length === 0) {
    render(container, new NoPointsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(container, new SiteSortComponent(), RenderPosition.BEFOREEND);

  const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

  tripDays.map((day, index) => {
    const tripDayEvents = points.slice().filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    renderDateInfo(container, day, index);

    tripDayEvents.forEach((point) => {
      renderPoint(point, index);
    });
  });
  render(container, new DayListComponent(), RenderPosition.BEFOREEND);
};

export default class MapController {
  constructor(container) {
    this._container = container;
  }

  render(points) {
    renderTravelMap(this._container, points);
  }
}
