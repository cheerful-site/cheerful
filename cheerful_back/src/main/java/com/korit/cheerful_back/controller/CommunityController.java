package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
