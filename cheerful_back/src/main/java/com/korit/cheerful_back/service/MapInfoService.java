package com.korit.cheerful_back.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korit.cheerful_back.domain.map.MapInfoMapper;
import com.korit.cheerful_back.domain.map.MapInfoRow;
import com.korit.cheerful_back.dto.map.MapInfoDto;
import com.korit.cheerful_back.dto.openAi.ChatCompletionDto;
import com.korit.cheerful_back.dto.openAi.ChatRequestMsgDto;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MapInfoService {

  private final ChatGPTService chatGPTService;
  private final MapInfoMapper mapInfoMapper;
  private final ObjectMapper objectMapper;
  private final MapInfoQueryService mapInfoQueryService;


  // 카테고리명 -> ID 매핑
  private static final Map<String, Integer> CATEGORY = Map.of(
      "HOSPITAL", 1,
      "CAFE",     2,
      "SHELTER",  3
  );

  public int ingest(String region, String level, String type, int limit) {
    // type: HOSPITAL|CAFE|SHELTER
    Integer categoryId = CATEGORY.get(type.toUpperCase(Locale.ROOT));
    if (categoryId == null) throw new IllegalArgumentException("invalid type: " + type);

    String system = """
            You are a data provider that returns **only JSON**.
            Return places in South Korea strictly in the following JSON schema:
            {
              "places":[
                {
                  "name": "...",
                  "address": "...",
                  "opening_hours": {"mon":"09:00-18:00","tue":"...","wed":"...","thu":"...","fri":"...","sat":"...","sun":"..."},
                  "operation_time": "24시간/평일9-18 등 요약 가능(없으면 빈문자열)",
                  "phone": "051-000-0000",
                  "lat": 35.1234567,
                  "lng": 129.1234567,
                  "full_time": false,
                  "content": ""
                }
              ]
            }
            - opening_hours keys must be mon,tue,wed,thu,fri,sat,sun (lowercase).
            - Omit commentary. Output valid JSON only.
        """;

    String user = new StringBuilder()
            .append("지역: ").append(region != null ? region : "").append(" (")
            .append(level != null ? level : "").append(")\n")
            .append("범위설명: ").append(type != null ? type : "").append("\n")
            .append("개수: ").append(limit).append("개 이내")
            .toString();

    ChatCompletionDto req = ChatCompletionDto.builder()
        .model("gpt-4o-mini")   // 사용 모델은 환경에 맞춰 교체
        .messages(List.of(
            ChatRequestMsgDto.builder().role("system").content(system).build(),
            ChatRequestMsgDto.builder().role("user").content(user).build()
        ))
        .build();

    Map<String, Object> result = chatGPTService.prompt(req);

    // OpenAI 응답에서 content(JSON)만 추출
    String json = extractContent(result); // 아래 helper 참고

    // JSON → DTO
    List<MapInfoDto> places = parsePlaces(json);

    // DTO → Row로 변환 + 검증/정규화
    List<MapInfoRow> rows = places.stream()
        .map(p -> toRow(p, categoryId))
        .filter(Objects::nonNull)
        .collect(Collectors.toList());

    // 대량 삽입(중복 무시)
    if (rows.isEmpty()) return 0;
    return mapInfoMapper.bulkInsertIgnore(rows);
  }

  private String extractContent(Map<String, Object> result) {
    // { choices: [ { message: { content: "...json..." } } ] } 형태를 가정
    try {
      var choices = (List<Map<String,Object>>) result.get("choices");
      var msg = (Map<String,Object>) ((Map<String,Object>)choices.get(0)).get("message");
      return (String) msg.get("content");
    } catch (Exception e) {
      throw new IllegalStateException("OpenAI 응답 파싱 실패: " + e.getMessage(), e);
    }
  }

  private List<MapInfoDto> parsePlaces(String json) {
    try {
      Map<String, Object> root = objectMapper.readValue(json, new TypeReference<>() {});
      var arr = (List<Map<String, Object>>) root.get("places");
      return objectMapper.convertValue(arr, new TypeReference<List<MapInfoDto>>() {});
    } catch (Exception e) {
      // 방어적으로 "그냥 배열"로 내려오는 경우도 대응
      try {
        return objectMapper.readValue(json, new TypeReference<List<MapInfoDto>>() {});
      } catch (Exception ex) {
        throw new IllegalStateException("장소 JSON 파싱 실패", ex);
      }
    }
  }

  private MapInfoRow toRow(MapInfoDto p, Integer categoryId) {
    if (p.getName() == null || p.getAddress() == null) return null;

    Double lat = safeDouble(p.getLat());
    Double lng = safeDouble(p.getLng());
    // 한국 좌표 간단 검증
    if (lat != null && (lat < 33.0 || lat > 39.5)) lat = null;
    if (lng != null && (lng < 124.0 || lng > 132.0)) lng = null;

    // opening_hours → JSON 문자열
    String ohJson = null;
    try {
      if (p.getOpening_hours() != null) {
        ohJson = new ObjectMapper().writeValueAsString(p.getOpening_hours());
      }
    } catch (Exception ignore) { }

    return MapInfoRow.builder()
        .mapInfoName(p.getName().trim())
        .mapInfoCategoryId(categoryId)
        .mapInfoAddress(p.getAddress().trim())
        .mapInfoOpeningHours(ohJson)
        .mapInfoOperationTime(emptyToNull(p.getOperation_time()))
        .mapInfoPhoneNumber(emptyToNull(p.getPhone()))
        .mapInfoLat(lat)
        .mapInfoLng(lng)
        .mapInfoFullTime(Boolean.TRUE.equals(p.getFull_time()) ? 1 : 0)
        .mapInfoContent(emptyToNull(p.getContent()) != null ? p.getContent().trim() : "")
        .build();
  }

  private Double safeDouble(Double d) { return (d == null || d.isNaN() || d.isInfinite()) ? null : d; }
  private String emptyToNull(String s) { return (s == null || s.isBlank()) ? null : s.trim(); }

  public Map<String,Object> search(Integer categoryId, String q,
      Double swLat, Double swLng, Double neLat, Double neLng,
      int page, int size) {
    int offset = (page - 1) * size;
    List<MapInfoRow> content = mapInfoMapper.search(categoryId, q, swLat, swLng, neLat, neLng, offset, size);
    int total = mapInfoMapper.count(categoryId, q, swLat, swLng, neLat, neLng);
    int totalPages = (int)Math.ceil(total / (double)size);
    return Map.of(
        "content", content,
        "totalElements", total,
        "totalPages", totalPages,
        "page", page,
        "size", size,
        "isLast", page >= totalPages
    );
  }

}
