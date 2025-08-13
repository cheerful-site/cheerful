import api from "../axios/axios";

export const reqAdminLogin = async (data) =>
  await api.post(`admin/login`, data);
