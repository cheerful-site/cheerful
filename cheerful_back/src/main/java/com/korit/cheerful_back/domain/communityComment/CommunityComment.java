package com.korit.cheerful_back.domain.communityComment;

import com.korit.cheerful_back.domain.user.User;

import java.time.LocalDateTime;

public class CommunityComment {
    private Integer communityCommentId;
    private Integer communityId;
    private Integer parentCommentId;
    private Integer parentUserId;
    private String parentUsername;
    private Integer userId;
    private String content;
    private LocalDateTime createdAt;
    private Integer level;
    private String path;

    private User user;
}
