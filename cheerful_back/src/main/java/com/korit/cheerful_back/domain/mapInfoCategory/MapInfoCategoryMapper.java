package com.korit.cheerful_back.domain.mapInfoCategory;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MapInfoCategoryMapper {
    List<MapInfoCategory> findAll();
}
