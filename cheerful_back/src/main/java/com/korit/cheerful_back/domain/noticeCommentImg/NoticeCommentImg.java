package com.korit.cheerful_back.domain.noticeCommentImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeCommentImg {

    private Integer noticeCommentImgId;
    private Integer noticeCommentId;
    private Integer seq;
    private String imgPath;
    private String imgUrl;

}
