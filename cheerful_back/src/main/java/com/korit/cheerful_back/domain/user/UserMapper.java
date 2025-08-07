package com.korit.cheerful_back.domain.user;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
  int insert(User user);
  User findById(@Param("userId") Integer userId);
  User findByUserName(@Param("username") String username);
  int deleteByUserIds(List<Integer> userIds);
}
