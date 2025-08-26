package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.map.MapInfoMapper;
import com.korit.cheerful_back.domain.map.MapInfoRow;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MapInfoQueryService {

  private final MapInfoMapper mapInfoMapper;

  /**
   * 지도 장소 검색 + 페이징
   *
   * @param categoryId  (nullable) 1:병원, 2:카페, 3:보호소
   * @param q           (nullable) 이름/주소 키워드
   * @param swLat       (nullable) 남서-위도
   * @param swLng       (nullable) 남서-경도
   * @param neLat       (nullable) 북동-위도
   * @param neLng       (nullable) 북동-경도
   * @param page        1-base
   * @param size        페이지 크기
   */
  public PaginationRespDto<MapInfoRow> search(
      Integer categoryId,
      String q,
      Double swLat, Double swLng,
      Double neLat, Double neLng,
      Integer page, Integer size
  ) {
    int p = (page == null || page < 1) ? 1 : page;
    int s = (size == null || size < 1 || size > 100) ? 20 : size;
    int offset = (p - 1) * s;

    String keyword = trimToNull(q);

    int total = mapInfoMapper.count(categoryId, keyword, swLat, swLng, neLat, neLng);
    List<MapInfoRow> rows = total == 0
        ? List.of()
        : mapInfoMapper.search(categoryId, keyword, swLat, swLng, neLat, neLng, offset, s);

    int totalPages = (int) Math.ceil(total / (double) s);
    boolean isLast = p >= Math.max(totalPages, 1);

    return PaginationRespDto.<MapInfoRow>builder()
        .content(rows)
        .totalElements(total)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(p)
        .size(s)
        .build();
  }

  private String trimToNull(String s) {
    return (s == null || s.isBlank()) ? null : s.trim();
  }

}
