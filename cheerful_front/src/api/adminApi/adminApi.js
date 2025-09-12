import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`/api/auth/login`, data);

////////////////////////USERS//////////////////////////
////////////////////////USERS//////////////////////////
////////////////////////USERS//////////////////////////

export const reqAdminUsers = async (page, size, searchText) =>
  // UserList
  await api.get(`/api/admin/users`, {
    params: { page: page ?? 1, size: size ?? 10, searchText },
  });

export const reqAdminOneDeleteUsers = async (userId) =>
  //단일삭제
  await api.delete(`/api/admin/users/${userId}`);

export const reqAdminAllDeleteUsers = async (userIds) =>
  await api.delete(`/api/admin/users`, { data: userIds });

////////////////////////COMMUNITY//////////////////////////
////////////////////////COMMUNITY//////////////////////////
////////////////////////COMMUNITY//////////////////////////

export const reqAdminCommunity = async (
  page,
  size,
  communityCategoryId,
  searchText
) =>
  await api.get(`/api/admin/communities`, {
    params: {
      page: page ?? 1,
      size: size ?? 10,
      communityCategoryId: communityCategoryId ?? 1,
      searchText,
    },
  });

export const reqAdminOneDeleteCommunity = async (communityId) =>
  await api.delete(`/api/admin/communities/${communityId}`);

export const reqAdminAllDeleteCommunity = async (communityIds) =>
  await api.delete(`/api/admin/communities`, { data: communityIds });

export const reqAdminDeleteCommentCommunity = async (commentId) =>
  await api.delete(`/api/admin/communities/comments/${commentId}`);

////////////////////////FOOD//////////////////////////
////////////////////////FOOD//////////////////////////
////////////////////////FOOD//////////////////////////

export const reqAdminFood = async (page, size, searchText) =>
  await api.get(`/api/admin/foods`, {
    params: { page: page ?? 1, size: size ?? 10, searchText },
  });

export const reqAdminFoodRegister = async (data) =>
  await api.post(`/api/admin/foods`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqAdminFoodModify = async (data) =>
  await api.put(`/api/admin/foods`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqAdminAllDeleteFood = async (foodIds) =>
  await api.delete(`/api/admin/foods`, { data: foodIds });

export const reqAdminFoodCommentDelete = async (commentId) =>
  await api.delete(`/api/admin/foods/comments/${commentId}`);

////////////////////////NOTICE//////////////////////////
////////////////////////NOTICE//////////////////////////
////////////////////////NOTICE//////////////////////////

export const reqAdminNotice = async (
  page,
  size,
  noticeCategoryId,
  searchText
) =>
  await api.get(`/api/admin/notice`, {
    params: { page, size, noticeCategoryId, searchText },
  });

export const reqAdminNoticeRegister = async (data) =>
  await api.post(`/api/admin/notice`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqAdminNoticeModify = async (data) =>
  await api.put(`/api/admin/notice`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqAdminAllDeleteNotice = async (noticeIds) =>
  await api.delete(`/api/admin/notice`, { data: noticeIds });

export const reqAdminNoticeCommentDelete = async (commentId) =>
  await api.delete(`/api/admin/notice/comments/${commentId}`);
