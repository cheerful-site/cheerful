package com.korit.cheerful_back.domain.food;

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
}
