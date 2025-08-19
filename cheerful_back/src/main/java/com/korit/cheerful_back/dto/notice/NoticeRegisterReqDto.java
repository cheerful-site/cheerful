package com.korit.cheerful_back.dto.notice;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class NoticeRegisterReqDto {

    private Integer noticeCategoryId;
    private String title;
    private String content;
    private List<MultipartFile> files;

}
