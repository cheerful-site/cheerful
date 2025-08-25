package com.korit.cheerful_back.dto.notice;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class NoticeCommentRegisterReqDto {

    private Integer noticeId;
    private String content;
    private List<MultipartFile> files;

}
