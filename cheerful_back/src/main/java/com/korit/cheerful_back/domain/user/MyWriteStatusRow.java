package com.korit.cheerful_back.domain.user;

import lombok.Data;

@Data
public class MyWriteStatusRow {
  private int communityPosts;
  private int foodPosts;
  private int noticePosts;
  private int communityComments;
  private int foodComments;
  private int noticeComments;
  private int likedFoods;
}
