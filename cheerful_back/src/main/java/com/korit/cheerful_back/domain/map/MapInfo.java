package com.korit.cheerful_back.domain.map;

import com.korit.cheerful_back.domain.mapInfoCategory.MapInfoCategory;
import lombok.*;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapInfo {
  private Integer mapInfoId;
  private String mapInfoName;
  private Integer mapInfoCategoryId;
  private String mapInfoAddress;
  private String mapInfoOperationTime;
  private String mapInfoPhoneNumber;
  private Double mapInfoLat;
  private Double mapInfoLng;
  private Boolean mapInfoFullTime;
  private String mapInfoContent;

  private MapInfoCategory mapInfoCategory;
}
