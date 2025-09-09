package com.korit.cheerful_back.domain.foodImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodImg {
    private Integer foodImgId;
    private Integer foodId;
    private Integer seq;
    private String imgPath;
    private String imgUrl;
}
