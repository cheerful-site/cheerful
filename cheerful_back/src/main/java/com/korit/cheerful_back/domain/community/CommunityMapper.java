package com.korit.cheerful_back.domain.community;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommunityMapper {
    int insert(Community community);

    // user전용 community
    List<Community> findAllByOption(CommunitySearchOption communitySearchOption);
//    List<Community> findByCategoryId(@Param("categoryId") Integer categoryId, @Param("userId") Integer userId);
    int getCountOfOptions(CommunitySearchOption communitySearchOption);

    // 조회수
    int increaseViews(@Param("categoryId") Integer categoryId, @Param("communityId") Integer communityId);

    Integer selectViews(@Param("categoryId") Integer categoryId, @Param("communityId") Integer communityId);

    // admin전용 community
    List<Community> findAllBySearchOption(CommunitySearchOption communitySearchOption);
    int getCountOfSearchOption(CommunitySearchOption communitySearchOption);
}
