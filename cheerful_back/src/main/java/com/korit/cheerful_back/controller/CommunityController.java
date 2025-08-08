package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/community/")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute CommunityRegisterReqDto dto) {
        communityService.register(dto);
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @GetMapping("{communityId}")
    public ResponseEntity<?> getCommunity(@PathVariable Integer communityId) {
        return null;
    }

    @GetMapping("/community")
    public ResponseEntity<ResponseDto<?>> getCommunities(@PathVariable Integer page, @PathVariable Integer size) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }


    @PostMapping("/{communityId}/like")
    public ResponseEntity<ResponseDto<?>> getLike(@PathVariable Integer communityId) {
        return ResponseEntity.ok(ResponseDto.success("좋아요"));
    }

    @DeleteMapping("/{communityId}/disLike")
    public ResponseEntity<ResponseDto<?>> getDisLike(@PathVariable Integer communityId) {
        return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
    }

    @GetMapping("/community/{communityId}/comments")
    public ResponseEntity<ResponseDto<?>> getComment(@PathVariable Integer communityId) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @PostMapping("/community/{communityId}/comments")
    public ResponseEntity<ResponseDto<?>> registerComment() {
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
