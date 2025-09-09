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

export const reqMypageDeleteMemberShip = async () =>
  await api.delete(`/mypage/user`);

export const reqMypageModifyProfileName = async (name) =>
  await api.put(`/mypage/user/name`, null, { params: { name } });

export const reqMypageModifyProfileImage = async (data) =>
  await api.put(`/mypage/user/image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
