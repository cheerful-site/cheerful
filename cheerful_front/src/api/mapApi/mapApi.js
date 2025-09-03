import api from "../axios/axios";

export const reqMapList = (lat, lng, radius, categoryId) =>
  api.get(`/map/${categoryId}`, {
    params: {
      lat,
      lng,
      radius,
      categoryId,
    },
  });
