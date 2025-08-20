package com.korit.cheerful_back.domain.food;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodAdminRow {
  private Integer foodId;
  private Integer foodCategoryId;
  private Integer userId;
  private String title;
  private String content;
  private Integer price;
  private LocalDateTime createdAt;
  private String foodCategoryName;
  private String username;
  private String name;
  private String imgPaths;
}
