package com.korit.cheerful_back.domain.admin;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminMapper {
  int insert(Admin admin);
  Admin findById(@Param("adminId") Integer adminId);
  Admin findByProviderId(@Param("providerId") String providerId);
}
