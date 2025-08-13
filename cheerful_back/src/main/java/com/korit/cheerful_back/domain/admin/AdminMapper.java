package com.korit.cheerful_back.domain.admin;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminMapper {
  Admin findByAdminId(@Param("adminLoginId") Integer adminLoginId);
}
