import api from "../axios/axios";

export const reqFoodList = async (page, size) =>
  api.get(`/foods`, {
    params: {
      page,
      size,
    },
  });

export const reqFoodDetail = async (foodId) =>
  await api.get(`/foods/${foodId}`);
