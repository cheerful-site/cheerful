import api from "../axios/axios";

export const reqMypageCommunityList = async (page, size) =>
  await api.get(`/api/mypage/community`, {
    params: {
      page,
      size,
    },
  });

export const reqMypageComment = async (page, size) =>
  await api.get(`/api/mypage/comment`, {
    params: {
      page,
      size,
    },
  });

export const reqMypageFoodLike = async (page, size) =>
  await api.get(`/api/mypage/food`, {
    params: {
      page,
      size,
    },
  });

export const reqMypageDeleteMemberShip = async () =>
  await api.delete(`/api/mypage/user`);

export const reqMypageModifyProfileName = async (name) =>
  await api.put(`/api/mypage/user/name`, null, { params: { name } });

export const reqMypageModifyProfileImage = async (data) =>
  await api.put(`/api/mypage/user/image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
