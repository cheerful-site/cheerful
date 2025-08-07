package com.korit.cheerful_back.domain.communityComment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityCommentMapper {

    // 유저 기능
    int insert(CommunityComment communityComment);

    // 관리자 기능
    List<CommunityComment> findAllByCommunityId(Integer communityId);

    int getCountByCommentId(Integer communityId);
}
