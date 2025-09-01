import api from "../axios/axios";

export const reqNoticeList = (page, size, categoryId) =>
  api.get(`/notice/${categoryId}`, {
    params: {
      page,
      size,
      categoryId,
    },
  });

export const reqNoticeDetail = (categoryId, noticeId) =>
  api.get(`/notice/${categoryId}/${noticeId}`);

export const reqNoticeViews = (categoryId, noticeId) =>
  api.post(`/notice/${categoryId}/${noticeId}`);

export const reqNoticeRegisterComment = (data, noticeId) =>
  api.post(`/notice/${noticeId}/comments`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqNoticeLike = (noticeId) => api.post(`/notice/${noticeId}/like`);

export const reqNoticeDislike = (noticeId) =>
  api.delete(`/notice/${noticeId}/dislike`);

export const reqUserDeleteNoticeComment = (commentId, userId) =>
  api.delete(`/notice/comments/${commentId}/${userId}`);
