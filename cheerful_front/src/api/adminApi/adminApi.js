import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`/admin/login`, data);

export const reqAdminUsers = async (page, size, searchText) =>
  await api.get(`/admin/manager/users`, { params: { page, size, searchText } });
