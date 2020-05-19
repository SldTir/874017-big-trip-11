import RouteInformationComponent from "./components/route-information.js";
import SiteMenuComponent from "./components/site-menu.js";
import TripController from "./controllers/trip.js";
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

render(siteTripMain, new RouteInformationComponent(), RenderPosition.AFTERBEGIN);
render(siteTropControl, new SiteMenuComponent(), RenderPosition.AFTER_END, siteTripControlHeaderMenu);

const mapController = new TripController(siteTripEventElement);
mapController.render(points);

