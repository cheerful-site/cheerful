package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.notice.NoticeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMapper noticeMapper;

}
