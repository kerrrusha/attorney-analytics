package com.kerrrusha.attorneyanalytics.dto.user.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserUpdateRequestDto {

    private Long userId;
    private LocalDateTime createdAt;
    private String firstName;
    private String lastName;
    private String profilePhotoUrl;
    private String bio;
    private String linkedinUrl;
    private Long titleId;
    private String[] emails;
    private String[] phones;
    private String[] locations;
    private String[] admissions;
    private String[] practiceAreas;
}
