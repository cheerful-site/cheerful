package com.korit.cheerful_back.domain.myPage;

import com.korit.cheerful_back.dto.myPage.MyCommentDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyPageMapper {
  List<MyCommentDto> getMyComments(MyCommentSearchOption searchOption);
  int getMyCommentsCount(MyCommentSearchOption searchOption);
}
