import api from "../axios/axios";

export const reqNoticeList = (page, size, categoryId) =>
  api.get(`/api/notice/${categoryId}`, {
    params: {
      page,
      size,
      categoryId,
    },
  });

export const reqNoticeDetail = (categoryId, noticeId) =>
  api.get(`/api/notice/${categoryId}/${noticeId}`);

export const reqNoticeViews = (categoryId, noticeId) =>
  api.post(`/api/notice/${categoryId}/${noticeId}`);

export const reqNoticeRegisterComment = (data, noticeId) =>
  api.post(`/api/notice/${noticeId}/comments`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqNoticeLike = (noticeId) => api.post(`/notice/${noticeId}/like`);

export const reqNoticeDislike = (noticeId) =>
  api.delete(`/api/notice/${noticeId}/dislike`);

export const reqUserDeleteNoticeComment = (commentId, userId) =>
  api.delete(`/api/notice/comments/${commentId}/${userId}`);
