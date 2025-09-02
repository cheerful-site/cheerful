package com.korit.cheerful_back.domain.mapInfoCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapInfoCategory {

    private Integer mapInfoCategoryId;
    private String mapInfoCategoryName;
}
