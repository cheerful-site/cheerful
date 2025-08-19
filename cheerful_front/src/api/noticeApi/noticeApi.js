import api from "../axios/axios";

export const reqNoticeList = async (page, size, categoryId) =>
  api.get(`/notice${categoryId}`, {
    params: {
      page,
      size,
      categoryId,
    },
  });
