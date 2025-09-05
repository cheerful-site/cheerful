package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.myPage.MyPageMapper;
import com.korit.cheerful_back.domain.myPage.MyPageSearchOption;
import com.korit.cheerful_back.dto.myPage.MyCommentDto;
import com.korit.cheerful_back.dto.myPage.MyLikedFoodDto;
import com.korit.cheerful_back.dto.myPage.MyPostDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

  private final MyPageMapper myPageMapper;
  private final PrincipalUtil principalUtil;

  /*
    community 본인이 작성한 글 보기
   */
  public PaginationRespDto<MyPostDto> getMyPageCommunityList(Integer page, Integer size) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    MyPageSearchOption searchOption = MyPageSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .categoryId(1)
        .userId(userId)
        .build();

    List<MyPostDto> contents = myPageMapper.getMyPageCommunityList(searchOption);
    Integer totalElements = myPageMapper.getMyCommunitiesCount(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    return PaginationRespDto.<MyPostDto>builder()
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

    MyPageSearchOption searchOption = MyPageSearchOption.builder()
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
  public PaginationRespDto<MyLikedFoodDto> getMyPageFoodList(Integer page, Integer size) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    MyPageSearchOption searchOption = MyPageSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .userId(userId)
        .build();

    List<MyLikedFoodDto> contents = myPageMapper.getMyPageFoodList(searchOption);
    Integer totalElements = myPageMapper.getMyLikedFoodsCount(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    return PaginationRespDto.<MyLikedFoodDto>builder()
        .content(contents)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }

  public void like(Integer foodId) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    myPageMapper.insert(foodId, userId);
  }

  public void disLike(Integer foodId) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    myPageMapper.delete(foodId, userId);
  }
}
