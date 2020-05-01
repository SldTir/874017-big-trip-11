import RouteInformationComponent from "./components/route-information.js";
import SiteMenuComponent from "./components/site-menu.js";
import SiteFilterComponent from "./components/site-filter.js";
import SiteSortComponent from "./components/site-sort.js";
import SiteFormComponent from "./components/site-form.js";
import PointComponent from "./components/point.js";
import DayListComponent from "./components/day-list";
import DayInfoComponent from "./components/day-info";
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

  const onPointClick = () => {
    dayListElement[index].replaceChild(pointFormComponent.getElement(), pointComponent.getElement());
  };

  const onPoinFormSubmit = (evt) => {
    evt.preventDefault();
    dayListElement[index].replaceChild(pointComponent.getElement(), pointFormComponent.getElement());
  };

  const pointComponent = new PointComponent(point);
  const editPoint = pointComponent.getElement().querySelector(`.event__rollup-btn`);
  editPoint.addEventListener(`click`, onPointClick);

  const pointFormComponent = new SiteFormComponent(point);
  const editFormPoint = pointFormComponent.getElement();
  editFormPoint.addEventListener(`submit`, onPoinFormSubmit);

  render(dayListElement[index], pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTravelMap = () => {
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
