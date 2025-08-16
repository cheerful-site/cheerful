package com.korit.cheerful_back.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCommunityRespDto {
    private Integer communityId;
    private Integer communityCategoryId;
    private String username;
    private String title;
    private String content;
    private String createdAt;
}
