package com.korit.cheerful_back.dto.notice;

import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class NoticeModifyReqDto {

    private Integer noticeId;
    private Integer noticeCategoryId;

    @NotBlank(message = "제목이 없습니다.")
    private String title;

    @NotBlank(message = "내용이 없습니다.")
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
