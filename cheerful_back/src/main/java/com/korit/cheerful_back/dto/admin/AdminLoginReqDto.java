package com.korit.cheerful_back.dto.admin;

import lombok.Data;

@Data
public class AdminLoginReqDto {
  private String username;
  private String password;
}
