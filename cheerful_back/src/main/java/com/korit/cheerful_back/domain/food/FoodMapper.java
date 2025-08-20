package com.korit.cheerful_back.domain.food;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FoodMapper {

    // user전용 food
    List<Food> findAllByOptions(FoodSearchOption option);
    Food findByOption(Integer foodId);
    int getCountOfOptions(FoodSearchOption option);

    // admin전용 food
    List<FoodAdminRow> findAllBySearchOption(FoodSearchOption foodSearchOption);
    int getCountOfSearchOption(FoodSearchOption foodSearchOption);

    int insert(Food food);
    int update(Food food);
    int deleteByFoodIds(List<Integer> foodIds);
}
