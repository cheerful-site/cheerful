package com.korit.cheerful_back.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CommunityRegisterReqDto {
    private Integer communityCategoryId;
    private String title;
    private String content;
    private List<MultipartFile> files;
}
