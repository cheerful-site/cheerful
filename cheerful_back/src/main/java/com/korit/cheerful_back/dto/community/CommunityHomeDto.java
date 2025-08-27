package com.korit.cheerful_back.dto.community;

import com.korit.cheerful_back.domain.community.Community;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommunityHomeDto {

  private Community mostLiked;
  private Community mostViewed;
  private Community bestMissing;
  private Community bestFoster;
}
