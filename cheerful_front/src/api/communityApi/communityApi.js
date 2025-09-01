import api from "../axios/axios";

export const reqCommunityList = async (page, size, categoryId) => {
  return await api.get(`/communities/${categoryId}`, {
    params: {
      page,
      size,
      categoryId,
    },
  });
};

export const reqCommunityRegister = async (data) =>
  await api.post(`/communities`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqCommunityDetail = async (categoryId, communityId) =>
  await api.get(`/communities/${categoryId}/${communityId}`);

export const reqCommunityViews = async (categoryId, communityId) =>
  await api.post(`/communities/${categoryId}/${communityId}`);

export const reqCommunityRegisterComments = async (data) =>
  await api.post(`/communities/${data.communityId}/comments`, data);

export const reqCommunityLike = async (communityId) =>
  await api.post(`/communities/${communityId}/like`);

export const reqCommunitydisLike = async (communityId) =>
  await api.delete(`/communities/${communityId}/dislike`);

export const reqUserDeleteCommunityPost = async (communityId, userId) =>
  await api.delete(`communities/comments/${communityId}/${userId}`);

export const reqUserDeleteCommunityComment = async (communityId, userId) =>
  await api.delete(`communities/comments/${communityId}/${userId}`);
