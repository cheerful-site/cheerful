import api from "../axios/axios";

export const reqFoodList = async (sort, page, size) =>
  api.get(`/api/foods`, {
    params: {
      sort,
      page,
      size,
    },
  });

export const reqFoodDetail = async (foodId) =>
  await api.get(`/api/foods/${foodId}`);

export const reqFoodRegisterComment = async (data, foodId) =>
  await api.post(`/api/foods/${foodId}/comments`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqFoodLike = async (foodId) =>
  await api.post(`/api/foods/${foodId}/like`);

export const reqFoodDislike = async (foodId) =>
  await api.delete(`/api/foods/${foodId}/dislike`);

export const reqFoodCommentLike = (foodId, foodCommentId) =>
  api.post(`/api/foods/${foodId}/${foodCommentId}/like`);

export const reqFoodCommentDislike = (foodId, foodCommentId) =>
  api.delete(`/api/foods/${foodId}/${foodCommentId}/dislike`);

export const reqUserDeleteFoodComment = (commentId, userId) =>
  api.delete(`/api/foods/comments/${commentId}/${userId}`);
