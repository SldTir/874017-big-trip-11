import RouteInformationComponent from "./components/route-information.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter.js";
import ButtonAddEventController from "./components/add-event.js";
import {generatePoints} from "./mock/point.js";
import {render, RenderPosition} from "./utils/render.js";

const COUNT_POINT = 15;

const points = generatePoints(COUNT_POINT).sort((a, b) => a.startDate - b.startDate);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);


const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventElement = sitePageMainElement.querySelector(`.trip-events`);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMain = siteHeaderElement.querySelector(`.trip-main`);
const siteTropControl = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripControlHeaderMenu = siteTropControl.querySelector(`h2:nth-child(1)`);
const siteTripControl = siteHeaderElement.querySelector(`.trip-controls`);


const filterController = new FilterController(siteTripControl, pointsModel);
filterController.render();
render(siteTripMain, new RouteInformationComponent(), RenderPosition.AFTERBEGIN);

const siteMenuComponent = new SiteMenuComponent();
render(siteTropControl, siteMenuComponent, RenderPosition.AFTER_END, siteTripControlHeaderMenu);

const buttonAddEventComponent = new ButtonAddEventController();
render(siteTripMain, buttonAddEventComponent, RenderPosition.BEFOREEND);

const mapController = new TripController(siteTripEventElement, pointsModel);
mapController.render(points);

buttonAddEventComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.POINTS);
      mapController.createTask();
      break;
  }
});
