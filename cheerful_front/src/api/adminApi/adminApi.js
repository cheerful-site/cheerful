import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`/auth/login`, data);

export const reqAdminUsers = async (page, size, searchText) =>
  await api.get(`/admin/manager/users`, { params: { page, size, searchText } });

export const reqAdminCommunity = async (page, size, categoryId, searchText) =>
  await api.get(`/admin/manager/community/${categoryId}`, {
    params: { page, size, categoryId, searchText },
  });

export const reqAdminFood = async (page, size, searchText) =>
  await api.get(`/admin/manager/food`, {
    params: { page, size, searchText },
  });
