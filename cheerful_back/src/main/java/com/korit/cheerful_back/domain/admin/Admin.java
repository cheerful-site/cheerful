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
  public Integer adminId;
  public String adminName;
  @JsonIgnore
  public String email;
  public String profileImgPath;
  public String role;
  public String providerId;
  public String provider;
}
