package com.korit.cheerful_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaginationRespDto<T> {
    private List<T> content;
//    private Integer categoryId;
    private Integer totalElements;
    private Integer totalPages;
    private Integer page;
    private Integer size;
    private Boolean isLast;
}
