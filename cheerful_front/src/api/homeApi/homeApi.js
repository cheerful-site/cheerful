import api from "../axios/axios";

export const reqBestCommunity = () => api.get(`/api/bestcommunity`);

export const reqBestFood = () => api.get(`/api/bestfood`);
