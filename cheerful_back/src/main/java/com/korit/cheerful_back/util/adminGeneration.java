package com.korit.cheerful_back.util;

import com.korit.cheerful_back.domain.user.User;
import com.korit.cheerful_back.domain.user.UserMapper;
import com.korit.cheerful_back.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class adminGeneration implements CommandLineRunner {

    private final AdminService adminService;
    private final UserMapper userMapper;

    @Override
    public void run(String... args) throws Exception {
        User user = User.builder()
                .username("")
                .password("")
                .name("")
                .email("")
                .profileImgPath("")
                .role("")
                .build();

        if (userMapper.findByUsername(user.getUsername()) == null) {
            adminService.join(user);
        }
    }
}
