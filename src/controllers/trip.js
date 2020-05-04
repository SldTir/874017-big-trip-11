import SiteSortComponent, {SortType} from "../components/site-sort.js";
import SiteFormComponent from "../components/site-form.js";
import PointComponent from "../components/point.js";
import DayListComponent from "../components/day-list.js";
import NoPointsComponent from "../components/no-points";
import DayInfoComponent from "../components/day-info";
import SiteFilterComponent from "../components/site-filter.js";
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

const renderDays = (container, points, component) => {
  render(container, component, RenderPosition.BEFOREEND);

  const tripDays = [...new Set(points.slice().map((element) => new Date(element.startDate).toDateString()))];

  const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

  tripDays.map((day, index) => {
    let tripDayEvents = points.slice().filter((point) => {
      return new Date(point.startDate).toDateString() === day;
    });

    const dateInfo = renderDateInfo(day, index);
    const tripEventList = dateInfo.getElement().querySelector(`.trip-events__list`);

    tripDayEvents.forEach((point) => {
      renderPoint(tripEventList, point);
    });

    render(siteTripDays, dateInfo, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._siteSortComponent = new SiteSortComponent();
    this._dayListComponent = new DayListComponent();
    this._siteFilterComponent = new SiteFilterComponent();

  }

  render(points) {
    const container = this._container;
    if (points.length === 0) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._siteSortComponent, RenderPosition.BEFOREEND);

    renderDays(container, points, this._dayListComponent);

    this._siteSortComponent.setSortTypeChangeHandler((sortType) => {
      const siteTripDays = sitePageMainElement.querySelector(`.trip-days`);

      siteTripDays.innerHTML = ``;
      const sortedPoints = getSortedPoints(points, sortType);
      if (sortType !== SortType.EVENT) {
        const dayInfo = new DayInfoComponent();
        render(siteTripDays, dayInfo, RenderPosition.BEFOREEND);

        const tripEventListSort = document.querySelector(`.trip-events__list`);

        sortedPoints.forEach((point) => {
          renderPoint(tripEventListSort, point);
        });
      } else {
        renderDays(container, points, this._dayListComponent);
      }
    });
  }
}
