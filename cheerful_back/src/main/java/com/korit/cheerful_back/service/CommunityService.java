package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityMapper communityMapper;

    public void register(CommunityRegisterReqDto dto) {
//        List<String>
    }
}
