package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.user.UserMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserMapper userMapper;

  // 관리자 권한
  @Transactional(rollbackFor = Exception.class)
  public void delete(List<Integer> userIds) {
    userMapper.deleteByUserIds(userIds);
  }
}
