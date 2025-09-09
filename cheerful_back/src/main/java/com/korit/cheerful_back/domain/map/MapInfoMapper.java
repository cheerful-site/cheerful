package com.korit.cheerful_back.domain.map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MapInfoMapper {

    List<MapInfo> selectNearby(@Param("categoryId") Integer categoryId,
                               @Param("lat") double lat,
                               @Param("lng") double lng,
                               @Param("radius") Integer radius);

    int existsByNameAndCoords(@Param("name") String name,
                              @Param("lat") double lat,
                              @Param("lng") double lng);

    int insertOne(MapInfo mapInfo);

    /** name + lat + lng 기준 부분 갱신 */
    int updateByNaturalKey(MapInfo mapInfo);


    List<MapInfo> findAllByOptions(@Param("categoryId") Integer categoryId,
                                   @Param("lat") double lat,
                                   @Param("lng") double lng,
                                   @Param("radius") int radius);
    int getCountOfOptions(@Param("categoryId") Integer categoryId,
                          @Param("lat") double lat,
                          @Param("lng") double lng,
                          @Param("radius") int radius);
}