package com.korit.cheerful_back.dto.food;

import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FoodModifyReqDto {
  private Integer foodId;
  private Integer foodCategoryId;
  private Integer userId;
  private String title;
  private String content;
  private Integer price;
  private List<FoodImg> files;

  public Food toEntity() {
    return Food.builder()
        .foodId(foodId)
        .foodCategoryId(foodCategoryId)
        .userId(userId)
        .title(title)
        .content(content)
        .price(price)
        .foodImgs(files)
        .build();
  }
}
