import PointComponent from "../components/point.js";
import SiteFormComponent from "../components/site-form.js";
import { render, replace, remove, RenderPosition } from "../utils/render.js";
import { offersArray } from "../mock/point.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  FORM: `form`,
};

export const EmptyTask = {
  id: String(new Date() + Math.random()),
  type: `Flight`,
  city: `Geneva`,
  pretext: `to`,
  offers: offersArray,
  descriptions: [
    `Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva).`,
    `Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`
  ],
  images: [
    `<img class="event__photo" src="img/photos/1.jpg" alt="Event photo">`,
    `<img class="event__photo" src="img/photos/2.jpg" alt="Event photo">`,
    `<img class="event__photo" src="img/photos/3.jpg" alt="Event photo">`,
    `<img class="event__photo" src="img/photos/4.jpg" alt="Event photo">`,
    `<img class="event__photo" src="img/photos/5.jpg" alt="Event photo">`,
  ],
  startDate: new Date(),
  endDate: new Date(),
  price: ` `,
  timeDifference: ` `,
  favorite: ``,
};
export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._pointComponent = null;
    this._siteFormComponent = null;
  }

  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldFormComponent = this._siteFormComponent;
    this._pointComponent = new PointComponent(point);
    if (mode) {
      this._mode = mode;
    }
    this._siteFormComponent = new SiteFormComponent(point, this._mode);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._pointComponent.setClickHandler(() => {
      this._replacePointToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._siteFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._siteFormComponent.getData();
      this._onDataChange(this, point, data);
    });
    this._siteFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, point, null));

    this._siteFormComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        favorite: !point.favorite,
      }));
    });

    switch (this._mode) {
      case Mode.DEFAULT:
        if (oldFormComponent && oldPointComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._siteFormComponent, oldFormComponent);
          this._replacePointToForm();
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.FORM:
        if (oldFormComponent && oldPointComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._siteFormComponent, oldFormComponent);
          this._replaceFormToPoint();
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldFormComponent && oldPointComponent) {
          remove(oldPointComponent);
          remove(oldFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        const tripEventsSort = this._container.querySelector(`.trip-events__trip-sort`);
        render(this._container, this._siteFormComponent, RenderPosition.AFTER_END, tripEventsSort);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._siteFormComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replacePointToForm() {
    this._onViewChange();
    replace(this._siteFormComponent, this._pointComponent);
    this._mode = Mode.FORM;
  }

  _replaceFormToPoint() {
    if (document.contains(this._siteFormComponent.getElement())) {
      replace(this._pointComponent, this._siteFormComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
