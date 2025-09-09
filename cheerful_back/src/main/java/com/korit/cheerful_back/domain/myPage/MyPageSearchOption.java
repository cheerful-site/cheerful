package com.korit.cheerful_back.domain.myPage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyPageSearchOption {
  private Integer userId;
  private Integer startIndex;
  private Integer endIndex;
  private Integer size;
  private Integer categoryId;
}
