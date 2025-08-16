import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`/admin/login`, data);

export const reqAdminUsers = async () => await api.get(`/admin/manager/users`);
