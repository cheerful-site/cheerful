package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.user.UserMapper;
import java.util.List;
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
    전달된 사용자 id 목록을 모두 삭제
   */
  @Transactional(rollbackFor = Exception.class)
  public void delete(List<Integer> userIds) {
    userMapper.deleteByUserIds(userIds);
  }
}
