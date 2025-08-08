package com.korit.cheerful_back.domain.community;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommunityMapper {
    int insert(Community community);
    List<Community> findAllBySearchOption(CommunitySearchOption communitySearchOption);
    Community findByCategoryId(@Param("categoryId") Integer categoryId, @Param("userId") Integer userId);
    int getCountOfOptions(CommunitySearchOption communitySearchOption);
}
