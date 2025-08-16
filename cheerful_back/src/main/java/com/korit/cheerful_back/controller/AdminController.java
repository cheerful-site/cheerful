package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.admin.AdminLoginReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.security.model.PrincipalAdmin;
import com.korit.cheerful_back.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(adminService.login(dto)));
    }

    @GetMapping("/principal")
    public ResponseEntity<ResponseDto<?>> principal(@AuthenticationPrincipal PrincipalAdmin principalAdmin) {
        if (principalAdmin == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(ResponseDto.success(principalAdmin));
    }

    @GetMapping("/manager/community/{categoryId}")
    public ResponseEntity<ResponseDto<?>> managerCommunity(@RequestParam Integer page, @RequestParam Integer size
            , @PathVariable Integer categoryId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(adminService.getCommunitySearchList(page, size, categoryId, searchText)));
    }
}
