import PointComponent from "../components/point.js";
import SiteFormComponent from "../components/site-form.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class PointController {
  constructor(container) {
    this._container = container;

    this._pointComponent = null;
    this._siteFormComponent = null;
  }

  render(point) {
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

    render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replace(this._siteFormComponent, this._pointComponent);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._siteFormComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

// const renderPoint = (tripEventList, point) => {

//   const replacePointToForm = () => {
//     replace(pointFormComponent, pointComponent);
//   };

//   const replaceFormToPoint = () => {
//     replace(pointComponent, pointFormComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//     if (isEscKey) {
//       replaceFormToPoint();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   const pointComponent = new PointComponent(point);
//   pointComponent.setClickHandler(() => {
//     replacePointToForm();
//   });

//   const pointFormComponent = new SiteFormComponent(point);
//   pointFormComponent.setSubmitHandler((evt) => {
//     evt.preventDefault();
//     replaceFormToPoint();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });


//   render(tripEventList, pointComponent, RenderPosition.BEFOREEND);
// };
