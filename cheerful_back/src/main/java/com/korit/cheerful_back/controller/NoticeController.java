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

    /*
        공지사항 페이징 목록 조회
     */
    @GetMapping("/{categoryId}")
    public ResponseEntity<ResponseDto<?>> getNotices(@RequestParam Integer page, @RequestParam Integer size, @PathVariable Integer categoryId) {
        // 페이지네이션
//        System.out.println(page);
//        System.out.println(size);
//        System.out.println(categoryId);
        return ResponseEntity.ok(ResponseDto.success(noticeService.getNoticeList(page, size, categoryId)));
    }

    /*
        특정 공지사항 글에 좋아요 추가
     */
    @PostMapping("/{noticeId}/like")
    public ResponseEntity<ResponseDto<?>> getLike(@PathVariable Integer noticeId) {
        noticeService.like(noticeId);
        return ResponseEntity.ok(ResponseDto.success("좋아요"));
    }

    /*
        특정 공지사항 글을 좋아요 취소
     */
    @DeleteMapping("/{noticeId}/disLike")
    public ResponseEntity<ResponseDto<?>> getDisLike(@PathVariable Integer noticeId) {
        noticeService.disLike(noticeId);
        return ResponseEntity.ok(ResponseDto.success("좋아요 취소"));
    }

    /*
        특정 글 클릭해서 내용 보기
     */
    @GetMapping("/{categoryId}/{noticeId}")
    public ResponseEntity<ResponseDto<?>> getNoticeContent(@PathVariable Integer categoryId, @PathVariable Integer noticeId) {
//        System.out.println(categoryId);
//        System.out.println(noticeId);
        return ResponseEntity.ok(ResponseDto.success(noticeService.getNoticeContent(categoryId, noticeId)));
    }

    /*
        특정 글 조회수
     */
    @PostMapping("/{categoryId}/{noticeId}")
    public ResponseEntity<ResponseDto<?>> getNoticeViews(@PathVariable Integer categoryId, @PathVariable Integer noticeId) {
//        System.out.println(categoryId);
//        System.out.println(noticeId);
        int views = noticeService.increaseViews(categoryId, noticeId);
        if (views > 0) {
            views = 0;
        }
        return ResponseEntity.ok(ResponseDto.success(views));
    }
}
