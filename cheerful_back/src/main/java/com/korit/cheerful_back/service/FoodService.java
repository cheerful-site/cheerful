package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodLikeMapper;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FoodService {

  private final FoodMapper foodMapper;
  private final FoodLikeMapper foodLikeMapper;
  private final PrincipalUtil principalUtil;

  /*
    food 페이징 목록 조회
   */
  public PaginationRespDto<Food> getFoodList(Integer page, Integer size) {
    FoodSearchOption searchOption = FoodSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .build();

    List<Food> contents = foodMapper.findAllByOptions(searchOption);
    Integer totalElements = foodMapper.getCountOfOptions(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    return PaginationRespDto.<Food>builder()
        .content(contents)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }

  /*
        좋아요 추가
     */
  public void like(Integer foodId) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    foodLikeMapper.insert(foodId, userId);
  }

  /*
      좋아요 취소
   */
  public void disLike(Integer foodId) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    foodLikeMapper.delete(foodId, userId);
  }

  /*
    특정 글 클릭해서 내용 보기
   */
  public Food getFoodContent(Integer foodId) {
    return foodMapper.findByOption(foodId);
  }
}
