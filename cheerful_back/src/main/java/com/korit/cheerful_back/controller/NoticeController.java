package com.korit.cheerful_back.controller;

import com.korit.cheerful_back.dto.notice.NoticeRegisterReqDto;
import com.korit.cheerful_back.dto.response.ResponseDto;
import com.korit.cheerful_back.service.AdminService;
import com.korit.cheerful_back.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    //    private final NoticeService noticeService;
//    private final AdminService adminService;
//
//    /*
//        멀티파트로 전달된 이미지파일과 함께 공지사항 글을 등록
//        @ModelAttribute 로 DTO 바인딩
//     */
//    @PostMapping
//    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute NoticeRegisterReqDto dto) {
//        return ResponseEntity.ok(ResponseDto.success("공지사항 글을 등록하였습니다."));
//    }
//
    /*
        공지사항 페이징 목록 조회
     */
    @GetMapping("/{categoryId}")
    public ResponseEntity<ResponseDto<?>> getNotices(@RequestParam Integer page, @RequestParam Integer size, @PathVariable Integer categoryId) {
        // 페이지네이션
        System.out.println(page);
        System.out.println(size);
        System.out.println(categoryId);
        return ResponseEntity.ok(ResponseDto.success(noticeService.getNoticeList(page, size, categoryId)));
    }
//
//    /*
//        특정 공지사항 글에 좋아요 추가
//     */
//    @PostMapping
//    public ResponseEntity<ResponseDto<?>> getLike() {
//        return ResponseEntity.ok(ResponseDto.success("좋아요"));
//    }
//
//    /*
//        특정 공지사항 글을 좋아요 취소
//     */
//    @DeleteMapping
//    public ResponseEntity<ResponseDto<?>> getDisLike() {
//        return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
//    }
//
//    /*
//        특정 글 클릭해서 내용 보기
//     */
//    @GetMapping
//    public ResponseEntity<ResponseDto<?>> getNoticeContent() {
//        return ResponseEntity.ok(ResponseDto.success(null));
//    }
//
//    /*
//        특정 글 조회수
//     */
//    @PostMapping
//    public ResponseEntity<ResponseDto<?>> getNoticeViews() {
//        return ResponseEntity.ok(ResponseDto.success(null));
//    }

}
