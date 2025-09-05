package com.korit.cheerful_back.service;

import com.korit.cheerful_back.domain.community.CommunityMapper;
import com.korit.cheerful_back.domain.user.MyWriteStatusMapper;
import com.korit.cheerful_back.domain.user.MyWriteStatusRow;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.dto.user.MyWriteStatusDto;
import com.korit.cheerful_back.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  private final MyWriteStatusMapper myWriteStatusMapper;
  private final PrincipalUtil principalUtil;

  public MyWriteStatusDto getMyWriteStatus() {
    Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
    if(userId == null) return MyWriteStatusDto.builder().build();

    MyWriteStatusRow r = myWriteStatusMapper.countMyStatus(userId);
    int posts = r.getCommunityPosts() + r.getFoodPosts() + r.getNoticePosts();
    int comments = r.getCommunityComments() + r.getFoodComments() + r.getNoticeComments();
    int likedFoodCount = r.getLikedFoods();

    return MyWriteStatusDto.builder()
        .postCount(posts)
        .commentCount(comments)
        .likedFoodCount(likedFoodCount)
        .build();
  }
}
