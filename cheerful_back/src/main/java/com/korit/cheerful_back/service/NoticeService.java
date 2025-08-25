package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.notice.NoticeLikeMapper;
import com.korit.cheerful_back.domain.notice.NoticeMapper;
import com.korit.cheerful_back.domain.notice.NoticeSearchOption;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUser;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import com.korit.cheerful_back.util.ImageUrlUtil;
import java.util.Comparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMapper noticeMapper;
    private final PrincipalUtil principalUtil;
    private final NoticeLikeMapper noticeLikeMapper;
    private final ImageUrlUtil imageUrlUtil;

    /*
        커뮤니티 페이징 목록 조회
     */
    public PaginationRespDto<Notice> getNoticeList(Integer page, Integer size, Integer categoryId) {
        NoticeSearchOption searchOption = NoticeSearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .categoryId(categoryId)
                .build();

        List<Notice> contents = noticeMapper.findAllByOptions(searchOption);
        Integer totalElements = noticeMapper.getCountOfOptions(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page.equals(totalPages);

        List<Notice> contentWithUrls = contents.stream()
            .peek(c -> {
                List<NoticeImg> imgs = c.getNoticeImgs();
                if(imgs == null || imgs.isEmpty()) return;

                imgs.sort(Comparator.comparingInt(NoticeImg::getSeq));

                imgs.forEach(img ->
                    img.setImgUrl(imageUrlUtil.notice(img.getImgPath())));
            })
            .toList();

        return PaginationRespDto.<Notice>builder()
                .content(contentWithUrls)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }

    /*
        좋아요 추가
     */
    public void like(Integer noticeId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        noticeLikeMapper.insert(noticeId, userId);
    }

    /*
        좋아요 취소
     */
    public void disLike(Integer noticeId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        noticeLikeMapper.delete(noticeId, userId);
    }

    /*
        특정 공지사항 글 클릭해서 내용 확인하기
     */
    public Notice getNoticeContent(Integer categoryId, Integer noticeId) {
        Notice notice = noticeMapper.findByOption(categoryId, noticeId);

        // 이미지 URL 세팅
        List<NoticeImg> imgs = notice.getNoticeImgs();
        if(imgs != null && !imgs.isEmpty()) {
            imgs.sort(Comparator.comparingInt(NoticeImg::getSeq));
            imgs.forEach(img -> img.setImgUrl(imageUrlUtil.notice(img.getImgPath())));
        }

        return notice;
    }

    /*
        특정 공지사항 글 조회수
     */
    @Transactional
    public int increaseViews(Integer categoryId, Integer noticeId) {
        int updated = noticeMapper.increaseViews(categoryId, noticeId);
        if (updated == 0) {
            return 0;
        }
        return noticeMapper.selectViews(categoryId, noticeId);
    }

}
