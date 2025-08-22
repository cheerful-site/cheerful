import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`/auth/login`, data);

export const reqAdminUsers = async (page, size, searchText) =>
  await api.get(`/admin/users`, { params: { page, size, searchText } });

export const reqAdminOneDeleteUsers = async (userId) =>
  await api.delete(`/admin/users/${userId}`);

export const reqAdminCommunity = async (page, size, categoryId, searchText) =>
  await api.get(`/admin/communities/${categoryId}`, {
    params: { page, size, categoryId, searchText },
  });

export const reqAdminOneDeleteCommunity = async (communityId) =>
  await api.delete(`/admin/communities/${communityId}`);

export const reqAdminFood = async (page, size, searchText) =>
  await api.get(`/admin/foods`, {
    params: { page, size, searchText },
  });

export const reqAdminNotice = async (page, size, categoryId, searchText) =>
  await api.get(`/admin/notice/${categoryId}`, {
    params: { page, size, categoryId, searchText },
  });
