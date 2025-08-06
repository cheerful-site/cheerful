package com.korit.cheerful_back.domain.communityImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityImg {

    private Integer communityImgId;
    private Integer communityId;
    private Integer seq;
    private String imgPath;
}
