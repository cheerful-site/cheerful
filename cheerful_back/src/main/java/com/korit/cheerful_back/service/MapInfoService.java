package com.korit.cheerful_back.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.korit.cheerful_back.domain.map.MapInfo;
import com.korit.cheerful_back.domain.map.MapInfoMapper;
import com.korit.cheerful_back.dto.map.GoogleDetailsRespDto;
import com.korit.cheerful_back.dto.map.MapInfoRespDto;
import com.korit.cheerful_back.dto.map.MapSearchReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MapInfoService {

    private final MapInfoMapper mapInfoMapper;
    private final GooglePlacesClient google;
    private final ObjectMapper om = new ObjectMapper();

    private static final int MIN_RESULTS = 10;
    private static final int PATCH_TOP_N = 8;  // 즉시 보강할 개수

    public List<MapInfoRespDto> search(MapSearchReqDto req) {
        var first = mapInfoMapper.selectNearby(req.getCategoryId(), req.getLat(), req.getLng(), req.getRadiusMeters(), 100);
        if (first.size() >= MIN_RESULTS) return map(first);

        var api = google.nearby(req.getLat(), req.getLng(), req.getRadiusMeters(), req.getCategoryId());
        if (api != null && api.getResults() != null) {
            int patched = 0;
            for (var r : api.getResults()) {
                if (r.getGeometry() == null || r.getGeometry().getLocation() == null) continue;

                MapInfo m = new MapInfo();
                m.setMapInfoName(clean(r.getName()));
                m.setMapInfoCategoryId(req.getCategoryId());
                m.setMapInfoAddress(clean(r.getVicinity()));
                m.setMapInfoOperationTime("");     // 초기값 빈 문자열
                m.setMapInfoPhoneNumber("");       // 초기값 빈 문자열
                m.setMapInfoLat(r.getGeometry().getLocation().getLat());
                m.setMapInfoLng(r.getGeometry().getLocation().getLng());
                m.setMapInfoFullTime(Boolean.FALSE);

                // ✅ 기본 특이사항: 간단한 휴리스틱 (원하면 더 추가)
                m.setMapInfoContent(makeDefaultContent(req.getCategoryId(), m.getMapInfoName()));

                int exists = mapInfoMapper.existsByNameAndCoords(m.getMapInfoName(), m.getMapInfoLat(), m.getMapInfoLng());
                if (exists == 0) mapInfoMapper.insertOne(m);
                else             mapInfoMapper.updateByNaturalKey(m);

                // 상위 N개만 Details로 전화/영업시간/주소 보강
                if (patched < PATCH_TOP_N && r.getPlace_id() != null) {
                    var details = google.details(r.getPlace_id());  // GoogleDetailsResponse
                    if (details != null && details.getResult() != null) {
                        var dr = details.getResult();
                        MapInfo u = new MapInfo();
                        u.setMapInfoName(m.getMapInfoName());
                        u.setMapInfoLat(m.getMapInfoLat());
                        u.setMapInfoLng(m.getMapInfoLng());
                        u.setMapInfoAddress(defaultIfBlank(dr.getFormatted_address(), m.getMapInfoAddress()));
                        u.setMapInfoPhoneNumber(defaultIfBlank(dr.getFormatted_phone_number(), m.getMapInfoPhoneNumber()));
                        u.setMapInfoOperationTime(summarizeWeekdayText(dr.getOpening_hours())); // ✅ 요약
                        // 24시간 여부 추정
                        u.setMapInfoFullTime(looks24Hours(dr.getOpening_hours(), m.getMapInfoName()));
                        mapInfoMapper.updateByNaturalKey(u);
                    }
                    patched++;
                }
            }
        }

        var finalList = mapInfoMapper.selectNearby(req.getCategoryId(), req.getLat(), req.getLng(), req.getRadiusMeters(), 100);
        return map(finalList);
    }

    private static String clean(String s) { return s == null ? null : s.trim(); }

    private static String defaultIfBlank(String s, String def) {
        return (s == null || s.isBlank()) ? def : s.trim();
    }

    /** 요일별 텍스트를 한 줄 요약으로 (길이 255 내) */
    private String summarizeWeekdayText(GoogleDetailsRespDto.OpeningHours oh) {
        if (oh == null || oh.getWeekday_text() == null || oh.getWeekday_text().isEmpty()) return "";
        // "월요일: 09:00–18:00" -> "월 09:00–18:00"로 가볍게 치환
        var sb = new StringBuilder();
        for (String s : oh.getWeekday_text()) {
            String shortDay = s.replace("요일", "").replace(" ", ""); // “월요일: 09:00–18:00” -> “월:09:00–18:00”
            sb.append(shortDay).append(" | ");
        }
        String out = sb.substring(0, sb.length() - 3);
        // 길이 초과 방지
        if (out.length() > 255) out = out.substring(0, 252) + "...";
        return out;
    }

    /** 간단한 24시간 추정 */
    private Boolean looks24Hours(GoogleDetailsRespDto.OpeningHours oh, String name) {
        if (oh != null && oh.getWeekday_text() != null) {
            boolean all = oh.getWeekday_text().stream().allMatch(t ->
                    t.contains("24") || t.contains("24시간") || t.contains("24:00") || t.contains("00:00"));
            if (all) return Boolean.TRUE;
        }
        if (name != null && (name.contains("24시") || name.contains("24시간"))) return Boolean.TRUE;
        return Boolean.FALSE;
    }

    /** 카테고리별 기본 특이사항 텍스트(초기값) */
    private String makeDefaultContent(int categoryId, String name) {
        switch (categoryId) {
            case 1: // 병원
                if (name != null && (name.contains("24시") || name.contains("24시간"))) {
                    return "24시간 응급 진료 가능";
                }
                return ""; // 취급 동물은 수동/향후 크롤링으로 보강
            case 2: // 카페
                return ""; // 동반 규정/견종 사이즈는 수동/화이트리스트로 보강 권장
            case 3: // 쉘터
                return "";
            default:
                return "";
        }
    }

    private static List<MapInfoRespDto> map(List<MapInfo> list) {
        return list.stream().map(mi -> new MapInfoRespDto(
                mi.getMapInfoId(),
                mi.getMapInfoName(),
                mi.getMapInfoCategoryId(),
                mi.getMapInfoAddress(),
                mi.getMapInfoPhoneNumber(),
                mi.getMapInfoLat(),
                mi.getMapInfoLng(),
                mi.getMapInfoOperationTime(),      // ✅ 여기에 최종 요약 저장
                Boolean.TRUE.equals(mi.getMapInfoFullTime()),
                mi.getMapInfoContent()
        )).toList();
    }
}