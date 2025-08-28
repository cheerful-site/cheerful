import api from "../axios/axios";

export const reqBestCommunity = () => api.get(`/bestcommunity`);

export const reqBestFood = () => api.get(`/bestfood`);
