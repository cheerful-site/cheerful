package com.korit.cheerful_back.dto.myPage;

import java.time.LocalDateTime;
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
}
