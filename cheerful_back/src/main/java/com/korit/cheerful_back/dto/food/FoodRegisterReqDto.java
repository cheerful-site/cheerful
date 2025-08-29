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
  private Integer price;
  private String foodAddress;
  private List<MultipartFile> files;
}
