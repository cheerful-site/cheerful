package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.admin.Admin;
import com.korit.cheerful_back.domain.admin.AdminMapper;
import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.dto.admin.AdminLoginReqDto;
import com.korit.cheerful_back.dto.admin.TokenDto;
import com.korit.cheerful_back.exception.auth.LoginException;
import com.korit.cheerful_back.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AdminMapper adminMapper;

    public TokenDto login(AdminLoginReqDto dto) {

        Admin foundAdmin = adminMapper.findByAdminId(dto.getAdminLoginId());
        if (foundAdmin == null) {
            throw new LoginException("로그인 오류", "관리자 정보를 다시 확인하세요.");
        }
        if (!passwordEncoder.matches(dto.getPassword(), foundAdmin.getPassword())) {
            throw new LoginException("로그인 오류", "관리자 정보를 다시 확인하세요.");
        }
        return TokenDto.builder()
                .accessToken(jwtUtil.generateAdminAccessToken(foundAdmin))
                .build();
    }
}
