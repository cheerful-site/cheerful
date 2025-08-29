package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.domain.communityComment.CommunityComment;
import com.korit.cheerful_back.dto.food.FoodModifyReqDto;
import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.notice.NoticeModifyReqDto;
import com.korit.cheerful_back.dto.notice.NoticeRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import com.korit.cheerful_back.service.AdminService;
import com.korit.cheerful_back.util.ImageUrlUtil;
import jakarta.validation.Valid;
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
        사용자 삭제 (단일)
     */
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ResponseDto<?>> deleteUserId(@PathVariable Integer userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok(ResponseDto.success("회원 정보를 삭제하였습니다."));
    }

    /*
        사용자 삭제 (다중)
     */
    @DeleteMapping("/users")
    public ResponseEntity<ResponseDto<?>> deleteUserIds(@RequestBody List<Integer> userIds) {
//        System.out.println(userIds);
        adminService.deleteUsers(userIds);
        return ResponseEntity.ok(ResponseDto.success("회원 정보들을 삭제하였습니다."));
    }

    /*
        community 조회
     */
    @GetMapping("/communities")
    public ResponseEntity<ResponseDto<?>> managerCommunity(@RequestParam Integer page, @RequestParam Integer size
            , @RequestParam Integer communityCategoryId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(adminService.getCommunitySearchList(page, size, communityCategoryId, searchText)));
    }


    /*
        community 삭제 (단일)
     */
    @DeleteMapping("/communities/{communityId}")
    public ResponseEntity<ResponseDto<?>> deleteCommunityId(@PathVariable Integer communityId) {
        adminService.deleteCommunity(communityId);
        return ResponseEntity.ok(ResponseDto.success("community 정보를 삭제하였습니다."));
    }

    /*
        community 삭제 (다중)
     */
    @DeleteMapping("/communities")
    public ResponseEntity<ResponseDto<?>> deleteCommunityIds(@RequestBody List<Integer> communityIds) {
        adminService.deleteCommunities(communityIds);
        return ResponseEntity.ok(ResponseDto.success("community 정보들을 삭제하였습니다."));
    }

    /*
        community 댓글 삭제
     */
    @DeleteMapping("/communities/comments/{commentId}")
    public ResponseEntity<ResponseDto<?>> deleteCommunityComment(@PathVariable Integer commentId) {
        adminService.deleteCommunityComment(commentId);
        return ResponseEntity.ok(ResponseDto.success("community 댓글을 삭제했습니다."));
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
    public ResponseEntity<ResponseDto<?>> register(@Valid @ModelAttribute FoodRegisterReqDto dto) {
        System.out.println(dto);
        adminService.registerFood(dto);
        return ResponseEntity.ok(ResponseDto.success("food 글을 등록했습니다."));
    }

    /*
        food 삭제
     */
    @DeleteMapping("/foods")
    public ResponseEntity<ResponseDto<?>> deleteFoodIds(@RequestBody List<Integer> foodIds) {
        adminService.deleteFood(foodIds);
        return ResponseEntity.ok(ResponseDto.success("food 정보를 삭제하였습니다."));
    }

    /*
        food 수정
     */
    @PutMapping("/foods")
    public ResponseEntity<ResponseDto<?>> modifyFood(@ModelAttribute FoodModifyReqDto dto) {
        System.out.println(dto);
        adminService.modifyFood(dto);
        return ResponseEntity.ok(ResponseDto.success("food 정보를 수정하였습니다."));
    }

    /*
        food 댓글 삭제
     */
    @DeleteMapping("/foods/comments/{commentId}")
    public ResponseEntity<ResponseDto<?>> deleteFoodComment(@PathVariable Integer commentId) {
        adminService.deleteFoodComment(commentId);
        return ResponseEntity.ok(ResponseDto.success("food 댓글을 삭제했습니다."));
    }

    /*
        notice 조회
     */
    @GetMapping("/notice")
    public ResponseEntity<ResponseDto<?>> managerNotice(@RequestParam Integer page, @RequestParam Integer size
        , @RequestParam Integer noticeCategoryId, @RequestParam(required = false) String searchText) {
//        System.out.println(adminService.getNoticeSearchList(page, size, categoryId, searchText));
        return ResponseEntity.ok(ResponseDto.success(adminService.getNoticeSearchList(page, size, noticeCategoryId, searchText)));
    }

    /*
        notice 글 등록
     */
    @PostMapping("/notice")
    public ResponseEntity<ResponseDto<?>> register(@Valid @ModelAttribute NoticeRegisterReqDto dto) {
        adminService.registerNotice(dto);
        return ResponseEntity.ok(ResponseDto.success("notice 글을 등록하였습니다."));
    }

    /*
        notice 삭제
     */
    @DeleteMapping("/notice")
    public ResponseEntity<ResponseDto<?>> deleteNoticeIds(@RequestBody List<Integer> noticeIds) {
        System.out.println(noticeIds);
        adminService.deleteNotice(noticeIds);
        return ResponseEntity.ok(ResponseDto.success("notice 정보를 삭제하였습니다."));
    }

    /*
        notice 수정
     */
    @PutMapping("/notice")
    public ResponseEntity<ResponseDto<?>> modifyNotice(@ModelAttribute NoticeModifyReqDto dto) {
        System.out.println(dto);
        adminService.modifyNotice(dto);
        return ResponseEntity.ok(ResponseDto.success("notice 정보를 수정했습니다."));
    }

    /*
        notice event 댓글 삭제
     */
    @DeleteMapping("/notice/comments/{commentId}")
    public ResponseEntity<ResponseDto<?>> deleteNoticeComment(@PathVariable Integer commentId) {
        adminService.deleteNoticeComment(commentId);
        return ResponseEntity.ok(ResponseDto.success("notice 댓글을 삭제했습니다."));
    }
}