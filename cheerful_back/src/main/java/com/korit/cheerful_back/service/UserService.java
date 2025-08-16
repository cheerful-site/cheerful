package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import java.util.List;

import com.korit.cheerful_back.dto.response.PaginationRespDto;
import com.korit.cheerful_back.dto.user.UserSearchReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/*
  사용자 관리 서비스 (관리자용)
 */
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserMapper userMapper;

  /*
    사용자 검색 결과를 페이징 처리해서 반환
   */
  public PaginationRespDto<User> searchUsers(UserSearchReqDto dto) {
    Integer totalElements = userMapper.getCountOfOptions(dto.toOption());
    Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
    List<User> foundUsers = userMapper.findAllBySearchOption(dto.toOption());
    boolean isLast = dto.getPage().equals(totalPages);

    return PaginationRespDto.<User>builder()
            .content(foundUsers)
            .totalElements(totalElements)
            .totalPages(totalPages)
            .isLast(isLast)
            .page(dto.getPage())
            .size(dto.getSize())
            .build();
  }

  /*
    전달된 사용자 id 목록을 모두 삭제
   */
  @Transactional(rollbackFor = Exception.class)
  public void delete(List<Integer> userIds) {
    userMapper.deleteByUserIds(userIds);
  }
}
