import api from "../axios/axios";

export const reqCommunity = async (category) =>
  await api.get(`/community/${category}`, {
    params: {
      category,
    },
  });
