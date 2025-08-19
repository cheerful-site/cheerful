package com.korit.cheerful_back.domain.notice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeSearchOption {

    private Integer startIndex;
    private Integer endIndex;
    private Integer size;
    private String searchText;
    private Integer noticeCategoryId;
    private Integer userId;

}
