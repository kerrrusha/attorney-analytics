package com.kerrrusha.attorneyanalytics.dto.user.response;

import lombok.Data;

import java.util.List;

@Data
public class UserListingResponseDto {

    private String fullName;
    private String title;
    private String profilePhotoUrl;
    private List<String> emails;
    private List<String> phones;
}
