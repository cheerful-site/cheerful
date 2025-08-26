package com.korit.cheerful_back.domain.notice;

import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {

    // user전용 notice
    List<Notice> findAllByOptions(NoticeSearchOption noticeSearchOption);
    Notice findByOption(@Param("categoryId") Integer categoryId, @Param("noticeId") Integer noticeId, @Param("userId") Integer userId);
    int getCountOfOptions(NoticeSearchOption noticeSearchOption);

    // 조회수
    int increaseViews(@Param("categoryId") Integer categoryId, @Param("noticeId") Integer noticeId);
    Integer selectViews(@Param("categoryId") Integer categoryId, @Param("noticeId") Integer noticeId);

    // admin전용 notice
    List<NoticeAdminRow> findAllBySearchOption(NoticeSearchOption searchOption);
    int getCountOfSearchOption(NoticeSearchOption searchOption);

    int update(Notice notice);
    int deleteNoticeImages(@Param("noticeId") Integer noticeId);
    int insertNoticeImages(List<NoticeImg> noticeImgs);

    int deleteByNoticeIds(List<Integer> noticeIds);

    // 게시글 등록
    int insert(Notice notice);

}
