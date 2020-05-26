import PointComponent from "../components/point.js";
import SiteFormComponent from "../components/site-form.js";
import { render, replace, remove, RenderPosition } from "../utils/render.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  FORM: `form`,
};

export const EmptyTask = {
  city: ``,
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
    this._mode = mode;
    this._pointComponent = new PointComponent(point);
    this._siteFormComponent = new SiteFormComponent(point);

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

    if (oldPointComponent && oldFormComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._siteFormComponent, oldFormComponent);
      this._replaceFormToPoint();
    } else {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    }

    switch (mode) {
      case Mode.DEFAULT:
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
        render(this._container, this._siteFormComponent, RenderPosition.AFTERBEGIN);
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
