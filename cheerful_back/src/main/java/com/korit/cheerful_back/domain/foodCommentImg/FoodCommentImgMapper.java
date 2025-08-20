package com.korit.cheerful_back.domain.foodCommentImg;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodCommentImgMapper {
  int insertMany(List<FoodCommentImg> foodImgs);
}
