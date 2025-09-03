package com.korit.cheerful_back.service;


import com.korit.cheerful_back.domain.map.MapInfo;
import com.korit.cheerful_back.domain.map.MapInfoMapper;
import com.korit.cheerful_back.domain.mapInfoCategory.MapInfoCategory;
import com.korit.cheerful_back.domain.mapInfoCategory.MapInfoCategoryMapper;
import com.korit.cheerful_back.dto.map.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class MapInfoService {

    private final MapInfoMapper mapInfoMapper;
    private final MapInfoCategoryMapper mapInfoCategoryMapper;
    private final GooglePlacesClient google;

    private static final int MIN_RESULTS = 10;
    private static final int PATCH_TOP_N  = 25;

    public List<MapInfoRespDto> search(MapSearchReqDto dto) {

        // 0) 캐시 우선
        var cached = mapInfoMapper.selectNearby(
            dto.getCategoryId(), dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        if (cached.size() >= MIN_RESULTS) return MapInfoRespDto.map(cached);

        // 1) 카테고리별 수집
        List<GoogleNearbyRespDto.Result> results = switch (dto.getCategoryId()) {
            case 1 -> queryForHospital(dto);
            case 2 -> queryForCafe(dto);
            case 3 -> queryForShelter(dto);
            default -> new ArrayList<>();
        };

        // 2) 저장 + 라이트 보강 (업서트 금지: 존재 확인 후 삽입/수정)
        var seen = new HashSet<String>(); // 배치 중복 방지(place_id 기반으로 이미 합쳐졌지만 방어)
        for (var result : results) {
            if (result == null || result.getGeometry() == null || result.getGeometry().getLocation() == null) continue;

            MapInfo mapInfo = new MapInfo();
            mapInfo.setMapInfoName(clean(result.getName()));
            mapInfo.setMapInfoCategoryId(dto.getCategoryId());
            mapInfo.setMapInfoAddress(defaultIfBlank(clean(result.getVicinity()), "")); // NOT NULL 보호
            mapInfo.setMapInfoOperationTime("");
            mapInfo.setMapInfoPhoneNumber("");
            mapInfo.setMapInfoLat(result.getGeometry().getLocation().getLat());
            mapInfo.setMapInfoLng(result.getGeometry().getLocation().getLng());
            mapInfo.setMapInfoFullTime(Boolean.FALSE);
            mapInfo.setMapInfoContent(buildContent(dto.getCategoryId(), mapInfo.getMapInfoName(), null, null));

            String natKey = mapInfo.getMapInfoName() + "|" + mapInfo.getMapInfoLat() + "|" + mapInfo.getMapInfoLng();
            if (!seen.add(natKey)) continue;

            int exists = mapInfoMapper.existsByNameAndCoords(
                mapInfo.getMapInfoName(), mapInfo.getMapInfoLat(), mapInfo.getMapInfoLng());
            if (exists == 0) mapInfoMapper.insertOne(mapInfo);
            else            mapInfoMapper.updateByNaturalKey(mapInfo);

            // 라이트 디테일 보강
            if (result.getPlace_id() != null) {
                var details = google.detailsLight(result.getPlace_id());
                if (details != null && details.getResult() != null) {
                    var detailResult = details.getResult();

                    // 영업시간: current_opening_hours 우선
                    var pref = preferOpeningHours(detailResult);
                    String operation = summarizeHours(pref);
                    boolean full = looks24Hours(pref, mapInfo.getMapInfoName());

                    // 전화: formatted → international → 기존
                    String phone = normalizePhoneKR(firstNonBlank(
                            detailResult.getFormatted_phone_number(),
                            detailResult.getInternational_phone_number(),
                            mapInfo.getMapInfoPhoneNumber()
                    ));

                    // 주소: formatted → 기존 → 빈 문자열, 국가 prefix 제거
                    String address = trimKR(firstNonBlank(
                            detailResult.getFormatted_address(),
                            mapInfo.getMapInfoAddress(),
                            ""
                    ));

                    MapInfo info = new MapInfo();
                    info.setMapInfoName(mapInfo.getMapInfoName());
                    info.setMapInfoLat(mapInfo.getMapInfoLat());
                    info.setMapInfoLng(mapInfo.getMapInfoLng());
                    info.setMapInfoOperationTime(operation);
                    info.setMapInfoFullTime(full);
                    info.setMapInfoPhoneNumber(defaultIfBlank(phone, mapInfo.getMapInfoPhoneNumber()));
                    info.setMapInfoAddress(defaultIfBlank(address, mapInfo.getMapInfoAddress()));

                    // content 비었으면(또는 24시간 새로 판정되면) 재생성
                    if (mapInfo.getMapInfoContent() == null || mapInfo.getMapInfoContent().isBlank() || full) {
                        String content = buildContent(dto.getCategoryId(), mapInfo.getMapInfoName(), detailResult, full);
                        if (content != null) info.setMapInfoContent(content);
                    }

                    mapInfoMapper.updateByNaturalKey(info);
                }
            }
        }

        // 3) 콘텐츠 빈 항목 상위 N개만 추가 보강
        var needEnrich = mapInfoMapper.selectNearby(
            dto.getCategoryId(), dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());

        int enriched = 0;
        for (var mapInfo : needEnrich) {
            if (enriched >= PATCH_TOP_N) break;
            if (mapInfo.getMapInfoContent() != null && !mapInfo.getMapInfoContent().isBlank()) continue;

            var maybe = results.stream().filter(result ->
                    result.getPlace_id() != null &&
                            equals(clean(result.getName()), mapInfo.getMapInfoName()) &&
                            almostEqual(result.getGeometry().getLocation().getLat(), mapInfo.getMapInfoLat()) &&
                            almostEqual(result.getGeometry().getLocation().getLng(), mapInfo.getMapInfoLng())
            ).findFirst();

            if (maybe.isEmpty()) continue;

            var detailResult = google.detailsEnrich(maybe.get().getPlace_id());
            if (detailResult != null && detailResult.getResult() != null) {
                String content = buildContent(mapInfo.getMapInfoCategoryId(), mapInfo.getMapInfoName(), detailResult.getResult(), mapInfo.getMapInfoFullTime());
                if (content != null && !content.isBlank()) {
                    MapInfo update = new MapInfo();
                    update.setMapInfoName(mapInfo.getMapInfoName());
                    update.setMapInfoLat(mapInfo.getMapInfoLat());
                    update.setMapInfoLng(mapInfo.getMapInfoLng());
                    update.setMapInfoContent(content);
                    mapInfoMapper.updateByNaturalKey(update);
                }
            }
            enriched++;
        }

        // 4) 최종 반환
        var finalList = mapInfoMapper.selectNearby(
                dto.getCategoryId(), dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        return MapInfoRespDto.map(finalList);
    }

    // opening_hours가 없으면 current_opening_hours를 사용
    private GoogleDetailsRespDto.OpeningHours preferOpeningHours(GoogleDetailsRespDto.Result result) {
        if (result == null) return null;
        if (result.getOpening_hours() != null) return result.getOpening_hours();
        return result.getCurrent_opening_hours();
    }

    // ---------- 카테고리별 조회 ----------
    private List<GoogleNearbyRespDto.Result> queryForHospital(MapSearchReqDto dto) {
        var r1 = google.nearbyAllPages("veterinary_care", null,
                dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        var r2 = google.nearbyAllPages(null, "동물병원|수의과|애견병원|vet",
                dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        var r3 = google.nearbyAllPages("hospital", "동물|반려동물|애견",
                dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        return mergeByPlaceId(r1, r2, r3);
    }

    private List<GoogleNearbyRespDto.Result> queryForCafe(MapSearchReqDto dto) {
        var r1 = google.nearbyAllPages("cafe", "반려동물|애견|dog|pet|동반",
                dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        var r2 = google.nearbyAllPages(null, "반려동물 동반|애견카페|pet friendly|dog cafe",
                dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
        return mergeByPlaceId(r1, r2);
    }

    private List<GoogleNearbyRespDto.Result> queryForShelter(MapSearchReqDto dto) {
        return google.nearbyAllPages(null, "유기견|동물 보호소|animal shelter|rescue",
                dto.getMapInfoLat(), dto.getMapInfoLng(), dto.getRadius());
    }

    @SafeVarargs
    private final List<GoogleNearbyRespDto.Result> mergeByPlaceId(List<GoogleNearbyRespDto.Result>... lists) {
        var seen = new HashSet<String>();
        var out  = new ArrayList<GoogleNearbyRespDto.Result>();
        for (var list : lists) {
            if (list == null) continue;
            for (var var : list) {
                if (var == null || var.getPlace_id() == null) continue;
                if (seen.add(var.getPlace_id())) out.add(var);
            }
        }
        return out;
    }

    // ---------- 보조 ----------
    private static String clean(String text) {
        return text == null ? null : text.trim();
    }

    private static boolean equals(String first, String second) {
        return Objects.equals(first == null ? null : first.trim(),
                second == null ? null : second.trim());
    }

    private static boolean almostEqual(Double first, Double second) {
        if (first == null || second == null) return false;
        return Math.abs(first - second) < 0.0005; // 약 ±55m
    }

    private static String defaultIfBlank(String text, String defaultValue) {
        return (text == null || text.isBlank()) ? defaultValue : text.trim();
    }

    // 여러 값 중 첫 번째 non-blank
    private static String firstNonBlank(String... values) {
        if (values == null) return null;
        for (String value : values) {
            if (value != null && !value.isBlank()) return value.trim();
        }
        return null;
    }

    // 전화번호: +82 → 0으로, 공백 정리
    private static String normalizePhoneKR(String phone) {
        if (phone == null) return null;
        String phoneNumber = phone.trim();
        if (phoneNumber.startsWith("+82")) {
            phoneNumber = "0" + phoneNumber.substring(3);
        }
        phoneNumber = phoneNumber.replaceAll("[^0-9]", "");
        // 간단 포맷팅 (02/지역/휴대폰)
        if (phoneNumber.startsWith("02")) {
            if (phoneNumber.length() >= 9) return phoneNumber.replaceFirst("(02)(\\d{3,4})(\\d{4})","$1-$2-$3");
        } else if (phoneNumber.startsWith("0")) {
            if (phoneNumber.length() >= 10) return phoneNumber.replaceFirst("(0\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3");
        }
        return phone;
    }

    // 주소에서 '대한민국 ' / 'South Korea ' 제거
    private static String trimKR(String address) {
        if (address == null) return null;
        String out = address.trim()
                .replaceFirst("^대한민국\\s*", "")
                .replaceFirst("^South Korea\\s*", "");
        return out;
    }

    private String summarizeHours(GoogleDetailsRespDto.OpeningHours openingHours) {
        if (openingHours == null || openingHours.getWeekday_text() == null || openingHours.getWeekday_text().isEmpty()) return "";
        var stringBuilder = new StringBuilder();
        for (String line : openingHours.getWeekday_text()) {
            String date = line.replace("요일", "").replace(" ", "");
            stringBuilder.append(date).append(" | ");
        }
        String out = stringBuilder.substring(0, stringBuilder.length() - 3);
        return out.length() > 255 ? out.substring(0, 252) + "..." : out;
    }

    private boolean looks24Hours(GoogleDetailsRespDto.OpeningHours openingHours, String name) {
        if (openingHours != null && openingHours.getWeekday_text() != null) {
            boolean all = openingHours.getWeekday_text().stream().allMatch(time ->
                    time.contains("24") || time.contains("24시간") || time.contains("24:00") || time.contains("00:00"));
            if (all) return true;
        }
        String names = name == null ? "" : name;
        return names.contains("24시") || names.contains("24시간");
    }

    // content 생성: 카테고리/이름 + (선택)Details 리뷰 기반
    private String buildContent(int categoryId, String name,
                                GoogleDetailsRespDto.Result dr, Boolean fullTime) {
        Set<String> tags = new LinkedHashSet<>();
        String names = (name == null) ? "" : name;

        if (categoryId == 1) { // 병원
            if (Boolean.TRUE.equals(fullTime) || names.contains("24시") || names.contains("24시간"))
                tags.add("24시간 응급 진료 가능");
            if (names.contains("고양이")) tags.add("고양이 전문");
            if (names.contains("치과")) tags.add("치과 진료");
            if (names.contains("안과")) tags.add("안과 진료");
            if (names.contains("피부")) tags.add("피부과 진료");
            if (names.contains("정형")) tags.add("정형외과");
        } else if (categoryId == 2) { // 카페
            if (names.contains("대형")) tags.add("대형견 출입 가능");
            if (names.contains("중형")) tags.add("중형견 출입 가능");
            if (names.contains("소형")) tags.add("소형견 출입 가능");
        }

        if (dr != null) {
            String overview = (dr.getEditorial_summary() != null)
                    ? dr.getEditorial_summary().getOverview() : "";
            String reviewsText = gatherReviewText(dr.getReviews());
            String body = (overview + " " + reviewsText).toLowerCase();

            if (categoryId == 1) {
                if (containsAny(body, "emergency", "응급", "야간", "심야")) tags.add("야간/응급");
                if (containsAny(body, "bird","avian","조류","앵무")) tags.add("조류 진료");
                if (containsAny(body, "reptile","파충","거북","도마뱀","뱀")) tags.add("파충류 진료");
                if (containsAny(body, "hamster","hedgehog","ferret","토끼","패럿","소동물","exotic"))
                    tags.add("소동물/특수동물 진료");
                if (containsAny(body, "derma","dermatology","피부")) tags.add("피부과 진료");
                if (containsAny(body, "dental","치과")) tags.add("치과 진료");
                if (containsAny(body, "ophthal","안과")) tags.add("안과 진료");
                if (containsAny(body, "x-ray","초음파","영상")) tags.add("영상의학/검사");
                if (containsAny(body, "hospitalize","입원")) tags.add("입원실 보유");
                if (containsAny(body, "reserve","reservation","예약")) tags.add("예약 우선");
            } else if (categoryId == 2) {
                if (containsAny(body, "no kids","노키즈")) tags.add("노키즈존");
                if (containsAny(body, "large dog","대형견")) tags.add("대형견 출입 가능");
                if (containsAny(body, "medium dog","중형견")) tags.add("중형견 출입 가능");
                if (containsAny(body, "small dog","소형견")) tags.add("소형견 출입 가능");
                if (containsAny(body, "leash","리드줄","목줄")) tags.add("리드줄 필수");
                if (containsAny(body, "muzzle","케이지","캐리어","입마개","carrier")) tags.add("케이지/입마개 지침");
                if (containsAny(body, "admission","입장료","입장비")) tags.add("입장료 있음");
                if (containsAny(body, "playground","play zone","놀이터","운동장")) tags.add("놀이터/운동장");
                if (containsAny(body, "photo zone","포토존")) tags.add("포토존");
                if (containsAny(body, "outdoor","terrace","patio","야외","테라스")) tags.add("야외 좌석");
                if (containsAny(body, "pool","수영장")) tags.add("강아지 수영장");
                if (containsAny(body, "reserve","reservation","예약")) tags.add("예약 권장");
            }
        }

        if (tags.isEmpty()) return "";
        return String.join(" · ", tags);
    }

    private boolean containsAny(String haystackLower, String... kws) {
        if (haystackLower == null) return false;
        for (String k : kws) {
            if (k != null && !k.isBlank() && haystackLower.contains(k.toLowerCase())) return true;
        }
        return false;
    }

    // 최대 5개의 리뷰들을 모아 하나의 문자열로 만들어 반환
    private String gatherReviewText(List<GoogleDetailsRespDto.Review> reviews) {
        if (reviews == null) return "";
        var stringBuilder = new StringBuilder();
        int count = 0;
        for (var review : reviews) {
            if (review != null && review.getText() != null && !review.getText().isBlank()) {
                stringBuilder.append(' ').append(review.getText());
                if (++count >= 5) break;
            }
        }
        return stringBuilder.toString();
    }


    public List<MapInfo> mapInfoList(Integer categoryId, double lat, double lng, int radius) {
        return mapInfoMapper.findAllByOptions(categoryId, lat, lng, radius);
    }
}
