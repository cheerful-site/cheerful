package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

  private final SearchService searchService;

  /*
        community 조회
     */
  @GetMapping("/communities/{categoryId}")
  public ResponseEntity<ResponseDto<?>> managerCommunity(@RequestParam Integer page, @RequestParam Integer size
      , @PathVariable Integer categoryId, @RequestParam(required = false) String searchText) {
//    System.out.println(page+ " " + size+ " " + categoryId+ " " + searchText );
    return ResponseEntity.ok(ResponseDto.success(searchService.getCommunitySearchList(page, size, categoryId, searchText)));
  }

  /*
        food 조회
     */
  @GetMapping("/foods")
  public ResponseEntity<ResponseDto<?>> managerFood(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
//        System.out.println(page);
//        System.out.println(size);
//        System.out.println(adminService.getFoodSearchList(page, size, searchText));
//    System.out.println(page+ " " + size+ " " + searchText );
    return ResponseEntity.ok(ResponseDto.success(searchService.getFoodSearchList(page, size, searchText)));
  }

}
