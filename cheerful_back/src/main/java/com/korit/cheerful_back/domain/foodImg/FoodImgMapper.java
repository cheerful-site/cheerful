package com.korit.cheerful_back.domain.foodImg;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodImgMapper {
  int insert(FoodImg foodImg);
  int insertMany(List<FoodImg> foodImgs);
}
