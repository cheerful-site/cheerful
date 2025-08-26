package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.communityImg.CommunityImg;
import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.notice.NoticeLikeMapper;
import com.korit.cheerful_back.domain.notice.NoticeMapper;
import com.korit.cheerful_back.domain.notice.NoticeSearchOption;
import com.korit.cheerful_back.domain.noticeComment.NoticeComment;
import com.korit.cheerful_back.domain.noticeComment.NoticeCommentMapper;
import com.korit.cheerful_back.domain.noticeCommentImg.NoticeCommentImg;
import com.korit.cheerful_back.domain.noticeCommentImg.NoticeCommentImgMapper;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import com.korit.cheerful_back.dto.notice.NoticeCommentRegisterReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUser;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import com.korit.cheerful_back.util.ImageUrlUtil;

import java.util.ArrayList;
import java.util.Comparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMapper noticeMapper;
    private final PrincipalUtil principalUtil;
    private final NoticeLikeMapper noticeLikeMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final NoticeCommentMapper noticeCommentMapper;
    private final NoticeCommentImgMapper noticeCommentImgMapper;
    private final FileService fileService;

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

        List<NoticeComment> comment = noticeCommentMapper.findAllByNoticeId(noticeId);
        comment.forEach(c -> {
            var u = c.getUser();
            if(u != null) {
                u.setProfileImgUrl(imageUrlUtil.profile(u.getProfileImgPath()));
            }
        });
        notice.setNoticeComment(comment);

        return notice;
    }

    /*
        특정 공지사항 글 조회수
     */
    public int increaseViews(Integer categoryId, Integer noticeId) {
        int updated = noticeMapper.increaseViews(categoryId, noticeId);
        if (updated == 0) {
            return 0;
        }
        return noticeMapper.selectViews(categoryId, noticeId);
    }

    /*
        댓글 등록 + 이미지 저장
     */
    @Transactional(rollbackFor = Exception.class)
    public void registerComment(NoticeCommentRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        NoticeComment comment = NoticeComment.builder()
                .userId(userId)
                .noticeId(dto.getNoticeId())
                .content(dto.getContent())
                .build();
        noticeCommentMapper.insert(comment);

        List<MultipartFile> imageFiles = dto.getFiles();

        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<NoticeCommentImg> noticeCommentImgs = new ArrayList<>();
            int seq = 1;

            for (MultipartFile file : imageFiles) {
                String imagePath = fileService.uploadFile(file, "noticeComment");

                NoticeCommentImg noticeCommentImg = NoticeCommentImg.builder()
                        .noticeCommentId(comment.getNoticeCommentId())
                        .seq(seq++)
                        .imgPath(imagePath)
                        .build();

                noticeCommentImgs.add(noticeCommentImg);
            }

            noticeCommentImgMapper.insertMany(noticeCommentImgs);
        }
    }

}
