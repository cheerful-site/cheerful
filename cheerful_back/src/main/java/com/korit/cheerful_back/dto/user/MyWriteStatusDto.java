package com.korit.cheerful_back.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyWriteStatusDto {
  private int postCount;
  private int commentCount;

  private int communityPosts;
  private int foodPosts;
  private int noticePosts;

  private int communityComments;
  private int foodComments;
  private int noticeComments;
}
