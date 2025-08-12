package com.korit.cheerful_back.domain.admin;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminMapper {
  Admin findById(@Param("adminId") Integer adminId);
  Admin findByAdminLoginId(@Param("adminLoginId") String adminLoginId);
}
