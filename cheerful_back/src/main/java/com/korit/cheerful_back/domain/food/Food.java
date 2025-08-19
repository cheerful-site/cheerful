package com.korit.cheerful_back.domain.food;

import com.korit.cheerful_back.domain.foodCategory.FoodCategory;
import com.korit.cheerful_back.domain.foodComment.FoodComment;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.domain.user.User;
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
    private Integer userId;
    private String title;
    private String content;
    private Integer price;
    private LocalDateTime createdAt;
    private Integer isLike;
    private Integer likeCount;
    private Integer commentCount;

    private User user;
    private FoodCategory foodCategory;
    private List<FoodImg> foodImgs;
    private List<FoodComment> foodComments;
}
