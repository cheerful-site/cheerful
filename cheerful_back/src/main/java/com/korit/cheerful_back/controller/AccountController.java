package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.security.model.PrincipalUser;
import com.korit.cheerful_back.service.UserService;
import com.korit.cheerful_back.util.ImageUrlUtil;
import java.util.LinkedHashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

  private final ImageUrlUtil imageUrlUtil;
  private final UserService userService;

  /*
    현재 로그인한 사용자의 PrincipalUser 반환
   */
  @GetMapping("/api/account/principal")
  public ResponseEntity<ResponseDto<?>> principal(@AuthenticationPrincipal(errorOnInvalidType = false) PrincipalUser principalUser) {
//    System.out.println(principalUser.getUser());

    Map<String, Object> body = new LinkedHashMap<>();

    if(principalUser == null) {
      body.put("authenticated", false);
      body.put("user", null);
      body.put("myStatus", null);
      return ResponseEntity.ok(ResponseDto.success(body));
    }
    User user = principalUser.getUser();
//    user.setProfileImgUrl(imageUrlUtil.profile(user.getProfileImgPath()));
//
//    String role = principalUser.getAuthorities().stream()
//        .findFirst().map(GrantedAuthority::getAuthority).orElse(null);
//
//    body.put("authenticated", true);
//    body.put("user", user);

    Map<String, Object> userView = new LinkedHashMap<>();
    userView.put("userId", user.getUserId());
    userView.put("username", user.getUsername());
    userView.put("name", user.getName());
    userView.put("email", user.getEmail());
    userView.put("role", user.getRole());
    userView.put("profileImgUrl", imageUrlUtil.profile(user.getProfileImgPath()));
    userView.put("provider", user.getProvider());
    userView.put("providerId", user.getProviderId());

    body.put("authenticated", true);
    body.put("user", userView);
    body.put("myStatus", userService.getMyWriteStatus());

    return ResponseEntity.ok(ResponseDto.success(body));

  }

}
