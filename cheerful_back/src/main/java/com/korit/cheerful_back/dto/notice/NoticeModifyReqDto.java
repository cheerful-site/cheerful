package com.korit.cheerful_back.dto.notice;

import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class NoticeModifyReqDto {

    private Integer noticeId;
    private Integer noticeCategoryId;
    private String title;
    private String content;
//    private List<MultipartFile> files;
    // 빈 리스트로 초기화 → 파일이 없어도 안전
    private List<MultipartFile> files = new ArrayList<>();

    public Notice toEntity(){
        return Notice.builder()
                .noticeId(noticeId)
                .noticeCategoryId(noticeCategoryId)
                .title(title)
                .content(content)
                .build();
    }

}
