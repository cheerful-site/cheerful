package com.korit.cheerful_back.dto.food;

import jakarta.validation.constraints.NotBlank;
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

  @NotBlank(message = "가격이 없습니다.")
  private Integer price;

  @NotBlank(message = "주소가 없습니다.")
  private String foodAddress;

  @NotBlank(message = "사진이 없습니다.")
  private List<MultipartFile> files;
}
