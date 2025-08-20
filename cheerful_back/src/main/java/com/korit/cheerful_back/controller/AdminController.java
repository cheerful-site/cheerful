package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.notice.NoticeRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /*
        사용자 조회
     */
//    @GetMapping("/manager/users")
//    public ResponseEntity<ResponseDto<PaginationRespDto<User>>> searchUsers(UserSearchReqDto dto) {
//        return ResponseEntity.ok(ResponseDto.success(adminService.searchUsers(dto)));
//    }

    @GetMapping("/users")
    public ResponseEntity<ResponseDto<?>> managerUsers(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(adminService.getUserSearchList(page, size, searchText)));
    }

    /*
        사용자 삭제
     */
    @DeleteMapping("/users")
    public ResponseEntity<ResponseDto<?>> deleteUserIds(@RequestParam List<Integer> userIds) {
        adminService.deleteUser(userIds);
        return ResponseEntity.ok(ResponseDto.success("회원 정보를 삭제하였습니다."));
    }

    /*
        community 조회
     */
    @GetMapping("/communities/{categoryId}")
    public ResponseEntity<ResponseDto<?>> managerCommunity(@RequestParam Integer page, @RequestParam Integer size
            , @PathVariable Integer categoryId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(adminService.getCommunitySearchList(page, size, categoryId, searchText)));
    }

    /*
        community 삭제
     */
    @DeleteMapping("/communities/{categoryId}")
    public ResponseEntity<ResponseDto<?>> deleteCommunityIds(@RequestParam List<Integer> communityIds) {
        adminService.deleteCommunity(communityIds);
        return ResponseEntity.ok(ResponseDto.success("community 정보를 삭제하였습니다."));
    }

    /*
        food 조회
     */
    @GetMapping("/foods")
    public ResponseEntity<ResponseDto<?>> managerFood(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
//        System.out.println(page);
//        System.out.println(size);
//        System.out.println(adminService.getFoodSearchList(page, size, searchText));
        return ResponseEntity.ok(ResponseDto.success(adminService.getFoodSearchList(page, size, searchText)));
    }

    /*
        food 글 등록
     */
    @PostMapping("/foods")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute FoodRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success("food 글을 등록했습니다."));
    }

    /*
        food 삭제
     */
    @DeleteMapping("/foods")
    public ResponseEntity<ResponseDto<?>> deleteFoodIds(@RequestParam List<Integer> foodIds) {
        adminService.deleteFood(foodIds);
        return ResponseEntity.ok(ResponseDto.success("food 정보를 삭제하였습니다."));
    }

    /*
        notice 조회
     */
    @GetMapping("/notice/{categoryId}")
    public ResponseEntity<ResponseDto<?>> managerNotice(@RequestParam Integer page, @RequestParam Integer size
        , @PathVariable Integer categoryId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(adminService.getNoticeSearchList(page, size, categoryId, searchText)));
    }

    /*
        notice 글 등록
     */
    @PostMapping("/notice/{categoryId}")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute NoticeRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success("notice 글을 등록하였습니다."));
    }

    /*
        notice 삭제
     */
    @DeleteMapping("/notice/{categoryId}")
    public ResponseEntity<ResponseDto<?>> deleteNoticeIds(@RequestParam List<Integer> noticeIds) {
        adminService.deleteNotice(noticeIds);
        return ResponseEntity.ok(ResponseDto.success("notice 정보를 삭제하였습니다."));
    }
}
