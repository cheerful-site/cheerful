package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.communityImg.CommunityImg;
import com.korit.cheerful_back.domain.communityImg.CommunityImgMapper;
import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityMapper communityMapper;
    private final FileService fileService;
    private final PrincipalUtil principalUtil;
    private final CommunityImgMapper communityImgMapper;

    @Transactional(rollbackFor = Exception.class)
    public void register(CommunityRegisterReqDto dto) {
        List<String> uploadFilepath = dto.getFiles()
                .stream()
                .map(file -> "/community/" + fileService.uploadFile(file, "/community"))
                .peek(newFileName -> System.out.println(newFileName))
                .collect(Collectors.toList());

        Integer userId = principalUtil.getPrinciplaUser().getUser().getUserId();
        Community community = Community.builder()
                .userId(userId)
                .content(dto.getContent())
                .build();
        communityMapper.insert(community);

        AtomicInteger atomicInteger = new AtomicInteger(0);
        List<CommunityImg> communityImgs = uploadFilepath.stream()
                .map(path -> CommunityImg.builder()
                        .seq(atomicInteger.getAndIncrement() + 1)
                        .communityId(community.getCommunityId())
                        .imgPath(path)
                        .build())
                .collect(Collectors.toList());
        communityImgMapper.insertMany(communityImgs);

        System.out.println(uploadFilepath);
    }

    public Community getCommunity(Integer communityId) {
        Integer userId = principalUtil.getPrinciplaUser().getUser().getUserId();
        return communityMapper.findByCommunityId(communityId, userId);
    }

    public PaginationRespDto<Community> getCommunityList(Integer page, Integer size) {
        CommunitySearchOption searchOption = CommunitySearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .userId(principalUtil.getPrinciplaUser().getUser().getUserId())
                .build();

        List<Community> contests = communityMapper.findAllBySearchOption(searchOption);
        Integer totalElements = communityMapper.getCountOfOptions(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page.equals(totalPages);
        return PaginationRespDto.<Community>builder()
                .content(contests)
                .totalElements(totalElements)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }
}
