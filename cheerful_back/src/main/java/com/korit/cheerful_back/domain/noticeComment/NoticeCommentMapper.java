package com.korit.cheerful_back.domain.noticeComment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeCommentMapper {

    int insert(NoticeComment noticeComment);
    List<NoticeComment> findAllByNoticeId(Integer noticeId);
    int getCountByCommentId(Integer noticeId);
    int deleteByCommentId(Integer commentId, Integer userId);

}
