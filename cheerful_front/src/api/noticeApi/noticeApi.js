import api from "../axios/axios";

export const reqNoticeList = async (page, size, categoryId) =>
  api.get(`/notice/${categoryId}`, {
    params: {
      page,
      size,
      categoryId,
    },
  });

export const reqNoticeViews = async (categoryId, noticeId) =>
  await api.post(`/notice/${categoryId}/${noticeId}`);
