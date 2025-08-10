package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  /*
    관리자 전용 사용자 관리 API
    사용자 삭제

   */
  @DeleteMapping("/users")
  public ResponseEntity<ResponseDto<?>> deleteUserIds(@RequestParam List<Integer> userIds) {
    userService.delete(userIds);
    return ResponseEntity.ok(ResponseDto.success("회원 정보를 삭제하였습니다."));
  }
}
