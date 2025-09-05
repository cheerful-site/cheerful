import api from "../axios/axios";

export const reqMypageCommunityList = async (page, size) =>
  await api.get(`/mypage/community`, {
    params: {
      page,
      size,
    },
  });

export const reqMypageComment = async (page, size) =>
  await api.get(`/mypage/comment`, {
    params: {
      page,
      size,
    },
  });

export const reqMypageFoodLike = async (page, size) =>
  await api.get(`/mypage/food`, {
    params: {
      page,
      size,
    },
  });
