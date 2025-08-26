package com.korit.cheerful_back.dto.map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Period;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleDetailsRespDto {
    private Result result;
    private String status;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Result {
        private String formatted_address;
        private OpeningHours opening_hours;
        private String formatted_phone_number;
        private String website;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OpeningHours {
        private Boolean open_now;
        private java.util.List<String> weekday_text;
    }

//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    public static class Period {
//        private Time open; private Time close;
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    public static class Time {
//        private Integer day; private String time;
//    }
}
