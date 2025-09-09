import api from "../axios/axios";

export const reqSearchCommunity = async (page, size, searchText, categoryId) =>
  await api.get(`/search/communities/${categoryId}`, {
    params: {
      page,
      size,
      searchText,
    },
  });

export const reqSearchFood = async (page, size, searchText) =>
  await api.get(`/search/foods`, {
    params: {
      page,
      size,
      searchText,
    },
  });
