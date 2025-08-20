package com.korit.cheerful_back.domain.notice;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {

    // user전용 notice
    List<Notice> findAllByOptions(NoticeSearchOption noticeSearchOption);
    int getCountOfOptions(NoticeSearchOption noticeSearchOption);

    //    // 조회수
//    int increaseViews(@Param("categoryId") Integer categoryId, @Param("noticeId") Integer noticeId);
//    Integer selectViews(@Param("categoryId") Integer categoryId, @Param("noticeId") Integer noticeId);

    // admin전용 notice
    List<Notice> findAllBySearchOption(NoticeSearchOption searchOption);
    int getCountOfSearchOption(NoticeSearchOption searchOption);

    // 게시글 등록
    int insert(Notice notice);

//    int deleteByNoticeIds(List<Integer> noticesIds);
//    int update(Notice notice);



}
