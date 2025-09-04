package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

  private final CommunityMapper communityMapper;
  private final FoodMapper foodMapper;

  /*
    community 본인이 작성한 글 보기
   */
  public PaginationRespDto<Community> getMyPageCommunityList(Integer page, Integer size) {
    CommunitySearchOption searchOption = CommunitySearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .categoryId(1)
        .build();

    List<Community> contents = communityMapper.getMyPageCommunityList(searchOption);
    Integer totalElements = communityMapper.getCountOfMyPage(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    return PaginationRespDto.<Community>builder()
        .content(contents)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }

  /*
    food 찜목록
   */
  public PaginationRespDto<Food> getMyPageFoodList(Integer page, Integer size) {
    FoodSearchOption searchOption = FoodSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .build();

    List<Food> contents = foodMapper.getMyPageFoodList(searchOption);
    Integer totalElements = foodMapper.getCountOfMyPage(searchOption);
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
}
