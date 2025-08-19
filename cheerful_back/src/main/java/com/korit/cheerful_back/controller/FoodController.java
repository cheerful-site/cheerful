package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class FoodController {

  private final FoodService foodService;

  /*
    food 글 등록 (admin page)
   */
  @PostMapping
  public ResponseEntity<ResponseDto<?>> register(@ModelAttribute FoodRegisterReqDto dto) {
    return ResponseEntity.ok(ResponseDto.success("food 글을 등록했습니다."));
  }

  /*
    food 페이징 목록 조회
   */
  @GetMapping("/foods")
  public ResponseEntity<ResponseDto<?>> getFoods(@RequestParam Integer page, @RequestParam Integer size) {
//    System.out.println(page);
//    System.out.println(size);
//    System.out.println(foodService.getFoodList(page, size));
    return ResponseEntity.ok(ResponseDto.success(foodService.getFoodList(page, size)));
  }


}
