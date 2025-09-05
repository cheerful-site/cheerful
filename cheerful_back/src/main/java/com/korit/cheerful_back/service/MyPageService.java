package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.domain.myPage.MyCommentSearchOption;
import com.korit.cheerful_back.domain.myPage.MyPageMapper;
import com.korit.cheerful_back.dto.myPage.MyCommentDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUser;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

  private final CommunityMapper communityMapper;
  private final FoodMapper foodMapper;
  private final MyPageMapper myPageMapper;
  private final PrincipalUtil principalUtil;

  /*
    community 본인이 작성한 글 보기
   */
  public PaginationRespDto<Community> getMyPageCommunityList(Integer page, Integer size) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    CommunitySearchOption searchOption = CommunitySearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .categoryId(1)
        .userId(userId)
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
    community, food, notice 본인이 작성한 댓글 보기
   */
  public PaginationRespDto<MyCommentDto> getMyPageCommentList(Integer page, Integer size) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    MyCommentSearchOption searchOption = MyCommentSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .userId(userId)
        .build();

    List<MyCommentDto> contents = myPageMapper.getMyComments(searchOption);
    Integer totalElements = myPageMapper.getMyCommentsCount(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    return PaginationRespDto.<MyCommentDto>builder()
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
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    FoodSearchOption searchOption = FoodSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .userId(userId)
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
