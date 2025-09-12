package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.food.FoodsCommentRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

  private final FoodService foodService;

  /*
    food 페이징 목록 조회
   */
  @GetMapping
  public ResponseEntity<ResponseDto<?>> getFoods(@RequestParam(defaultValue = "rank") String sort, @RequestParam Integer page, @RequestParam Integer size) {
//    System.out.println(page);
//    System.out.println(size);
//    System.out.println(foodService.getFoodList(page, size));
    return ResponseEntity.ok(ResponseDto.success(foodService.getFoodList(sort, page, size)));
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
  @DeleteMapping("/{foodId}/dislike")
  public ResponseEntity<ResponseDto<?>> getDisLike(@PathVariable Integer foodId) {
    foodService.disLike(foodId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
  }

  /*
    특정 글 클릭해서 내용 보기
  */
  @GetMapping("/{foodId}")
  public ResponseEntity<ResponseDto<?>> getFoodContent(@PathVariable Integer foodId) {
//    System.out.println(foodService.getFoodContent(foodId));
    return ResponseEntity.ok(ResponseDto.success(foodService.getFoodContent(foodId)));
  }

  /*
    댓글 등록 + 이미지 추가
   */
  @PostMapping("/{foodId}/comments")
  public ResponseEntity<ResponseDto<?>> registerFoodComment(@Valid @ModelAttribute FoodsCommentRegisterReqDto dto) {
//    System.out.println(dto);
    foodService.registerComment(dto);
    return ResponseEntity.ok(ResponseDto.success("댓글을 등록하였습니다."));
  }

  /*
    특정 food 댓글에 좋아요 추가
   */
  @PostMapping("/{foodId}/{foodCommentId}/like")
  public ResponseEntity<ResponseDto<?>> getCommentLike(@PathVariable Integer foodId, @PathVariable Integer foodCommentId) {
    foodService.commentLike(foodCommentId);
    return ResponseEntity.ok(ResponseDto.success("좋아요"));
  }

  /*
      특정 food 댓글을 좋아요 취소
   */
  @DeleteMapping("/{foodId}/{foodCommentId}/dislike")
  public ResponseEntity<ResponseDto<?>> getCommentDisLike(@PathVariable Integer foodId, @PathVariable Integer foodCommentId) {
    foodService.commentDisLike(foodCommentId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
  }

  /*
    food 구매 링크
   */
  @GetMapping("/{foodId}/purchase")
  public ResponseEntity<ResponseDto<?>> getAddressLink(@PathVariable Integer foodId) {
    return ResponseEntity.ok(ResponseDto.success(foodService.getFoodContent(foodId)));
  }

  /*
      등록한 user일 경우 댓글 삭제
   */
  @DeleteMapping("/comments/{commentId}/{userId}")
  public ResponseEntity<ResponseDto<?>> deleteUserComment(@PathVariable Integer commentId, @PathVariable Integer userId) {
    foodService.deleteUserComment(commentId, userId);
    return ResponseEntity.ok(ResponseDto.success("댓글이 삭제되었습니다."));
  }

}
