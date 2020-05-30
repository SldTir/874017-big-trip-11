import AbstractComponent from "./abstract-component.js";

const buttonAddEvent = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class ButtonAddEvent extends AbstractComponent {
  getTemplate() {
    return buttonAddEvent();
  }

  setActiveItem(menuItem) {
  const item = this.getElement();

    if (item) {
      item.disabled = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const menuItem = evt.target;
      handler(menuItem);
    });
  }
}
