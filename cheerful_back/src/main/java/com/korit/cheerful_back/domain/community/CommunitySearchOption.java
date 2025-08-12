package com.korit.cheerful_back.domain.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunitySearchOption {
  private Integer startIndex;
  private Integer endIndex;
  private Integer size;
  private Integer userId;
  private String searchText;
}
