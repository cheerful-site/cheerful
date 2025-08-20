package com.korit.cheerful_back.domain.foodComment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FoodCommentLikeMapper {
  int insert(@Param("foodCommentId") Integer foodCommentId, @Param("userId") Integer userId);
  int delete(@Param("foodCommentId") Integer foodCommentId, @Param("userId") Integer userId);
  int getLikeCount(@Param("foodCommentId") Integer foodCommentId);
}
