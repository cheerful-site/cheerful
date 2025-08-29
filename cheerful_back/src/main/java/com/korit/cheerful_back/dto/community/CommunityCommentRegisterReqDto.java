package com.korit.cheerful_back.dto.community;

import com.korit.cheerful_back.domain.communityComment.CommunityComment;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommunityCommentRegisterReqDto {
    private Integer communityId;
    private Integer parentCommentId;
    private Integer parentUserId;

    @NotBlank(message = "내용이 없습니다.")
    private String content;

    public CommunityComment toEntity(Integer userId) {
        return CommunityComment.builder()
                .communityId(communityId)
                .parentCommentId(parentCommentId)
                .parentUserId(parentUserId)
                .userId(userId)
                .content(content)
                .build();
    }
}
