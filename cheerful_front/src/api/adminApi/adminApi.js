import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`/auth/login`, data);

////////////////////////USERS//////////////////////////
////////////////////////USERS//////////////////////////
////////////////////////USERS//////////////////////////
export const reqAdminUsers = async (page, size, searchText) =>
  // UserList
  await api.get(`/admin/users`, { params: { page, size, searchText } });

export const reqAdminOneDeleteUsers = async (userId) =>
  //단일삭제
  await api.delete(`/admin/users/${userId}`);

export const reqAdminAllDeleteUsers = async (userIds) =>
  await api.delete(`/admin/users`, { data: userIds });

////////////////////////COMMUNITY//////////////////////////
////////////////////////COMMUNITY//////////////////////////
////////////////////////COMMUNITY//////////////////////////
export const reqAdminCommunity = async (page, size, categoryId, searchText) =>
  await api.get(`/admin/communities/${categoryId}`, {
    params: { page, size, categoryId, searchText },
  });

export const reqAdminOneDeleteCommunity = async (communityId) =>
  await api.delete(`/admin/communities/${communityId}`);

export const reqAdminAllDeleteCommunity = async (communityIds) =>
  await api.delete(`/admin/communities`, { data: communityIds });

////////////////////////FOOD//////////////////////////
////////////////////////FOOD//////////////////////////
////////////////////////FOOD//////////////////////////
export const reqAdminFood = async (page, size, searchText) =>
  await api.get(`/admin/foods`, {
    params: { page, size, searchText },
  });

export const reqAdminFoodRegister = async (data) =>
  await api.post(`admin/foods`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqAdminAllDeleteFood = async (foodIds) =>
  await api.delete(`/admin/foods`, { data: foodIds });

////////////////////////NOTICE//////////////////////////
////////////////////////NOTICE//////////////////////////
////////////////////////NOTICE//////////////////////////
export const reqAdminNotice = async (page, size, categoryId, searchText) =>
  await api.get(`/admin/notice/${categoryId}`, {
    params: { page, size, categoryId, searchText },
  });

export const reqAdminAllDeleteNotice = async (noticeIds) =>
  await api.delete(`/admin/notice`, { data: noticeIds });
