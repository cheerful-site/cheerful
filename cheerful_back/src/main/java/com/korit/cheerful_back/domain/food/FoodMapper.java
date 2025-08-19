package com.korit.cheerful_back.domain.food;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FoodMapper {
    int insert(Food food);

    // user전용 food
    List<Food> findAllByOptions(FoodSearchOption option);
    int getCountOfOptions(FoodSearchOption option);

    // admin전용 food
    List<Food> findAllBySearchOption(FoodSearchOption foodSearchOption);
    int getCountOfSearchOption(FoodSearchOption foodSearchOption);
    int deleteByFoodIds(List<Integer> foodIds);
}
