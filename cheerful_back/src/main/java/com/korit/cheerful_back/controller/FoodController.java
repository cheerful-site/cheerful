package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/foods")
@RequiredArgsConstructor
public class FoodController {

  private final FoodService foodService;

  /*
    food 페이징 목록 조회
   */
  @GetMapping
  public ResponseEntity<ResponseDto<?>> getFoods(@RequestParam Integer page, @RequestParam Integer size) {
//    System.out.println(page);
//    System.out.println(size);
//    System.out.println(foodService.getFoodList(page, size));
    return ResponseEntity.ok(ResponseDto.success(foodService.getFoodList(page, size)));
  }

  /*
    특정 food 글에 좋아요 추가
   */
  @PostMapping("/{foodId}/like")
  public ResponseEntity<ResponseDto<?>> getLike(@PathVariable Integer foodId) {
    foodService.like(foodId);
    return ResponseEntity.ok(ResponseDto.success("좋아요"));
  }

  /*
      특정 food 글을 좋아요 취소
   */
  @DeleteMapping("/{foodId}/disLike")
  public ResponseEntity<ResponseDto<?>> getDisLike(@PathVariable Integer foodId) {
    foodService.disLike(foodId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
  }

  /*
    특정 글 클릭해서 내용 보기
  */
  @GetMapping("/{foodId}")
  public ResponseEntity<ResponseDto<?>> getFoodContent(@PathVariable Integer foodId) {
    return ResponseEntity.ok(ResponseDto.success(foodService.getFoodContent(foodId)));
  }

}
