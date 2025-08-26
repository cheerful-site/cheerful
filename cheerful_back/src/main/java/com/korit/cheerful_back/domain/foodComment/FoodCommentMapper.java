package com.korit.cheerful_back.domain.foodComment;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodCommentMapper {
  int insert(FoodComment foodComment);

  List<FoodComment> findAllByFoodId(Integer foodId, Integer userId);

  int getCountByCommentId(Integer foodId);
}
