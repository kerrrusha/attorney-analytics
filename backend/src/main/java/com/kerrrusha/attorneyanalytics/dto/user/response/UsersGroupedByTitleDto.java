package com.kerrrusha.attorneyanalytics.dto.user.response;

import lombok.Data;

import java.util.List;

@Data
public class UsersGroupedByTitleDto {
    private String title;
    private List<UserListingResponseDto> data;
}
