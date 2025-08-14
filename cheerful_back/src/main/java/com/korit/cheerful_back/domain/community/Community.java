package com.korit.cheerful_back.domain.community;

import com.korit.cheerful_back.domain.communityCategory.CommunityCategory;
import com.korit.cheerful_back.domain.communityImg.CommunityImg;
import com.korit.cheerful_back.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
    private Integer views;

    private CommunityCategory communityCategory;
    private User user;
    private List<CommunityImg> communityImgs;
}
