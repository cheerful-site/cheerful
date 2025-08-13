package com.korit.cheerful_back.domain.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
  private Integer adminId;
  private String adminName;
  private String adminLoginId;
  @JsonIgnore
  private String password;
  private String profileImgPath;
  private String role;
}
