import api from "../axios/axios";

export const reqMapList = (lat, lng, radius, categoryId) =>
  api.get(`/api/map/${categoryId}`, {
    params: {
      lat,
      lng,
      radius,
      categoryId,
    },
  });
