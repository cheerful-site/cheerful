package com.korit.cheerful_back.service;

import com.korit.cheerful_back.dto.map.GoogleDetailsRespDto;
import com.korit.cheerful_back.dto.map.GoogleNearbyRespDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;

@Service
public class GooglePlacesClient {

    @Value("${google.places.api-key}")
    private String apiKey;

    @Value("${google.places.nearby-url:https://maps.googleapis.com/maps/api/place/nearbysearch/json}")
    private String nearbyUrl;

    @Value("${google.places.details-url:https://maps.googleapis.com/maps/api/place/details/json}")
    private String detailsUrl;

    private final RestClient rest = RestClient.create();

    /** 카테고리→공식 type 매핑: 유효 타입만 사용 */
    private String typeFor(int categoryId) {
        return switch (categoryId) {
            case 1 -> "veterinary_care"; // 동물병원
            case 2 -> "cafe";            // 카페
            case 3 -> null;              // 보호소: 공식 type 없음 → keyword만
            default -> null;
        };
    }

    /** 카테고리→키워드 */
    private String keywordFor(int categoryId) {
        return switch (categoryId) {
            case 1 -> "동물병원 수의과 vet animal hospital 24시";
            case 2 -> "반려동물 동반 애견 카페 pet friendly dog cafe";
            case 3 -> "유기견 보호소 동물 보호소 animal shelter rescue";
            default -> "";
        };
    }

    public GoogleNearbyRespDto nearby(double lat, double lng, int radius, int categoryId) {
        String type = typeFor(categoryId);
        String keyword = keywordFor(categoryId);

        UriComponentsBuilder b = UriComponentsBuilder.fromHttpUrl(nearbyUrl)
                .queryParam("location", lat + "," + lng)
                .queryParam("radius", radius)
                .queryParam("language", "ko")
                .queryParam("region", "KR")
                .queryParam("key", apiKey);

        if (StringUtils.hasText(type))    b.queryParam("type", type);
        if (StringUtils.hasText(keyword)) b.queryParam("keyword", keyword);

        // ✅ 인코딩 필수(한글/공백 안전)
        URI uri = b.build().encode(StandardCharsets.UTF_8).toUri();

        GoogleNearbyRespDto resp = rest.get()
                .uri(uri)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (rq, rs) ->
                { throw new RuntimeException("Google Nearby HTTP " + rs.getStatusCode()); })
                .body(GoogleNearbyRespDto.class);

        // ✅ 구글 응답 status 검사 (HTTP 200이라도 실패 가능)
        if (resp == null || resp.getStatus() == null || !"OK".equalsIgnoreCase(resp.getStatus())) {
            String status = resp == null ? "null" : resp.getStatus();
            throw new IllegalStateException("Google Nearby status=" + status);
        }
        return resp;
    }

    public GoogleDetailsRespDto details(String placeId) {
        URI uri = UriComponentsBuilder.fromHttpUrl(detailsUrl)
                .queryParam("place_id", placeId)
                .queryParam("fields", "name,formatted_address,opening_hours,formatted_phone_number,website")
                .queryParam("language", "ko")
                .queryParam("region", "KR")
                .queryParam("key", apiKey)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        GoogleDetailsRespDto resp = rest.get()
                .uri(uri)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (rq, rs) ->
                { throw new RuntimeException("Google Details HTTP " + rs.getStatusCode()); })
                .body(GoogleDetailsRespDto.class);

        if (resp == null || resp.getStatus() == null || !"OK".equalsIgnoreCase(resp.getStatus())) {
            String status = resp == null ? "null" : resp.getStatus();
            throw new IllegalStateException("Google Details status=" + status);
        }
        return resp;
    }
}
