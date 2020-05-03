import RouteInformationComponent from "./components/route-information.js";
import SiteMenuComponent from "./components/site-menu.js";
import SiteFilterComponent from "./components/site-filter.js";
import MapController from "./controllers/map.js";
import {generatePoints} from "./mock/point.js";
import {render, RenderPosition} from "./utils/render.js";

const COUNT_POINT = 15;

const points = generatePoints(COUNT_POINT).sort((a, b) => a.startDate - b.startDate);


const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventElement = sitePageMainElement.querySelector(`.trip-events`);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMain = siteHeaderElement.querySelector(`.trip-main`);
const siteTropControl = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripControlHeaderMenu = siteTropControl.querySelector(`h2:nth-child(1)`);
const siteTripControlHeaderFilter = siteTropControl.querySelector(`h2:nth-child(2)`);

render(siteTripMain, new RouteInformationComponent(), RenderPosition.AFTERBEGIN);
render(siteTropControl, new SiteMenuComponent(), RenderPosition.AFTER_END, siteTripControlHeaderMenu);
render(siteTropControl, new SiteFilterComponent(), RenderPosition.AFTER_END, siteTripControlHeaderFilter);

const mapController = new MapController(siteTripEventElement);
mapController.render(points);
