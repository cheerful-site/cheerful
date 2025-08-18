package com.korit.cheerful_back.util;

import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminGeneration implements CommandLineRunner {

  private final AdminService adminService;
  private final UserMapper userMapper;

  @Override
  public void run(String... args) throws Exception {
    User user = User.builder()
        .username("admin1")
        .password("1q2w3e4r!")
        .name("관리자1")
        .email("admin1@gmail.com")
        .profileImg("default.jpg")
        .role("ROLE_ADMIN")
        .build();
    if(userMapper.findByUsername(user.getUsername()) == null) {
      adminService.join(user);
    }
  }
}
