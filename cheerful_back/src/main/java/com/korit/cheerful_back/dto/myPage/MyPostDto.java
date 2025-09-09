package com.korit.cheerful_back.dto.myPage;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MyPostDto {

  private Integer communityId;
  private Integer categoryId;
  private String categoryName;
  private String title;
  private LocalDateTime createdAt;
  private Integer views;
  private Integer likeCount;
  private Integer isLike;
}
