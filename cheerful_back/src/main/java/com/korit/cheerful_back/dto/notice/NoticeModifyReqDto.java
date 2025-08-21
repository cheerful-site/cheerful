package com.korit.cheerful_back.dto.notice;

import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class NoticeModifyReqDto {

    private Integer noticeId;
    private Integer userId;
    private Integer noticeCategoryId;
    private String title;
    private String content;
    private List<MultipartFile> files;

    public Notice toEntity(){
        return Notice.builder()
                .noticeId(noticeId)
                .userId(userId)
                .noticeCategoryId(noticeCategoryId)
                .title(title)
                .content(content)
                .build();
    }

}
