package com.korit.cheerful_back.dto.map;

import lombok.*;
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
  private String phone;
  private Double lat;
  private Double lng;
  private String operationTime;
  private Boolean fullTime;
  private String content;
}
