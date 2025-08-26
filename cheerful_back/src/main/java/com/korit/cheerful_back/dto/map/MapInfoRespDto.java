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
  private String operationTime;   // 사람이 읽는 영업시간 요약
  private Boolean fullTime;
  private String content;         // 특이사항
}
