package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.admin.Admin;
import com.korit.cheerful_back.domain.admin.AdminMapper;
import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.domain.user.UserSearchOption;
import com.korit.cheerful_back.dto.admin.AdminLoginReqDto;
import com.korit.cheerful_back.dto.admin.TokenDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.exception.auth.LoginException;
import com.korit.cheerful_back.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AdminMapper adminMapper;
    private final CommunityMapper communityMapper;
    private final UserMapper userMapper;
    private final FoodMapper foodMapper;

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
        admin 전용 사용자 목록 조회
   */
    public PaginationRespDto<User> getUserSearchList(Integer page, Integer size, String searchText) {
        UserSearchOption searchOption = UserSearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .searchText(searchText)
                .build();

        List<User> contents = userMapper.findAllBySearchOption(searchOption);
        Integer totalElements = userMapper.getCountOfOptions(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= totalPages;

        return PaginationRespDto.<User>builder()
                .content(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }

    /*
        전달된 사용자 id 목록을 모두 삭제
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(List<Integer> userIds) {
        userMapper.deleteByUserIds(userIds);
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
//                .categoryId(categoryId)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }

    /*
        전달된 community id 목록을 모두 삭제
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteCommunity(List<Integer> communityIds) {
        communityMapper.deleteByCommunityIds(communityIds);
    }


    /*
        admin 전용 food 목록 조회
     */
    public PaginationRespDto<Food> getFoodSearchList(Integer page, Integer size, String searchText) {
        FoodSearchOption searchOption = FoodSearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .searchText(searchText)
                .build();

        List<Food> contents = foodMapper.findAllBySearchOption(searchOption);
        Integer totalElements = foodMapper.getCountOfSearchOption(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page >= totalPages;

        return PaginationRespDto.<Food>builder()
                .content(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }

    /*
        전달된 food id 목록을 모두 삭제
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteFood(List<Integer> foodIds) {
        foodMapper.deleteByFoodIds(foodIds);
    }
}