package com.korit.cheerful_back.domain.food;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FoodLikeMapper {
  int insert(@Param("foodId") Integer foodId, @Param("userId") Integer userId);
  int delete(@Param("foodId") Integer foodId, @Param("userId") Integer userId);
  int getLikeCount(@Param("foodId") Integer foodId);
}
