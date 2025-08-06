package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.dto.CommunityRegisterReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityMapper communityMapper;

    public void register(CommunityRegisterReqDto dto) {
//        List<String>
    }
}
