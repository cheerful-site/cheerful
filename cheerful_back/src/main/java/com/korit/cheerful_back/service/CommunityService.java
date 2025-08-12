package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityLikeMapper;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.communityComment.CommunityComment;
import com.korit.cheerful_back.domain.communityComment.CommunityCommentMapper;
import com.korit.cheerful_back.domain.communityImg.CommunityImg;
import com.korit.cheerful_back.domain.communityImg.CommunityImgMapper;
import com.korit.cheerful_back.dto.community.CommunityCommentRegisterReqDto;
import com.korit.cheerful_back.dto.community.CommunityRegisterReqDto;
import com.korit.cheerful_back.dto.community.CommunitySearchReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityMapper communityMapper;
    private final FileService fileService;
    private final PrincipalUtil principalUtil;
    private final CommunityImgMapper communityImgMapper;
    private final CommunityLikeMapper communityLikeMapper;
    private final CommunityCommentMapper communityCommentMapper;

    /*
        커뮤니티 글 등록 + 이미지 저장
     */
    @Transactional(rollbackFor = Exception.class)
    public void register(CommunityRegisterReqDto dto) {
        // [수정①] 카테고리 검증: '전체(=1)'로는 저장 금지 + null 방지
        if (dto.getCommunityCategoryId() == null || dto.getCommunityCategoryId() == 1) {
            throw new IllegalArgumentException("‘전체’ 카테고리에는 게시글을 등록할 수 없습니다.");
        }

        // files null-safe
        var files = dto.getFiles() == null ? List.<MultipartFile>of() : dto.getFiles();

        // 1) 파일 업로드 -> 저장 경로 수집
        List<String> uploadFilepath = dto.getFiles()
                .stream()
                .map(file -> "/community/" + fileService.uploadFile(file, "/community"))
                .peek(newFileName -> System.out.println(newFileName))
                .collect(Collectors.toList());

        // 2) 사용자 식별
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        // 3) 게시글 저장
        Community community = Community.builder()
                .userId(userId)
                .communityCategoryId(dto.getCommunityCategoryId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        communityMapper.insert(community);

        // 4) 이미지 저장
        AtomicInteger atomicInteger = new AtomicInteger(0);
        List<CommunityImg> communityImgs = uploadFilepath.stream()
                .map(path -> CommunityImg.builder()
                        .seq(atomicInteger.getAndIncrement() + 1)
                        .communityId(community.getCommunityId())
                        .imgPath(path)
                        .build())
                .collect(Collectors.toList());
//        communityImgMapper.insertMany(communityImgs);

        if (!communityImgs.isEmpty()) {
            communityImgMapper.insertMany(communityImgs);
        }

//        System.out.println(uploadFilepath);
    }

    /*
        카테고리별 커뮤니티 목록 조회
        categoryId가 1이면 전체 조회
     */
    public List<Community> getCommunity(Integer categoryId) {
        Integer userId = null;
//        if (principalUtil.getPrincipalUser() != null && principalUtil.getPrincipalUser().getUser() != null) {
//            userId = principalUtil.getPrincipalUser().getUser().getUserId();
//        }
        try {
            if (principalUtil.getPrincipalUser() != null && principalUtil.getPrincipalUser().getUser() != null) {
                userId = principalUtil.getPrincipalUser().getUser().getUserId();
            }
        } catch (Exception ignore) {}
        return communityMapper.findByCategoryId(categoryId, userId);
    }

    /*
        커뮤니티 페이징 목록 조회
     */
    public PaginationRespDto<?> getCommunityList(Integer page, Integer size) {
        CommunitySearchOption searchOption = CommunitySearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
//                .userId(principalUtil.getPrincipalUser().getUser().getUserId())
                .build();

        // 총 건수 / 총 페이지 / 마지막 여부 계산
        List<Community> contests = communityMapper.findAllOfOptions(searchOption);
        Integer totalElements = communityMapper.getCountOfOptions(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page.equals(totalPages);

        return PaginationRespDto.<Community>builder()
                .content(contests)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .isLast(isLast)
                .page(page)
                .size(size)
                .build();
    }

    /*
        좋아요 추가
     */
    public void like(Integer communityId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        communityLikeMapper.insert(communityId, userId);
    }

    /*
        좋아요 취소
     */
    public void disLike(Integer communityId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        communityLikeMapper.delete(communityId, userId);
    }

    /*
        댓글 조회
     */
    public List<CommunityComment> getComment(Integer communityId) {
        return communityCommentMapper.findAllByCommunityId(communityId);
    }

    /*
        댓글 작성
     */
    public Integer registerComment(CommunityCommentRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        communityCommentMapper.insert(dto.toEntity(userId));
        return communityCommentMapper.getCountByCommentId(dto.getCommunityId());
    }

}
