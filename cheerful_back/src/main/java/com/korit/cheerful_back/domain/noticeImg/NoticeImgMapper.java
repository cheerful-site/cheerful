package com.korit.cheerful_back.domain.noticeImg;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeImgMapper {

    int insert(NoticeImg noticeImg);
    int insertMany(List<NoticeImg> noticeImgs);

}
