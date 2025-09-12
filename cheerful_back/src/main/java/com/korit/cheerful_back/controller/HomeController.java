package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.domain.map.MapInfo;
import com.korit.cheerful_back.dto.map.MapInfoRespDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.HomeService;
import com.korit.cheerful_back.service.MapInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class HomeController {

  private final HomeService homeService;

  @GetMapping("/bestcommunity")
  public ResponseEntity<ResponseDto<?>> getCommunityCards() {
//    System.out.println(homeService.getCommunityCards());
    return ResponseEntity.ok(ResponseDto.success(homeService.getCommunityCards()));
  }

  @GetMapping("/bestfood")
  public ResponseEntity<ResponseDto<?>> getFoodCards() {
    return ResponseEntity.ok(ResponseDto.success(homeService.getFoodCards()));
  }

  @GetMapping("/map")
  public ResponseEntity<ResponseDto<?>> getMapInfo(@RequestParam double lat,
                                                   @RequestParam double lng,
                                                   @RequestParam(defaultValue = "3000") int radius) {
    List<MapInfo> mapInfoHome = homeService.mapInfoHomeList(1, lat, lng, radius);
    List<MapInfoRespDto> dtoList = MapInfoRespDto.map(mapInfoHome);

    return ResponseEntity.ok(ResponseDto.success(dtoList));
  }

}
