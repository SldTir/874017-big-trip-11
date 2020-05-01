import RouteInformationComponent from "./components/route-information.js";
import SiteMenuComponent from "./components/site-menu.js";
import SiteFilterComponent from "./components/site-filter.js";
import SiteSortComponent from "./components/site-sort.js";
import SiteFormComponent from "./components/site-form.js";
import PointComponent from "./components/point.js";
import DayListComponent from "./components/day-list";
import DayInfoComponent from "./components/day-info";
import NoPointsComponent from "./components/no-points";
import {generatePoints} from "./mock/point.js";
import {render, RenderPosition} from "./components/utils";

const COUNT_POINT = 15;

const points = generatePoints(COUNT_POINT).sort((a, b) => a.startDate - b.startDate);
const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMain = siteHeaderElement.querySelector(`.trip-main`);
const siteTropControl = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripControlHeaderMenu = siteTropControl.querySelector(`h2:nth-child(1)`);
const siteTripControlHeaderFilter = siteTropControl.querySelector(`h2:nth-child(2)`);
const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventElement = sitePageMainElement.querySelector(`.trip-events`);

render(siteTripMain, new RouteInformationComponent().getElement(), RenderPosition.AFTERBEGIN);
render(siteTropControl, new SiteMenuComponent().getElement(), RenderPosition.AFTER_END, siteTripControlHeaderMenu);
render(siteTropControl, new SiteFilterComponent().getElement(), RenderPosition.AFTER_END, siteTripControlHeaderFilter);

const renderDateInfo = (day, index) => {
  const dayListElement = document.querySelector(`.trip-days`);
  render(dayListElement, new DayInfoComponent(day, index).getElement(), RenderPosition.BEFOREEND);
};

const renderPoint = (point, index) => {
  const dayListElement = document.querySelectorAll(`.trip-events__list`);

  const replacePointToForm = () => {
    dayListElement[index].replaceChild(pointFormComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    dayListElement[index].replaceChild(pointComponent.getElement(), pointFormComponent.getElement());
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

  render(dayListElement[index], pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTravelMap = () => {
  const isAllPointsArchived = points.every((point) => point.isArchive);

  if (isAllPointsArchived) {
    render(siteTripEventElement, new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(siteTripEventElement, new SiteSortComponent().getElement(), RenderPosition.BEFOREEND);
  render(siteTripEventElement, new DayListComponent().getElement(), RenderPosition.BEFOREEND);

  tripDays.map((day, index) => {
    const tripDayEvents = points.slice().filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    renderDateInfo(day, index);

    tripDayEvents.forEach((point) => {
      renderPoint(point, index);
    });
  });
};

renderTravelMap();
