package com.korit.cheerful_back.domain.foodCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodCategory {
    private Integer foodCategoryId;
    private String foodCategoryName;
}
