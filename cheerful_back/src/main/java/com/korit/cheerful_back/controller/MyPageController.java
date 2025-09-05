package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {

  private final MyPageService myPageService;


  @GetMapping("/community")
  public ResponseEntity<ResponseDto<?>> getMyPageCommunityList(@RequestParam Integer page, @RequestParam Integer size) {
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageCommunityList(page, size)));
  }

  @GetMapping("/comment")
  public ResponseEntity<ResponseDto<?>> getMyPageCommentList(@RequestParam Integer page, @RequestParam Integer size) {
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageCommentList(page, size)));
  }

  @GetMapping("/food")
  public ResponseEntity<ResponseDto<?>> getMyPageFoodList(@RequestParam Integer page, @RequestParam Integer size) {
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageFoodList(page, size)));
  }

  @DeleteMapping("/user")
  public ResponseEntity<ResponseDto<?>> deleteMemberShip() {
    myPageService.deleteUser();
    return ResponseEntity.ok(ResponseDto.success("회원 탈퇴 및 작성한 글/댓글이 모두 삭제되었습니다."));
  }

  @PutMapping("/user/name")
  public ResponseEntity<ResponseDto<?>> modifyProfileName(@RequestParam String name) {
    myPageService.modifyProfileName(name);
    return ResponseEntity.ok(ResponseDto.success("프로필 닉네임이 변경되었습니다."));
  }

  @PutMapping("/user/image")
  public ResponseEntity<ResponseDto<?>> modifyProfileImage(@ModelAttribute MultipartFile file) {
    myPageService.modifyProfileImg(file);
    return ResponseEntity.ok(ResponseDto.success("프로필 이미지가 변경되었습니다."));
  }

}
