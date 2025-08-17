package com.korit.cheerful_back.domain.foodComment;

import com.korit.cheerful_back.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodComment {
    private Integer foodCommentId;
    private Integer foodId;
    private Integer userId;
    private String content;
    private LocalDateTime createdAt;

    private User user;
}
