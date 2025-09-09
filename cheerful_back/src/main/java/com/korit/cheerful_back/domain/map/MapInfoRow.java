package com.korit.cheerful_back.domain.map;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapInfoRow {
  private String  mapInfoName;
  private Integer mapInfoCategoryId;
  private String  mapInfoAddress;
  private String  mapInfoOpeningHours;
  private String  mapInfoOperationTime;
  private String  mapInfoPhoneNumber;
  private Double  mapInfoLat;
  private Double  mapInfoLng;
  private Integer mapInfoFullTime;
  private String  mapInfoContent;
}