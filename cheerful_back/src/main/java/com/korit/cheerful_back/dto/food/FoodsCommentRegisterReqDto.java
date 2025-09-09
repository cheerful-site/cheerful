package com.korit.cheerful_back.dto.food;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FoodsCommentRegisterReqDto {
  private Integer foodId;

  @NotBlank(message = "내용이 없습니다.")
  private String content;
  private List<MultipartFile> files;
}
