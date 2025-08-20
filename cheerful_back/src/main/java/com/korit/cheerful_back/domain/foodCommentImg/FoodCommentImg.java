package com.korit.cheerful_back.domain.foodCommentImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodCommentImg {
  private Integer foodCommentImgId;
  private Integer foodCommentId;
  private Integer seq;
  private String imgPath;
}
