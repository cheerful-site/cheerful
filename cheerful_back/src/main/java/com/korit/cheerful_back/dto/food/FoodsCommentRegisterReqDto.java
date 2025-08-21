package com.korit.cheerful_back.dto.food;

import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FoodsCommentRegisterReqDto {
  private Integer foodId;
  private String content;
  private List<MultipartFile> files;
}
