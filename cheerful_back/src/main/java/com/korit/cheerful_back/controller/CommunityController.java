package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.response.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class CommunityController {

    @PostMapping
    public ResponseEntity<ResponseDto<?>> register() {
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
