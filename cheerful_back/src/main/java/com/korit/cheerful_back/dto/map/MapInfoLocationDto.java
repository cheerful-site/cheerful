package com.korit.cheerful_back.dto.map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapInfoLocationDto {
    private Double mapInfoLat;
    private Double mapInfoLng;
}
