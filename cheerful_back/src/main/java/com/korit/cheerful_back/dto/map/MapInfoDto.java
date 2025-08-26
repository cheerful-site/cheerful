package com.korit.cheerful_back.dto.map;

import lombok.*;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapInfoDto {
  private String name;
  private String address;
  private Map<String, String> opening_hours;
  private String operation_time;
  private String phone;
  private Double lat;
  private Double lng;
  private Boolean full_time;
  private String content;

}
