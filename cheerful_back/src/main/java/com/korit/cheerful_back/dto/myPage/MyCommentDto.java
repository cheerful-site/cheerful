package com.korit.cheerful_back.dto.myPage;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MyCommentDto {
  private String type;
  private Integer commentId;
  private String content;
  private LocalDateTime createdAt;
  private Integer parentId;
  private String parentTitle;
  private String parentCategoryId;
  private String parentCategoryName;
}
