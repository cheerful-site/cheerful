import api from "../axios/axios";

export const reqCommunity = async (category) =>
  await api.get(`/community/${category}`, {
    params: {
      category,
    },
  });

export const reqCommunityList = async (page, size) => {
  await api.get(`/community`, {
    params: {
      page,
      size,
    },
  });
};
