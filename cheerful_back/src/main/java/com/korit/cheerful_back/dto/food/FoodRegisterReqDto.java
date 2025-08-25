package com.korit.cheerful_back.dto.food;

import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FoodRegisterReqDto {
  private Integer foodCategoryId;
  private String title;
  private String content;
  private Integer price;
  private List<MultipartFile> files;
}
