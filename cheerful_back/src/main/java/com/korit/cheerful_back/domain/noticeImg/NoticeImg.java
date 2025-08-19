package com.korit.cheerful_back.domain.noticeImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeImg {

    private Integer noticeImgId;
    private Integer noticeId;
    private Integer seq;
    private String imgPath;

}
