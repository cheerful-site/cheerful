//package com.korit.cheerful_back.controller;
//
//import com.korit.cheerful_back.domain.user.User;
//import com.korit.cheerful_back.domain.user.UserSearchOption;
//import com.korit.cheerful_back.dto.response.PaginationRespDto;
//import com.korit.cheerful_back.dto.response.ResponseDto;
//import com.korit.cheerful_back.dto.user.UserSearchReqDto;
//import com.korit.cheerful_back.service.UserService;
//import java.util.List;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/admin/manager/")
//@RequiredArgsConstructor
//public class UserController {
//  private final UserService userService;
//
//  /*
//    관리자 전용 사용자 관리 API
//   */
//
//  @GetMapping("/users")
//  public ResponseEntity<ResponseDto<PaginationRespDto<User>>> searchUsers(UserSearchReqDto dto) {
//    System.out.println(userService.searchUsers(dto));
//    return ResponseEntity.ok(ResponseDto.success(userService.searchUsers(dto)));
//  }
//
//  /*
//    사용자 삭제
//   */
//  @DeleteMapping("/users")
//  public ResponseEntity<ResponseDto<?>> deleteUserIds(@RequestParam List<Integer> userIds) {
//    userService.delete(userIds);
//    return ResponseEntity.ok(ResponseDto.success("회원 정보를 삭제하였습니다."));
//  }
//}
