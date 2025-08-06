package com.korit.cheerful_back.domain.community;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityMapper {
    int insert(Community community);
}
