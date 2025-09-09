package com.korit.cheerful_back.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSearchOption {
    private Integer startIndex;
    private Integer endIndex;
    private Integer size;
    private String searchText;
    private Integer userId;
}
