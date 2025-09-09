package com.korit.cheerful_back.dto.map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapSearchReqDto {

    private double mapInfoLat;
    private double mapInfoLng;
    private Integer radius;
    private Integer categoryId;

}
