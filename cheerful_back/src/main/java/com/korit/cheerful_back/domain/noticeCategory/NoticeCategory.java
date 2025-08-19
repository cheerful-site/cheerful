package com.korit.cheerful_back.domain.noticeCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeCategory {

    private Integer noticeCategoryId;
    private String noticeCategoryName;

}
