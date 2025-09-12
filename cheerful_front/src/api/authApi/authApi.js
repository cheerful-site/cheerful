import api from "../axios/axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");
