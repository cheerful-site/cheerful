package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.security.model.PrincipalUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

  @GetMapping("/account/principal")
  public ResponseEntity<ResponseDto<?>> principal(@AuthenticationPrincipal PrincipalUser principalUser) {
    System.out.println(principalUser);
    return ResponseEntity.ok(ResponseDto.success(principalUser));
  }
}
