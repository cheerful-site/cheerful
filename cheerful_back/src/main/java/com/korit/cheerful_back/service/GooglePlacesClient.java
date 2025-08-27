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
import java.util.ArrayList;
import java.util.List;

@Service
public class GooglePlacesClient {

    @Value("${google.places.api-key}")
    private String apiKey;

    @Value("${google.places.nearby-url:https://maps.googleapis.com/maps/api/place/nearbysearch/json}")
    String nearbyUrl;

    @Value("${google.places.details-url:https://maps.googleapis.com/maps/api/place/details/json}")
    String detailsUrl;

    private final RestClient rest = RestClient.create();

    // ---- Nearby (한 페이지) ----
    public GoogleNearbyRespDto nearbyRaw(double lat, double lng, int radius,
                                         String type, String keyword) {
        var b = UriComponentsBuilder.fromHttpUrl(nearbyUrl)
                .queryParam("location", lat + "," + lng)
                .queryParam("radius", radius)
                .queryParam("language", "ko")
                .queryParam("region", "KR")
                .queryParam("key", apiKey);
        if (type != null && !type.isBlank()) b.queryParam("type", type);
        if (keyword != null && !keyword.isBlank()) b.queryParam("keyword", keyword);

        URI uri = b.build().encode(StandardCharsets.UTF_8).toUri();

        return rest.get().uri(uri).retrieve()
                .onStatus(HttpStatusCode::isError, (rq, rs) -> {
                    throw new RuntimeException("Nearby HTTP " + rs.getStatusCode());
                })
                .body(GoogleNearbyRespDto.class);
    }

    // ---- Nearby (모든 페이지, 최대 60개) ----
    public List<GoogleNearbyRespDto.Result> nearbyAllPages(String type, String keyword,
                                                           double lat, double lng, int radius) {
        var first = nearbyRaw(lat, lng, radius, type, keyword);
        var out = new ArrayList<GoogleNearbyRespDto.Result>();
        if (first != null && first.getResults() != null) out.addAll(first.getResults());

        String token = (first != null) ? first.getNext_page_token() : null;
        int page = 1;
        while (token != null && page < 3) {
            try { Thread.sleep(1800); } catch (InterruptedException ignored) {}
            var nextUri = UriComponentsBuilder.fromHttpUrl(nearbyUrl)
                    .queryParam("pagetoken", token)
                    .queryParam("language", "ko")
                    .queryParam("region", "KR")
                    .queryParam("key", apiKey)
                    .build().encode(StandardCharsets.UTF_8).toUri();

            var next = rest.get().uri(nextUri).retrieve()
                    .body(GoogleNearbyRespDto.class);

            if (next == null || next.getResults() == null || next.getResults().isEmpty()) break;
            out.addAll(next.getResults());
            token = next.getNext_page_token();
            page++;
        }
        return out;
    }

    // ---- Details: 라이트(주소/전화/영업시간) ----
    public GoogleDetailsRespDto detailsLight(String placeId) {
        URI uri = UriComponentsBuilder.fromHttpUrl(detailsUrl)
                .queryParam("place_id", placeId)
                .queryParam("fields", String.join(",",
                        "formatted_address",
                        "opening_hours",
                        "current_opening_hours",
                        "formatted_phone_number",
                        "international_phone_number",
                        "name"
                ))
                .queryParam("language", "ko")
                .queryParam("region", "KR")
                .queryParam("key", apiKey)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        return rest.get().uri(uri).retrieve()
                .onStatus(HttpStatusCode::isError, (rq, rs) -> {
                    throw new RuntimeException("Details(light) HTTP " + rs.getStatusCode());
                })
                .body(GoogleDetailsRespDto.class);
    }

    // ---- Details: 콘텐츠 보강 ----
    public GoogleDetailsRespDto detailsEnrich(String placeId) {
        URI uri = UriComponentsBuilder.fromHttpUrl(detailsUrl)
                .queryParam("place_id", placeId)
                .queryParam("fields", "types,editorial_summary,reviews")
                .queryParam("language", "ko")
                .queryParam("region", "KR")
                .queryParam("key", apiKey)
                .build().encode(StandardCharsets.UTF_8).toUri();

        return rest.get().uri(uri).retrieve()
                .onStatus(HttpStatusCode::isError, (rq, rs) -> {
                    throw new RuntimeException("Details(enrich) HTTP " + rs.getStatusCode());
                })
                .body(GoogleDetailsRespDto.class);
    }
}