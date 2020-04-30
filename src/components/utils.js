const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER_END: `afterEnd`,
};


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomNumberFloor = (length) => {
  return Math.floor(Math.random() * length);
};

const getRandomNumberCeil = (length) => {
  return Math.ceil(Math.random() * length);
};

const getRandomNumberMinMax = (min, max) => {
  return Math.ceil(Math.random() * (max - min)) + min;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place, relativeLocation) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTER_END:
      container.insertBefore(element, relativeLocation.nextSibling);
      break;
  }
};

export {getRandomArrayItem, getRandomNumberFloor, getRandomNumberCeil, getRandomNumberMinMax, createElement, RenderPosition, render};
