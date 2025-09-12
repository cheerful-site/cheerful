package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.admin.AdminLoginReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AdminService adminService;

    /*
        관리자 전용 사용자 관리 API
    */
    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(adminService.login(dto)));
    }

}
