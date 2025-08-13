package com.korit.cheerful_back.domain.communityCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityCategory {

    private Integer communityCategoryId;
    private String communityCategoryName;
}
