package com.korit.cheerful_back.domain.notice;

import com.korit.cheerful_back.domain.noticeCategory.NoticeCategory;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import com.korit.cheerful_back.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notice {

    private Integer noticeId;
    private Integer userId;
    private Integer noticeCategoryId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer views;
    private Integer isLike;
    private Integer LikeCount;

    private NoticeCategory noticeCategory;
    private User user;
    private List<NoticeImg> noticeImgs;

}
