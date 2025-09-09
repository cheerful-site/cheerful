package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.domain.myPage.MyPageMapper;
import com.korit.cheerful_back.domain.myPage.MyPageSearchOption;
import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.dto.myPage.MyCommentDto;
import com.korit.cheerful_back.dto.myPage.MyLikedFoodDto;
import com.korit.cheerful_back.dto.myPage.MyPostDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;

import java.io.File;
import java.util.Comparator;
import java.util.List;

import com.korit.cheerful_back.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MyPageService {

  private final MyPageMapper myPageMapper;
  private final PrincipalUtil principalUtil;
  private final UserMapper userMapper;
  private final FileService fileService;
  private final ImageUrlUtil imageUrlUtil;

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

    List<MyLikedFoodDto> contentWithUrls = contents.stream()
        .peek(c -> {
          List<FoodImg> imgs = c.getFoodImgs();
          if(imgs == null || imgs.isEmpty()) return;

          imgs.sort(Comparator.comparingInt(FoodImg::getSeq));

          imgs.forEach(img ->
              img.setImgUrl(imageUrlUtil.food(img.getImgPath())));
        })
        .toList();

    return PaginationRespDto.<MyLikedFoodDto>builder()
        .content(contentWithUrls)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }

  /*
      회원탈퇴
   */
  public void deleteUser() {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    userMapper.deleteByUser(userId);
  }

  /*
    회원 프로필 이름 수정
   */
  public void modifyProfileName(String name) {
    User user = principalUtil.getPrincipalUser().getUser();
    userMapper.updateName(user.getUserId(), name);
  }

  /*
    회원 프로필 이미지 수정
   */
  public void modifyProfileImg(MultipartFile file) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    // 기존 이미지 파일명 가져오기
    String oldImg = userMapper.getProfileImgPath(userId);
    // 새 이미지 업로드
    String newImg = fileService.uploadFile(file, "profile");
    // DB 업데이트
    userMapper.updateProfileImgPath(userId, newImg);

    // 기존 이미지 삭제 (구글 이미지 또는 디폴트 제외)
    if (oldImg != null && !oldImg.startsWith("http") && !oldImg.contains("default")) {
      String dirPath = imageUrlUtil.getAppProperties()
              .getImageConfigs()
              .get("profile")
              .getDirPath();

      File fileToDelete = new File(dirPath + "/" + oldImg);
      if (fileToDelete.exists()) {
        fileToDelete.delete();
      }
    }

    imageUrlUtil.profile(newImg);
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
