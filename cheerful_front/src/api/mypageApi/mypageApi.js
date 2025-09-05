import api from "../axios/axios";

export const reqMypageCommunityList = async (page, size) =>
  await api.get(`/mypage/community`, {
    params: {
      page,
      size,
    },
  });
