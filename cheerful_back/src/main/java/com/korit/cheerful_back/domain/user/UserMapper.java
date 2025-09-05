package com.korit.cheerful_back.domain.user;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
  int insert(User user);
  User findById(@Param("userId") Integer userId);
  User findByProviderId(@Param("providerId") String providerId);

  List<User> findAllBySearchOption(UserSearchOption option);
  int getCountOfOptions(UserSearchOption option);
  int deleteByUserId(Integer userId);
  int deleteByUserIds(List<Integer> userIds);

  User findByUsername(String username);

  // 회원삭제
  int deleteByUser(Integer userId);

  // 프로필 수정
  int updateName(Integer userId, String name);
  String getProfileImgPath(Integer userId);
  int updateProfileImgPath(Integer userId, @Param("profileImg") String profileImgPath);
}
