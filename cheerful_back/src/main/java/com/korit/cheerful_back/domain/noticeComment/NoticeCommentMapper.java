package com.korit.cheerful_back.domain.noticeComment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeCommentMapper {

    int insert(NoticeComment noticeComment);
    List<NoticeComment> findAllByNoticeId(Integer noticeId);
    int getCountByCommentId(Integer noticeId);

    // 댓글 및 댓글이미지 삭제
    int adminDeleteByCommentId(Integer commentId);
    List<String> getImagePathsByCommentId(Integer commentId);

    // 등록한 user일 경우 댓글 삭제
    int deleteUserNoticeCommentId(Integer commentId, Integer userId);
}
