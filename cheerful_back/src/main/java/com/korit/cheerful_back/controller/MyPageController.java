package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {

  private final MyPageService myPageService;

  @GetMapping("/community")
  public ResponseEntity<ResponseDto<?>> getMyPageList(@RequestParam Integer page, @RequestParam Integer size) {
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageCommunityList(page, size)));
  }

  @GetMapping("/food")
  public ResponseEntity<ResponseDto<?>> getMyPageFoodList(@RequestParam Integer page, @RequestParam Integer size) {
    return ResponseEntity.ok(ResponseDto.success(myPageService.getMyPageFoodList(page, size)));
  }

}
