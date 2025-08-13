package com.korit.cheerful_back.security.model;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/*
    현재 스레드의 SecurityContext에서 PrincipalUser룰 꺼내는 헬퍼
 */
@Component
public class PrincipalUtil {

    /*
        현재 인증된 PrincipalUser 반환
     */
    public PrincipalUser getPrincipalUser() {
        return (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
