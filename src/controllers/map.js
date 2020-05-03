import SiteSortComponent from "../components/site-sort.js";
import SiteFormComponent from "../components/site-form.js";
import PointComponent from "../components/point.js";
import DayListComponent from "../components/day-list.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import {render, replace, RenderPosition} from "../utils/render.js";

const sitePageMainElement = document.querySelector(`.page-main`);

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

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._siteSortComponent = new SiteSortComponent();
    this._dayListComponent = new DayListComponent();

  }

  render(points) {
    const container = this._container;
    if (points.length === 0) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._siteSortComponent, RenderPosition.BEFOREEND);

    const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

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
  }
}
