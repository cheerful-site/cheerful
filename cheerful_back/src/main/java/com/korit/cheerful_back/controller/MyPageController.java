package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {

  private final MyPageService myPageService;


  @GetMapping("/community")
  public ResponseEntity<ResponseDto<?>> getMyPageCommunityList(@RequestParam Integer page, @RequestParam Integer size) {
//    System.out.println(myPageService.getMyPageCommunityList(page, size));
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageCommunityList(page, size)));
  }

  @GetMapping("/comment")
  public ResponseEntity<ResponseDto<?>> getMyPageCommentList(@RequestParam Integer page, @RequestParam Integer size) {
//    System.out.println(myPageService.getMyPageCommentList(page, size));
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageCommentList(page, size)));
  }

  @GetMapping("/food")
  public ResponseEntity<ResponseDto<?>> getMyPageFoodList(@RequestParam Integer page, @RequestParam Integer size) {
//    System.out.println(myPageService.getMyPageFoodList(page, size));
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageFoodList(page, size)));
  }

  @DeleteMapping("/user")
  public ResponseEntity<ResponseDto<?>> deleteMemberShip() {
    myPageService.deleteUser();
    return ResponseEntity.ok(ResponseDto.success("회원 탈퇴 및 작성한 글/댓글이 모두 삭제되었습니다."));
  }

  @PutMapping("/user/name")
  public ResponseEntity<ResponseDto<?>> modifyProfileName(@RequestParam String name) {
//    System.out.println(name);
    myPageService.modifyProfileName(name);
    return ResponseEntity.ok(ResponseDto.success("프로필 닉네임이 변경되었습니다."));
  }

  @PutMapping("/user/image")
  public ResponseEntity<ResponseDto<?>> modifyProfileImage(@ModelAttribute MultipartFile file) {
//    System.out.println(file);
    myPageService.modifyProfileImg(file);
    return ResponseEntity.ok(ResponseDto.success("프로필 이미지가 변경되었습니다."));
  }

  /*
  특정 food 글에 좋아요 추가
*/
  @PostMapping("/{foodId}/like")
  public ResponseEntity<ResponseDto<?>> getLike(@PathVariable Integer foodId) {
    myPageService.like(foodId);
    return ResponseEntity.ok(ResponseDto.success("좋아요"));
  }

  /*
    특정 food 글을 좋아요 취소
   */
  @DeleteMapping("/{foodId}/dislike")
  public ResponseEntity<ResponseDto<?>> getDisLike(@PathVariable Integer foodId) {
    myPageService.disLike(foodId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
  }
}
