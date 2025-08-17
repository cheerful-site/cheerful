package com.korit.cheerful_back.domain.food;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodSearchOption {
    private Integer startIndex;
    private Integer endIndex;
    private Integer size;
    private String searchText;
}
