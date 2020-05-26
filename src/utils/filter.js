import {FilterType} from "../const.js";

const nowDate = new Date().getTime();

export const getFuturePoints = (points) => {
  return points.filter((point) => point.startDate > nowDate);
};

export const getPastPoints = (points) => {
  return points.filter((point) => point.startDate < nowDate);
};


export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFuturePoints(points);
    case FilterType.PAST:
      return getPastPoints(points);
  }
  return points;
};
