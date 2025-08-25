package com.korit.cheerful_back.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileImgDto {

  private Integer userId;
  private String username;
  private String name;
  private String profileImgUrl;
}
