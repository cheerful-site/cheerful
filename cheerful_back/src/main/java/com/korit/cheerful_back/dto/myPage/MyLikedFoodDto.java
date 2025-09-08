package com.korit.cheerful_back.dto.myPage;

import com.korit.cheerful_back.domain.foodImg.FoodImg;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class MyLikedFoodDto {
  private Integer foodId;
  private String categoryName;
  private String title;
  private Integer price;
  private String address;
  private LocalDateTime createdAt;
  private Integer likeCount;
  private Boolean isLike;
  private String imgPath;
  private String imgUrl;

  private List<FoodImg> foodImgs;
}
