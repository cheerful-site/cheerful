package com.korit.cheerful_back.domain.communityImg;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityImgMapper {
    int insert(CommunityImg communityImg);
    int insertMany(List<CommunityImg> communityImgs);
}
