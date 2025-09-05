package com.korit.cheerful_back.domain.myPage;

import com.korit.cheerful_back.dto.myPage.MyCommentDto;
import com.korit.cheerful_back.dto.myPage.MyLikedFoodDto;
import com.korit.cheerful_back.dto.myPage.MyPostDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MyPageMapper {

  // 본인이 작성한 글
  List<MyPostDto> getMyPageCommunityList(MyPageSearchOption searchOption);
  int getMyCommunitiesCount(MyPageSearchOption searchOption);

  // 본인이 작성한 댓글
  List<MyCommentDto> getMyComments(MyPageSearchOption searchOption);
  int getMyCommentsCount(MyPageSearchOption searchOption);

  // 찜 목록에 담은 food
  List<MyLikedFoodDto> getMyPageFoodList(MyPageSearchOption searchOption);
  int getMyLikedFoodsCount(MyPageSearchOption searchOption);

  // 찜 목록에 담은 food 좋아요 취소
  int delete(@Param("foodId") Integer foodId, @Param("userId") Integer userId);

  // 찜 목록에 담은 food 좋아요 다시 누르기
  int insert(@Param("foodId") Integer foodId, @Param("userId") Integer userId);
}
