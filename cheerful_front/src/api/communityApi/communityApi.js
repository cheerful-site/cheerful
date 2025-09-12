import api from "../axios/axios";

export const reqCommunityList = async (sort, page, size, categoryId) => {
  return await api.get(`/api/communities/${categoryId}`, {
    params: {
      sort,
      page,
      size,
      categoryId,
    },
  });
};

export const reqCommunityRegister = async (data) =>
  await api.post(`/api/communities`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqCommunityDetail = async (categoryId, communityId) =>
  await api.get(`/api/communities/${categoryId}/${communityId}`);

export const reqCommunityViews = async (categoryId, communityId) =>
  await api.post(`/api/communities/${categoryId}/${communityId}`);

export const reqCommunityRegisterComments = async (data) =>
  await api.post(`/api/communities/${data.communityId}/comments`, data);

export const reqCommunityLike = async (communityId) =>
  await api.post(`/api/communities/${communityId}/like`);

export const reqCommunitydisLike = async (communityId) =>
  await api.delete(`/api/communities/${communityId}/dislike`);

export const reqUserDeleteCommunityPost = async (communityId, userId) =>
  await api.delete(`/api/communities/${communityId}/${userId}`);

export const reqUserDeleteCommunityComment = async (communityId, userId) =>
  await api.delete(`/api/communities/comments/${communityId}/${userId}`);
