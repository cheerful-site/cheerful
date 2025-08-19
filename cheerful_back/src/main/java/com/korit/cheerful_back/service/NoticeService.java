package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.notice.NoticeMapper;
import com.korit.cheerful_back.domain.notice.NoticeSearchOption;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMapper noticeMapper;

    /*
        커뮤니티 페이징 목록 조회
     */
    public PaginationRespDto<Notice> getNoticeList(Integer page, Integer size, Integer categoryId) {
        NoticeSearchOption searchOption = NoticeSearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .noticeCategoryId(categoryId)
                .build();

        List<Notice> contents = noticeMapper.findAllBySearchOptions(searchOption);
        Integer totalElements = noticeMapper.getCountOfOptions(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page.equals(totalPages);

        return PaginationRespDto.<Notice>builder()
                .content(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }

}
