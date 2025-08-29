package com.korit.cheerful_back.dto.food;

import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.foodImg.FoodImg;

import jakarta.validation.constraints.NotBlank;
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
  private Integer price;
//  private List<MultipartFile> files;
  // 빈 리스트로 초기화 → 파일이 없어도 안전
  private List<MultipartFile> files = new ArrayList<>();

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
