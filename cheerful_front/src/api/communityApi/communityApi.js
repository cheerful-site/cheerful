import api from "../axios/axios";

export const reqCommunity = async (category) =>
  await api.get(`/community/${category}`, {
    params: {
      category,
    },
  });

export const reqCommunityList = async (page, size) => {
  return await api.get(`/community`, {
    params: {
      page,
      size,
    },
  });
};

export const reqCommunityRegister = async (data) =>
  await api.post(`/community`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
