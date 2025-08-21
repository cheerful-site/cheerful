package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.communityImg.CommunityImg;
import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.util.ImageUrlUtil;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

  private final FoodMapper foodMapper;
  private final CommunityMapper communityMapper;
  private final ImageUrlUtil imageUrlUtil;

  /*
    커뮤니티 search 페이징 목록 조회
   */
  public PaginationRespDto<Community> getCommunitySearchList(Integer page, Integer size, Integer categoryId, String searchText) {
    CommunitySearchOption searchOption = CommunitySearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .categoryId(categoryId)
        .searchText(searchText)
        .build();

    // 총 건수 / 총 페이지 / 마지막 여부 계산
    List<Community> contents = communityMapper.findAllByOptions(searchOption);
    Integer totalElements = communityMapper.getCountOfOptions(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    List<Community> contentWithUrls = contents.stream()
        .peek(c -> {
          List<CommunityImg> imgs = c.getCommunityImgs();
          if(imgs == null || imgs.isEmpty()) return;

          imgs.sort(Comparator.comparingInt(CommunityImg::getSeq));

          imgs.forEach(img ->
              img.setImgUrl(imageUrlUtil.community(img.getImgPath())));
        })
        .toList();

    return PaginationRespDto.<Community>builder()
        .content(contentWithUrls)
//                .categoryId(categoryId)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }


  /*
    food search 페이징 목록 조회
   */
  public PaginationRespDto<Food> getFoodSearchList(Integer page, Integer size, String searchText) {
    FoodSearchOption searchOption = FoodSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .searchText(searchText)
        .build();

    List<Food> contents = foodMapper.findAllByOptions(searchOption);
    Integer totalElements = foodMapper.getCountOfOptions(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    List<Food> contentWithUrls = contents.stream()
        .peek(c -> {
          List<FoodImg> imgs = c.getFoodImgs();

          imgs.sort(Comparator.comparingInt(FoodImg::getSeq));

          imgs.forEach(img ->
              img.setImgUrl(imageUrlUtil.food(img.getImgPath())));
        })
        .toList();

    return PaginationRespDto.<Food>builder()
        .content(contentWithUrls)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }
}
