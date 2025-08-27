package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class HomeController {

  private final HomeService homeService;

  @GetMapping("/bestcommunity")
  public ResponseEntity<ResponseDto<?>> getCommunityCards() {
//    System.out.println(homeService.getCommunityCards());
    return ResponseEntity.ok(ResponseDto.success(homeService.getCommunityCards()));
  }

  @GetMapping("/bestfood")
  public ResponseEntity<ResponseDto<?>> getFoodCards() {
    return ResponseEntity.ok(ResponseDto.success(homeService.getFoodCards()));
  }

}
