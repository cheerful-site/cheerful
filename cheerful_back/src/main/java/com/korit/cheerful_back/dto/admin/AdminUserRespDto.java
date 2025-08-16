package com.korit.cheerful_back.dto.admin;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserRespDto {
    private Integer userId;
    private String username;
    private String email;
    private String profileImgPath;
    private String role;
    private String provider;
    private String providerId;
}
