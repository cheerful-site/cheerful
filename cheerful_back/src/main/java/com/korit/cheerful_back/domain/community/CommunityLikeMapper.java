package com.korit.cheerful_back.domain.community;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommunityLikeMapper {
  int insert(@Param("communityId") Integer communityId, @Param("userId") Integer userId);
  int delete(@Param("communityId") Integer communityId, @Param("userId") Integer userId);
  int getLikeCount(@Param("communityId") Integer communityId);
}
