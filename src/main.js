import {createRouteInformationTemplate} from "./components/route-information.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSiteFilterTemplate} from "./components/site-filter.js";
import {createSiteSortTemplate} from "./components/site-sort.js";
import {createSiteFormTemplate} from "./components/site-form.js";
import {createPointTemplate} from "./components/point.js";
import {generatePoint} from "./mock/point.js";

const point = generatePoint();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMain = siteHeaderElement.querySelector(`.trip-main`);
const siteTropControl = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripControlHeaderMenu = siteTropControl.querySelector(`h2:nth-child(1)`);
const siteTripControlHeaderFilter = siteTropControl.querySelector(`h2:nth-child(2)`);
const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventElement = sitePageMainElement.querySelector(`.trip-events`);

render(siteTripMain, createRouteInformationTemplate(), `afterBegin`);
render(siteTripControlHeaderMenu, createSiteMenuTemplate(), `afterEnd`);
render(siteTripControlHeaderFilter, createSiteFilterTemplate(), `afterEnd`);
render(siteTripEventElement, createSiteSortTemplate(), `beforeEnd`);
render(siteTripEventElement, createSiteFormTemplate(point), `beforeEnd`);
render(siteTripEventElement, createPointTemplate(), `beforeEnd`);
