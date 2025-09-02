package com.korit.cheerful_back.dto.map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Period;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleDetailsRespDto {

//    private String status;
//
//    @JsonProperty("error_message")
//    private String error_message;
//
//    private Result result;
//
//    // ---------- nested ----------
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @JsonIgnoreProperties(ignoreUnknown = true)
//    public static class Result {
//        private String name;
//
//        @JsonProperty("formatted_address")
//        private String formatted_address;
//
//        @JsonProperty("formatted_phone_number")
//        private String formatted_phone_number;
//
//        @JsonProperty("international_phone_number")
//        private String international_phone_number;
//
//        private String website;
//
//        @JsonProperty("opening_hours")
//        private OpeningHours opening_hours;
//
//        @JsonProperty("current_opening_hours")
//        private OpeningHours current_opening_hours;
//
//        private List<String> types;
//
//        @JsonProperty("user_ratings_total")
//        private Integer user_ratings_total;
//
//        @JsonProperty("editorial_summary")
//        private EditorialSummary editorial_summary;
//
//        private List<Review> reviews;
//
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @JsonIgnoreProperties(ignoreUnknown = true)
//    public static class OpeningHours {
//        @JsonProperty("open_now") private Boolean open_now;
//        @JsonProperty("weekday_text") private List<String> weekday_text;
//        private List<Period> periods;
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @JsonIgnoreProperties(ignoreUnknown = true)
//    public static class Period {
//        private Time open;
//        private Time close;
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @JsonIgnoreProperties(ignoreUnknown = true)
//    public static class Time {
//        private Integer day;
//        private String time;
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @JsonIgnoreProperties(ignoreUnknown = true)
//    public static class EditorialSummary {
//        private String overview; // 자유서술 요약
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @JsonIgnoreProperties(ignoreUnknown = true)
//    public static class Review {
//        private String language;
//        private String text;
//    }
}