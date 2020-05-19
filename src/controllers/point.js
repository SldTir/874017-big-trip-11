import PointComponent from "../components/point.js";
import SiteFormComponent from "../components/site-form.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  FORM: `form`,
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

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldFormComponent = this._siteFormComponent;
    this._pointComponent = new PointComponent(point);
    this._siteFormComponent = new SiteFormComponent(point);

    this._pointComponent.setClickHandler(() => {
      this._replacePointToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._siteFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceFormToPoint();
    });

    this._siteFormComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        favorite: !point.favorite,
      }));
    });

    if (oldPointComponent && oldFormComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._siteFormComponent, oldFormComponent);
    } else {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    this._onViewChange();
    replace(this._siteFormComponent, this._pointComponent);
    this._mode = Mode.FORM;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._siteFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
