package com.korit.cheerful_back.domain.map;

import lombok.Data;

@Data
public class MapInfoSearchOption {
    private Integer categoryId;
    private Double mapInfoLat;
    private Double mapInfoLng;
    private Integer radius;
}
