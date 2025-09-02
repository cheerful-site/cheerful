import api from "../axios/axios";

export const reqMapList = (lat, lng, radius, categoryId) =>
  api.get(`/map-info/search`, {
    params: {
      lat,
      lng,
      radius,
      categoryId,
    },
  });
