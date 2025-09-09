package com.korit.cheerful_back.domain.noticeComment;

import com.korit.cheerful_back.domain.noticeCommentImg.NoticeCommentImg;
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
public class NoticeComment {

    private Integer noticeCommentId;
    private Integer noticeId;
    private Integer userId;
    private String content;
    private LocalDateTime createdAt;

    private User user;
    private List<NoticeCommentImg> noticeCommentImgs;
}
