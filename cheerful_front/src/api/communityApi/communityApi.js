import api from "../axios/axios";

export const reqCommunityList = async (page, size, categoryId) => {
  return await api.get(`/community/${categoryId}`, {
    params: {
      page,
      size,
      categoryId,
    },
  });
};

export const reqCommunityRegister = async (data) =>
  await api.post(`/community`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqCommunityDetail = async (categoryId, communityId) =>
  await api.get(`/community/${categoryId}/${communityId}`);


export const reqCommunityViews = async (categoryId, communityId) =>
  await api.post(`/community/${categoryId}/${communityId}`);
