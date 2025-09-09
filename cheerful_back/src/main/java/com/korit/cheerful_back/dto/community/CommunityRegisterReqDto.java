package com.korit.cheerful_back.dto.community;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CommunityRegisterReqDto {
    private Integer communityCategoryId;

    @NotBlank(message = "제목이 없습니다.")
    private String title;

    @NotBlank(message = "내용이 없습니다.")
    private String content;
    private List<MultipartFile> files;
}