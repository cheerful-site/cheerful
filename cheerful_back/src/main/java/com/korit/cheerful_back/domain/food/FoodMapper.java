package com.korit.cheerful_back.domain.food;

import com.korit.cheerful_back.domain.foodImg.FoodImg;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FoodMapper {

    // user전용 food
    List<Food> findAllByOptions(FoodSearchOption option);
    Food findByOption(Integer foodId, Integer userId);
    int getCountOfOptions(FoodSearchOption option);

    // admin전용 food
    List<FoodAdminRow> findAllBySearchOption(FoodSearchOption foodSearchOption);
    int getCountOfSearchOption(FoodSearchOption foodSearchOption);

    int update(Food food);
    int deleteFoodImages(@Param("foodId") Integer foodId);
    int insertFoodImages(List<FoodImg> foodImgs);

    int insert(Food food);
    int deleteByFoodIds(List<Integer> foodIds);
}
