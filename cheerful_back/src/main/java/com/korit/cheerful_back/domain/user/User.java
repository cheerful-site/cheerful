package com.korit.cheerful_back.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
  public Integer userId;
  public String username;
  public String password;
  public String name;
  public String email;
  public String profileImgPath;
  public String role;
  public String provider;
  public String providerId;
  public LocalDateTime createdAt;
}
