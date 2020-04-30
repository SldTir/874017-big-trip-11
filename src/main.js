import RouteInformationComponent from "./components/route-information.js";
import SiteMenuComponent from "./components/site-menu.js";
import SiteFilterComponent from "./components/site-filter.js";
import SiteSortComponent from "./components/site-sort.js";
import SiteFormComponent from "./components/site-form.js";
import PointComponent from "./components/point.js";
import DayListComponent from "./components/day-list";
import DayInfoComponent from "./components/day-info";
import { generatePoints } from "./mock/point.js";
import { render, RenderPosition } from "./components/utils";

const COUNT_POINT = 15;

const points = generatePoints(COUNT_POINT).sort((a, b) => a.startDate - b.startDate);
const tripDays = [...new Set(points.slice(1).map((element) => new Date(element.startDate).toDateString()))];

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

// const renderPoint = (point) => {
//   const dayListElement = document.querySelector(`.trip-days`);
//   render(dayListElement, new PointComponent(point).getElement(), RenderPosition.AFTERBEGIN);
// };

const renderDateInfo = (day, index) => {
  const dayListElement = document.querySelector(`.trip-days`);
  render(dayListElement, new DayInfoComponent(day, index).getElement(), RenderPosition.BEFOREEND);
};

const renderTravelMap = (arrays) => {
  render(siteTripEventElement, new SiteSortComponent().getElement(), RenderPosition.BEFOREEND);
  render(siteTripEventElement, new SiteFormComponent(arrays.slice(0, 1)).getElement(), RenderPosition.BEFOREEND);
  render(siteTripEventElement, new DayListComponent().getElement(), RenderPosition.BEFOREEND);

  tripDays.map((day, index) => {
    const tripDayEvents = points.slice(1).filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    renderDateInfo(day, index);

    // tripDayEvents.map((element) => {
    //   return renderPoint(element);
    // });

    // render(dayListElement, createDayInfo(day, index, daysEventsMarkup), `beforeEnd`);
  });

};

renderTravelMap(points);

// tripDays.map((day, index) => {
//   const tripDayEvents = points.slice(1).filter((point) => {
//     return new Date(point.startDate).toDateString() === day;
//   });
//   const daysEventsMarkup = tripDayEvents.map((element) => {
//     return createPoint(element);
//   }).join(`\n`);
//   render(dayListElement, createDayInfo(day, index, daysEventsMarkup), `beforeEnd`);
// });
