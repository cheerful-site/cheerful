package com.korit.cheerful_back.security.model;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class PrincipalUtil {

    public PrincipalUser getPrinciplaUser() {
        return (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
