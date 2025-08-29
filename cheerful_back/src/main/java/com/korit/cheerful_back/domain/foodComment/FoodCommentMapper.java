package com.korit.cheerful_back.domain.foodComment;

import java.util.List;

import com.korit.cheerful_back.domain.foodCommentImg.FoodCommentImg;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodCommentMapper {
  int insert(FoodComment foodComment);

  List<FoodComment> findAllByFoodId(Integer foodId, Integer userId);

  int getCountByCommentId(Integer foodId);

  // 댓글 및 댓글이미지 삭제
  int adminDeleteByCommentId(Integer commentId);
  List<String> getImagePathsByCommentId(Integer commentId);

}
