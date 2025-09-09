package com.korit.cheerful_back.domain.foodComment;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodCommentMapper {
  int insert(FoodComment foodComment);

  List<FoodComment> findAllByFoodId(Integer foodId, Integer userId);

  int getCountByCommentId(Integer foodId);

  // 댓글 및 댓글이미지 삭제
  int adminDeleteByCommentId(Integer commentId);
  List<String> getImagePathsByCommentId(Integer commentId);

  // 등록한 user일 경우 댓글 삭제
  int deleteUserFoodCommentId(Integer commentId, Integer userId);
}
