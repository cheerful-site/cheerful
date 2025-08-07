package com.korit.cheerful_back.dto.community;

import com.korit.cheerful_back.domain.communityComment.CommunityComment;
import lombok.Data;

@Data
public class CommunityCommentRegisterReqDto {
    private Integer communityId;
    private Integer parentCommentId;
    private Integer parentUserId;
    private String content;

    public CommunityComment toEntity() {
        return CommunityComment.builder()
                .communityId(communityId)
                .parentCommentId(parentCommentId)
                .parentUserId(parentUserId)
                .content(content)
                .build();
    }
}
