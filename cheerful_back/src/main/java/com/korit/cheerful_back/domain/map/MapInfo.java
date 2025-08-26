package com.korit.cheerful_back.domain.map;

import lombok.*;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapInfo {
  private Long   mapInfoId;
  private String mapInfoName;
  private Integer mapInfoCategoryId;
  private String mapInfoAddress;
  private Map<String, String> openingHours;
  private String operationTime;
  private String phoneNumber;
  private Double lat;
  private Double lng;
  private Boolean fullTime;
  private String content;
}
