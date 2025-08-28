package com.korit.cheerful_back.domain.communityComment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommunityCommentMapper {

    // 유저 기능
    int insert(CommunityComment communityComment);
    List<CommunityComment> findAllByCommunityId(Integer categoryId, Integer communityId);
    int getCountByCommentId(Integer communityId);

//    // admin전용 기능
    int deleteByCommentId(Integer commentId, Integer userId);
}
