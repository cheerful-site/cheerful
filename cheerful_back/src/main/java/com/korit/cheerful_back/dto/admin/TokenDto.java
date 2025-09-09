package com.korit.cheerful_back.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenDto {
  private String accessToken;
  private String refreshToken;
}
