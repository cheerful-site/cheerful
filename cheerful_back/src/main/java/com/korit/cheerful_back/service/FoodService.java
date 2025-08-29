package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodLikeMapper;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.domain.foodComment.FoodComment;
import com.korit.cheerful_back.domain.foodComment.FoodCommentLikeMapper;
import com.korit.cheerful_back.domain.foodComment.FoodCommentMapper;
import com.korit.cheerful_back.domain.foodCommentImg.FoodCommentImg;
import com.korit.cheerful_back.domain.foodCommentImg.FoodCommentImgMapper;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.food.FoodsCommentRegisterReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import com.korit.cheerful_back.util.ImageUrlUtil;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FoodService {

  private final FoodMapper foodMapper;
  private final FoodLikeMapper foodLikeMapper;
  private final FoodCommentMapper foodCommentMapper;
  private final PrincipalUtil principalUtil;
  private final FileService fileService;
  private final FoodCommentImgMapper foodCommentImgMapper;
  private final ImageUrlUtil imageUrlUtil;
  private final FoodCommentLikeMapper foodCommentLikeMapper;

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
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    Food food = foodMapper.findByOption(foodId, userId);

    // 이미지 URL 세팅
    List<FoodImg> imgs = food.getFoodImgs();
    if(imgs != null && !imgs.isEmpty()) {
      imgs.sort(Comparator.comparingInt(FoodImg::getSeq));
      imgs.forEach(img -> img.setImgUrl(imageUrlUtil.food(img.getImgPath())));
    }

    List<FoodComment> comment = foodCommentMapper.findAllByFoodId(foodId, userId);

    comment.forEach(c -> {
      var u = c.getUser();
      if(u != null) {
        u.setProfileImgUrl(imageUrlUtil.profile(u.getProfileImgPath()));
      }
    });

    comment.forEach(cmt -> {
      List<FoodCommentImg> cimgs = cmt.getFoodCommentImgs();
      if(cimgs == null || cimgs.isEmpty()) return;

      cimgs.sort(Comparator.comparingInt(FoodCommentImg::getSeq));
      cimgs.forEach(ci -> ci.setImgUrl(imageUrlUtil.foodComment(ci.getImgPath())));
    });

    food.setFoodComment(comment);

    return food;
  }

  /*
    댓글 등록 + 이미지 저장
   */
  @Transactional(rollbackFor = Exception.class)
  public void registerComment(FoodsCommentRegisterReqDto dto) {
//    List<String> uploadFilepath = new ArrayList<>();
//
//    if(dto.getFiles() != null && !dto.getFiles().isEmpty()) {
//      uploadFilepath = dto.getFiles().stream()
//          .filter(file -> file != null && !file.isEmpty())
//          .map(file -> "/foodComment/" + fileService.uploadFile(file, "/foodComment"))
//          .peek(newFileName -> System.out.println(newFileName))
//          .collect(Collectors.toList());
//    }

    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

    // content 유효성 검사
    if (dto.getContent() == null || dto.getContent().trim().isEmpty()) {
      throw new IllegalArgumentException("내용이 없습니다.");
    }

    FoodComment comment = FoodComment.builder()
        .userId(userId)
        .foodId(dto.getFoodId())
        .content(dto.getContent())
        .build();
    foodCommentMapper.insert(comment);

//    if(!uploadFilepath.isEmpty()) {
//      AtomicInteger atomicInteger = new AtomicInteger(0);
//      List<FoodCommentImg> foodCommentImgs = uploadFilepath.stream()
//          .map(path -> FoodCommentImg.builder()
//              .seq(atomicInteger.getAndIncrement() + 1)
//              .foodCommentId(comment.getFoodCommentId())
//              .imgPath(path)
//              .build())
//          .collect(Collectors.toList());
//      foodCommentImgMapper.insertMany(foodCommentImgs);
//    }
//
//    System.out.println(uploadFilepath);

    List<MultipartFile> imageFiles = dto.getFiles();

    if(imageFiles != null && !imageFiles.isEmpty()) {
      List<FoodCommentImg> foodCommentImgs = new ArrayList<>();
      int seq = 1;

      for(MultipartFile file : imageFiles) {
        String imagePath = fileService.uploadFile(file, "foodComment");

        FoodCommentImg foodCommentImg = FoodCommentImg.builder()
            .foodCommentId(comment.getFoodCommentId())
            .seq(seq++)
            .imgPath(imagePath)
            .build();

        foodCommentImgs.add(foodCommentImg);
      }

      foodCommentImgMapper.insertMany(foodCommentImgs);
    }
  }

  /*
      댓글 좋아요 추가
   */
  public void commentLike(Integer foodCommentId) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    foodCommentLikeMapper.insert(foodCommentId, userId);
  }

  /*
      댓글 좋아요 취소
   */
  public void commentDisLike(Integer foodCommentId) {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    foodCommentLikeMapper.delete(foodCommentId, userId);
  }

  /*
      등록한 user일 경우 댓글 삭제
   */
  @Transactional(rollbackFor = Exception.class)
  public void deleteUserComment(Integer commentId, Integer userId) {
    List<String> imgFile = foodCommentMapper.getImagePathsByCommentId(commentId);
    for(String file: imgFile) {
      fileService.deletedFile(file, "foodComment");
    }
    foodCommentMapper.deleteUserFoodCommentId(commentId, userId);
  }
}
