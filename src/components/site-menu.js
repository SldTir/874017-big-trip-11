import AbstractComponent from "./abstract-component.js";

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>
  `
  );
};

export const MenuItem = {
  TABLE: `control__table`,
  STATS: `control__stats`,
  NEW_EVENT: `trip-main__event-add-btn`,
};

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
