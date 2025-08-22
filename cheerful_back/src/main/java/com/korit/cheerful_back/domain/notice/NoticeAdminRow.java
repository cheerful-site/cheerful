package com.korit.cheerful_back.domain.notice;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeAdminRow {
  private Integer noticeId;
  private Integer noticeCategoryId;
  private Integer userId;
  private String title;
  private String content;
  private LocalDateTime createdAt;
  private String noticeCategoryName;
  private String username;
  private String name;
  private String imgPaths;

  private List<String> imgUrls;
}
