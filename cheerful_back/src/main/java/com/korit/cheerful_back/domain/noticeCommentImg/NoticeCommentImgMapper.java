package com.korit.cheerful_back.domain.noticeCommentImg;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeCommentImgMapper {

    int insertMany(List<NoticeCommentImg> noticeImgs);

}
