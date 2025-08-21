package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.Community;
import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.community.CommunitySearchOption;
import com.korit.cheerful_back.domain.communityImg.CommunityImg;
import com.korit.cheerful_back.domain.food.Food;
import com.korit.cheerful_back.domain.food.FoodAdminRow;
import com.korit.cheerful_back.domain.food.FoodMapper;
import com.korit.cheerful_back.domain.food.FoodSearchOption;
import com.korit.cheerful_back.domain.foodImg.FoodImg;
import com.korit.cheerful_back.domain.foodImg.FoodImgMapper;
import com.korit.cheerful_back.domain.notice.Notice;
import com.korit.cheerful_back.domain.notice.NoticeMapper;
import com.korit.cheerful_back.domain.notice.NoticeSearchOption;
import com.korit.cheerful_back.domain.noticeImg.NoticeImg;
import com.korit.cheerful_back.domain.noticeImg.NoticeImgMapper;
import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.domain.user.UserSearchOption;
import com.korit.cheerful_back.dto.admin.AdminLoginReqDto;
import com.korit.cheerful_back.dto.admin.TokenDto;
import com.korit.cheerful_back.dto.food.FoodModifyReqDto;
import com.korit.cheerful_back.dto.food.FoodRegisterReqDto;
import com.korit.cheerful_back.dto.notice.NoticeRegisterReqDto;
import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.exception.auth.LoginException;
import com.korit.cheerful_back.security.jwt.JwtUtil;
import com.korit.cheerful_back.security.model.PrincipalUtil;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CommunityMapper communityMapper;
    private final UserMapper userMapper;
    private final FoodMapper foodMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final NoticeMapper noticeMapper;
    private final FoodImgMapper foodImgMapper;
    private final NoticeImgMapper noticeImgMapper;

    public TokenDto login(AdminLoginReqDto dto) {

        User foundUser = userMapper.findByUsername(dto.getUsername());
        if (foundUser == null) {
            throw new LoginException("로그인 오류", "관리자 정보를 다시 확인하세요.");
        }
        if (!passwordEncoder.matches(dto.getPassword(), foundUser.getPassword())) {
            throw new LoginException("로그인 오류", "관리자 정보를 다시 확인하세요.");
        }

//        System.out.println(jwtUtil.generateAccessToken(foundUser));

        return TokenDto.builder()
                .accessToken(jwtUtil.generateAccessToken(foundUser))
                .build();
    }

    public void join(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userMapper.insert(user);
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
    public PaginationRespDto<FoodAdminRow> getFoodSearchList(Integer page, Integer size, String searchText) {
        FoodSearchOption searchOption = FoodSearchOption.builder()
                .startIndex((page - 1) * size)
                .endIndex(size * page)
                .size(size)
                .searchText(searchText)
                .build();

        List<FoodAdminRow> contents = foodMapper.findAllBySearchOption(searchOption);
        Integer totalElements = foodMapper.getCountOfSearchOption(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page >= totalPages;

        return PaginationRespDto.<FoodAdminRow>builder()
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

    /*
        food 글 등록
   */
    @Transactional(rollbackFor = Exception.class)
    public void registerFood(FoodRegisterReqDto dto) {
//        List<String> uploadFilePath = dto.getFiles()
//            .stream()
//            .map(file -> "/food/" + fileService.uploadFile(file, "/food"))
//            .peek(newFileName -> System.out.println(newFileName))
//            .collect(Collectors.toList());

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Food food = Food.builder()
            .userId(userId)
            .title(dto.getTitle())
            .content(dto.getContent())
            .price(dto.getPrice())
            .build();
        foodMapper.insert(food);

//        AtomicInteger atomicInteger = new AtomicInteger(0);
//        List<FoodImg> foodImgs = uploadFilePath.stream()
//            .map(path -> FoodImg.builder()
//                .seq(atomicInteger.getAndIncrement() + 1)
//                .foodId(food.getFoodId())
//                .imgPath(path)
//                .build())
//            .collect(Collectors.toList());
//        foodImgMapper.insertMany(foodImgs);


        List<MultipartFile> imageFiles = dto.getFiles();

        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<FoodImg> foodImgs = new ArrayList<>();
            int seq = 1;

            for(MultipartFile file : imageFiles) {
                String imagePath = fileService.uploadFile(file, "food");

                FoodImg foodImg = FoodImg.builder()
                    .foodId(food.getFoodId())
                    .seq(seq++)
                    .imgPath(imagePath)
                    .build();

                foodImgs.add(foodImg);
            }

            foodImgMapper.insertMany(foodImgs);
        }
    }

    /*
        food 글 수정
     */
    public void modifyFood(FoodModifyReqDto dto) {
        Food food = dto.toEntity();

    }


    /*
        admin 전용 notice 페이징 목록 조회
     */
    public PaginationRespDto<Notice> getNoticeSearchList(Integer page, Integer size, Integer categoryId, String searchText) {
        NoticeSearchOption searchOption = NoticeSearchOption.builder()
            .startIndex((page - 1) * size)
            .endIndex(size * page)
            .size(size)
            .categoryId(categoryId)
            .searchText(searchText)
            .build();

        // 총 건수 / 총 페이지 / 마지막 여부 계산
        List<Notice> contents = noticeMapper.findAllBySearchOption(searchOption);
        Integer totalElements = noticeMapper.getCountOfSearchOption(searchOption);
        Integer totalPages = (int) Math.ceil(totalElements.longValue() / size.doubleValue());
        Boolean isLast = page >= totalPages;

        return PaginationRespDto.<Notice>builder()
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
        전달된 notice id 목록을 모두 삭제
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteNotice(List<Integer> noticeIds) {
        noticeMapper.deleteByNoticeIds(noticeIds);
    }

    /*
        notice 글 등록
    */
    @Transactional(rollbackFor = Exception.class)
    public void registerNotice(NoticeRegisterReqDto dto) {
        // 1) 파일이 존재할 경우에만 업로드 실행 > if문 사용
//        List<String> uploadFilepath = new ArrayList<>();
//
//        if (dto.getFiles() != null && !dto.getFiles().isEmpty()) {
//            uploadFilepath = dto.getFiles().stream()
//                    .filter(file -> file != null && !file.isEmpty()) // 빈 파일 제외
//                    .map(file -> "/notice/" + fileService.uploadFile(file, "/notice"))
//                    .peek(newFileName -> System.out.println(newFileName))
//                    .collect(Collectors.toList());
//        }

        // 2) 사용자 식별
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        // 3) 게시글 저장
        Notice notice = Notice.builder()
                .userId(userId)
                .noticeCategoryId(dto.getNoticeCategoryId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        noticeMapper.insert(notice);

//        if (!uploadFilepath.isEmpty()) {
//            AtomicInteger atomicInteger = new AtomicInteger(0);
//            List<NoticeImg> noticeImgs = uploadFilepath.stream()
//                    .map(path -> NoticeImg.builder()
//                            .seq(atomicInteger.getAndIncrement() + 1)
//                            .noticeId(notice.getNoticeId())
//                            .imgPath(path)
//                            .build())
//                    .collect(Collectors.toList());
//            noticeImgMapper.insertMany(noticeImgs);
//        }

        List<MultipartFile> imageFiles = dto.getFiles();

        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<NoticeImg> noticeImgs = new ArrayList<>();
            int seq = 1;

            for(MultipartFile file : imageFiles) {
                String imagePath = fileService.uploadFile(file, "notice");

                NoticeImg noticeImg = NoticeImg.builder()
                    .noticeId(notice.getNoticeId())
                    .seq(seq++)
                    .imgPath(imagePath)
                    .build();

                noticeImgs.add(noticeImg);
            }

            noticeImgMapper.insertMany(noticeImgs);
        }
    }

}