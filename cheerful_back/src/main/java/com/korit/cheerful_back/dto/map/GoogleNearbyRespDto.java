package com.korit.cheerful_back.dto.map;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.stream.Location;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleNearbyRespDto {

    private List<Result> results;
    private String status;
    @JsonProperty("next_page_token")
    private String next_page_token;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Result {
        private String place_id;
        private String name;
        private String vicinity;              // 주소 유사
        private Geometry geometry;
        private Double rating;                // (우린 저장 안함)
        private Integer user_ratings_total;   // (우린 저장 안함)
        private OpeningHours opening_hours;   // open_now만 제공
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Geometry {
        private Location location;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Location {
        private double lat;
        private double lng;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OpeningHours {
        private boolean open_now;
    }
}
