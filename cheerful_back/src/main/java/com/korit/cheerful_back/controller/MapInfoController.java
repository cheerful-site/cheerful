package com.korit.cheerful_back.controller;


import com.korit.cheerful_back.domain.map.MapInfo;
import com.korit.cheerful_back.dto.map.MapSearchReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.MapInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@RequiredArgsConstructor
public class MapInfoController {

    private final MapInfoService mapInfoService;

    @GetMapping("/search")
    public ResponseEntity<ResponseDto<?>> search(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "3000") int radius,
            @RequestParam int categoryId
    ) {
        var req = new MapSearchReqDto(lat, lng, radius, categoryId);
        var result = mapInfoService.search(req);
        System.out.println(categoryId);
        return ResponseEntity.ok(ResponseDto.success(result));
    }

    /*
        Map 조회
     */
    @GetMapping("/{categoryId}")
    public ResponseEntity<ResponseDto<?>> getMapInfo(@PathVariable Integer categoryId, @RequestParam double lat,
                                                     @RequestParam double lng,
                                                     @RequestParam(defaultValue = "5000") int radius) {
        List<MapInfo> mapInfoList = mapInfoService.mapInfoList(categoryId, lat, lng, radius);
        return ResponseEntity.ok(ResponseDto.success(mapInfoList));
    }
}