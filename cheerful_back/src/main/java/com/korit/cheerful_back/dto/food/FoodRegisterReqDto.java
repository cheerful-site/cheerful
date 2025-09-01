package com.korit.cheerful_back.dto.food;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FoodRegisterReqDto {
  private Integer foodCategoryId;

  @NotBlank(message = "내용이 없습니다.")
  private String title;

  @NotBlank(message = "내용이 없습니다.")
  private String content;

  @NotNull(message = "가격은 필수입니다.")
  @Positive(message = "가격은 1원 이상이어야 합니다.")
  private Integer price;

  @NotBlank(message = "주소가 없습니다.")
  private String foodAddress;

  @NotEmpty(message = "사진이 없습니다.")
  private List<MultipartFile> files;
}
