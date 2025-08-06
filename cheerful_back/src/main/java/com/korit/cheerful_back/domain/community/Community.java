package com.korit.cheerful_back.domain.community;

import com.korit.cheerful_back.domain.communityCategory.CommunityCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Community {
    private Integer communityId;
    private Integer communityCategoryId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer isLike;
    private Integer likeCount;
    private Integer commentCount;

    private CommunityCategory communityCategory;

}
