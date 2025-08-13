package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.community.CommunityCommentRegisterReqDto;
import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    /*
        멀티파트로 전달된 이미지파일과 함께 커뮤니티 글을 등록
        @ModelAttribute 로 DTO 바인딩
     */
    @PostMapping
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute CommunityRegisterReqDto dto) {
        System.out.println(dto);
//        communityService.register(dto);
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    /*
        특정 카테고리의 모든 커뮤니티 글을 조회
        categoryId가 1이면 전체 조회
     */
//    @GetMapping("/{categoryId}")
//    // 카테고리 이동시 카테고리 가져오기
//    public ResponseEntity<ResponseDto<?>> getCommunity(@PathVariable Integer categoryId) {
////        System.out.println(communityService.getCommunity(categoryId));
//        return ResponseEntity.ok(ResponseDto.success(communityService.getCommunity(categoryId)));
//    }

    /*
        커뮤니티 페이징 목록 조회
     */
    @GetMapping("/{categoryId}")
    //페이지네이션
    public ResponseEntity<ResponseDto<?>> getCommunities(@RequestParam Integer page, @RequestParam Integer size, @PathVariable Integer categoryId) {
        System.out.println(page);
        System.out.println(size);
        System.out.println(categoryId);
        System.out.println(communityService.getCommunityList(page, size, categoryId));
        return ResponseEntity.ok(ResponseDto.success(communityService.getCommunityList(page, size, categoryId)));
    }

    /*
        특정 커뮤니티 글에 좋아요 추가
     */
    @PostMapping("/{communityId}/like")
    public ResponseEntity<ResponseDto<?>> getLike(@PathVariable Integer communityId) {
        communityService.like(communityId);
        return ResponseEntity.ok(ResponseDto.success("좋아요"));
    }

    /*
        특정 커뮤니티 글을 좋아요 취소
     */
    @DeleteMapping("/{communityId}/disLike")
    public ResponseEntity<ResponseDto<?>> getDisLike(@PathVariable Integer communityId) {
        communityService.disLike(communityId);
        return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
    }

    /*
        특정 글의 댓글 목록 조회
     */
    @GetMapping("/{communityId}/comments")
    public ResponseEntity<ResponseDto<?>> getComment(@PathVariable Integer communityId) {
        return ResponseEntity.ok(ResponseDto.success(communityService.getComment(communityId)));
    }

    /*
        특정 글의 댓글 등록
     */
    @PostMapping("/{communityId}/comments")
    public ResponseEntity<ResponseDto<?>> registerComment(@RequestBody CommunityCommentRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(communityService.registerComment(dto)));
    }
}
