package com.korit.cheerful_back.domain.map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MapInfoMapper {

  int existsByNameAndAddress(@Param("name") String name,
      @Param("address") String address);

  int insertOne(MapInfoRow row);

  int bulkInsertIgnore(@Param("list") List<MapInfoRow> rows);

  // 목록 조회(카테고리/검색/지도영역 + 페이징)
  List<MapInfoRow> search(@Param("categoryId") Integer categoryId,
      @Param("q") String q,
      @Param("swLat") Double swLat,
      @Param("swLng") Double swLng,
      @Param("neLat") Double neLat,
      @Param("neLng") Double neLng,
      @Param("offset") int offset,
      @Param("size") int size);

  // 카운트
  int count(@Param("categoryId") Integer categoryId,
      @Param("q") String q,
      @Param("swLat") Double swLat,
      @Param("swLng") Double swLng,
      @Param("neLat") Double neLat,
      @Param("neLng") Double neLng);
}