import api from "../axios/axios";

export const reqNoticeList = async (page, size, categoryId) =>
  api.get(`/notice`, {
    params: {
      page,
      size,
      categoryId,
    },
  });
