package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.security.model.PrincipalUser;
import com.korit.cheerful_back.util.ImageUrlUtil;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

  private final ImageUrlUtil imageUrlUtil;

  /*
    현재 로그인한 사용자의 PrincipalUser 반환
   */
  @GetMapping("/account/principal")
  public ResponseEntity<ResponseDto<?>> principal(@AuthenticationPrincipal PrincipalUser principalUser) {
//    System.out.println(principalUser.getUser());
    User user = principalUser.getUser();

    user.setProfileImgUrl(imageUrlUtil.profile(user.getProfileImgPath()));

    var body = Map.of(
        "user", user,
        "role", principalUser.getAuthorities().iterator().next().getAuthority()
    );

    return ResponseEntity.ok(ResponseDto.success(body));

  }
}
