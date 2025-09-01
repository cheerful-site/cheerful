package com.korit.cheerful_back.dto.food;

import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.foodImg.FoodImg;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FoodModifyReqDto {
  private Integer foodId;
  private Integer foodCategoryId;

  @NotBlank(message = "제목이 없습니다.")
  private String title;

  @NotBlank(message = "내용이 없습니다.")
  private String content;

  @NotNull(message = "가격은 필수입니다.")
  @Positive(message = "가격은 1원 이상이어야 합니다.")
  private Integer price;

  @NotBlank(message = "주소가 없습니다.")
  private String foodAddress;


  // 빈 리스트로 초기화 → 파일이 없어도 안전
  @NotEmpty(message = "사진이 없습니다.")
  private List<MultipartFile> files;
//  private List<MultipartFile> files = new ArrayList<>();

  public Food toEntity() {
    return Food.builder()
        .foodId(foodId)
        .foodCategoryId(foodCategoryId)
        .title(title)
        .content(content)
        .price(price)
        .build();
  }
}
