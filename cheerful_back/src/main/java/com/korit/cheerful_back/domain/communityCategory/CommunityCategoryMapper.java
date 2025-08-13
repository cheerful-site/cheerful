package com.korit.cheerful_back.domain.communityCategory;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityCategoryMapper {

    List<CommunityCategory> findAll();
}
