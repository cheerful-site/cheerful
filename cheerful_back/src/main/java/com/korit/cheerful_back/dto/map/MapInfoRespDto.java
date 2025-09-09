package com.korit.cheerful_back.dto.map;

import com.korit.cheerful_back.domain.map.MapInfo;
import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapInfoRespDto {
  private Integer mapInfoId;
  private String name;
  private Integer categoryId;
  private String address;
  private String phoneNumber;
  private String operationTime;
  private String breakTime;
  private Boolean fullTime;
  private Boolean specialAnimal;
  private String content;

  private MapInfoLocationDto mapInfoLocationDto;


  // ---------- DTO 변환 ----------
  public static List<MapInfoRespDto> map(List<MapInfo> list) {
    return list.stream().map(mapInfo -> new MapInfoRespDto(
            mapInfo.getMapInfoId(),
            mapInfo.getMapInfoName(),
            mapInfo.getMapInfoCategoryId(),
            mapInfo.getMapInfoAddress(),
            mapInfo.getMapInfoPhoneNumber(),
            mapInfo.getMapInfoOperationTime(),
            mapInfo.getMapInfoBreakTime(),
            Boolean.TRUE.equals(mapInfo.getMapInfoFullTime()),
            Boolean.TRUE.equals(mapInfo.getMapInfoSpecialAnimal()),
            mapInfo.getMapInfoContent(),
            new MapInfoLocationDto(mapInfo.getMapInfoLat(), mapInfo.getMapInfoLng())
    )).toList();
  }

}
