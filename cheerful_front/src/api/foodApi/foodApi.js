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

export const reqFoodRegisterComment = async (data, foodId) =>
  await api.post(`/foods/${foodId}/comments`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqFoodLike = async (foodId) =>
  await api.post(`/foods/${foodId}/like`);

export const reqFoodDislike = async (foodId) =>
  await api.delete(`/foods/${foodId}/dislike`);
