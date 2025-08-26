package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.MapInfoQueryService;
import com.korit.cheerful_back.service.MapInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/map-infos")
public class MapInfoController {

  private final MapInfoService mapInfoService;
  private final MapInfoQueryService mapInfoQueryService;

  // 예: /api/v1/map/ingest?region=부산광역시&type=HOSPITAL&limit=20
  @PostMapping("/ingest")
  public ResponseEntity<?> ingest(@RequestParam String region,
      @RequestParam(defaultValue = "시/도") String level,
      @RequestParam String type,       // HOSPITAL|CAFE|SHELTER
      @RequestParam(defaultValue = "20") int limit) {
    int inserted = mapInfoService.ingest(region, level, type, limit);
    return ResponseEntity.ok().body("inserted=" + inserted);
  }

  // 지도 관련 정보를 조회
  @GetMapping("/maps")
  public ResponseEntity<ResponseDto<?>> search(
      @RequestParam(required = false) Integer categoryId,
      @RequestParam(required = false) String q,
      @RequestParam(required = false) Double swLat,
      @RequestParam(required = false) Double swLng,
      @RequestParam(required = false) Double neLat,
      @RequestParam(required = false) Double neLng,
      @RequestParam(defaultValue = "1") Integer page,
      @RequestParam(defaultValue = "20") Integer size
  ) {
    var res = mapInfoQueryService.search(categoryId, q, swLat, swLng, neLat, neLng, page, size);
    return ResponseEntity.ok(ResponseDto.success(res));
  }

}
