package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.admin.Admin;
import com.korit.cheerful_back.domain.admin.AdminMapper;
import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.dto.admin.AdminLoginReqDto;
import com.korit.cheerful_back.dto.admin.TokenDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.exception.auth.LoginException;
import com.korit.cheerful_back.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AdminMapper adminMapper;
    private final CommunityMapper communityMapper;

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


    /*
        admin 전용 커뮤니티 페이징 목록 조회
     */
    public PaginationRespDto<Community> getCommunitySearchList(Integer page, Integer size, Integer categoryId, String searchText) {
        CommunitySearchOption searchOption = CommunitySearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .categoryId(categoryId)
                .searchText(searchText)
                .build();

        // 총 건수 / 총 페이지 / 마지막 여부 계산
        List<Community> contents = communityMapper.findAllBySearchOption(searchOption);
        Integer totalElements = communityMapper.getCountOfSearchOption(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page >= totalPages;

        return PaginationRespDto.<Community>builder()
                .content(contents)
                .categoryId(categoryId)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }
}
