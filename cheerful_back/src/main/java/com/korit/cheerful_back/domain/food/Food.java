package com.korit.cheerful_back.domain.food;

import com.korit.cheerful_back.domain.admin.Admin;
import com.korit.cheerful_back.domain.foodCategory.FoodCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    private Integer foodId;
    private Integer foodCategoryId;
    private Integer adminId;
    private String title;
    private String content;
    private Integer price;
    private LocalDateTime createdAt;

    private Admin admin;
    private FoodCategory foodCategory;
    private List<Food> foodImgs;
}
