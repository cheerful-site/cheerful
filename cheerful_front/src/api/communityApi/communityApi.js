import api from "../axios/axios";

export const reqCommunity = async (category) =>
  await api.get(`/community/${category}`, {
    params: {
      category,
    },
  });

export const reqCommunityList = async (page, size, categoryId) => {
  return await api.get(`/community${categoryId}`, {
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
