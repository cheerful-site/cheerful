package com.korit.cheerful_back.dto.community;

import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import lombok.Data;

@Data
public class CommunitySearchReqDto {
  private Integer page;
  private Integer size;
  private String searchText;

  public CommunitySearchOption toOption() {
    return CommunitySearchOption.builder()
        .startIndex((page - 1) * size)
        .size(size)
        .searchText(searchText)
        .build();
  }
}
