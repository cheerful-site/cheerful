package com.korit.cheerful_back.domain.foodComment;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodCommentMapper {
  int insert(FoodComment foodComment);

  FoodComment findAllByFoodId(Integer foodId);

  int getCountByCommentId(Integer foodId);
}
