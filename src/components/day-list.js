import AbstractComponent from "./abstract-component.js";

const dayList = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayList extends AbstractComponent {
  getTemplate() {
    return dayList();
  }
}
