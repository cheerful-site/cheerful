package com.korit.cheerful_back.domain.community;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommunitySearchOption {
  private Integer startIndex;
  private Integer endIndex;
  private Integer size;
  private Integer userId;
}
