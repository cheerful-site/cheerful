package com.korit.cheerful_back.domain.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MyWriteStatusMapper {
  MyWriteStatusRow countMyStatus(@Param("userId") Integer user);

}
