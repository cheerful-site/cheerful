import api from "../axios/axios";

export const reqPrincipal = async () => await api.get("/account/principal");

export const reqPrincipalAdmin = async () => await api.get("/admin/principal");
