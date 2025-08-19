package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoodService {

  private final FileService fileService;
  private final FoodMapper foodMapper;

  /*
    food 글 등록 (admin)
   */
//  public void register(FoodRegisterReqDto dto) {
//    List<String> uploadFilePath = dto.getFiles()
//        .stream()
//        .map(file -> "/food/" + fileService.uploadFile(file, "/food"))
//        .peek(newFileName -> System.out.println(newFileName))
//        .collect(Collectors.toList());
//  }

  /*
    food 페이징 목록 조회
   */
  public PaginationRespDto<Food> getFoodList(Integer page, Integer size) {
    FoodSearchOption searchOption = FoodSearchOption.builder()
        .startIndex((page - 1) * size)
        .endIndex(size * page)
        .size(size)
        .build();

    List<Food> contents = foodMapper.findAllByOptions(searchOption);
    Integer totalElements = foodMapper.getCountOfOptions(searchOption);
    Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
    Boolean isLast = page.equals(totalPages);

    return PaginationRespDto.<Food>builder()
        .content(contents)
        .totalElements(totalElements)
        .totalPages(totalPages)
        .isLast(isLast)
        .page(page)
        .size(size)
        .build();
  }

}
