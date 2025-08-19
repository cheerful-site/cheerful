package com.korit.cheerful_back.dto.food;

import lombok.Data;

@Data
public class FoodsCommentRegisterReqDto {
  private Integer foodId;
  private String content;
  private String imgPath;
}
