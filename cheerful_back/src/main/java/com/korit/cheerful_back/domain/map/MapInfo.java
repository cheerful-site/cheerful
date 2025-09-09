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
  private String mapInfoPhoneNumber;
  private Double mapInfoLat;
  private Double mapInfoLng;
  private String mapInfoOperationTime;
  private String mapInfoBreakTime;
  private Boolean mapInfoFullTime;
  private Boolean mapInfoSpecialAnimal;
  private String mapInfoContent;

  private MapInfoCategory mapInfoCategory;

}
