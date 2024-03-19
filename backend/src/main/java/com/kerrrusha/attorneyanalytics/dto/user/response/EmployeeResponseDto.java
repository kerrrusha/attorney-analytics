package com.kerrrusha.attorneyanalytics.dto.user.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmployeeResponseDto {
    private LocalDateTime createdAt;
    private String firstName;
    private String lastName;
    private String profilePhotoUrl;
    private String bio;
    private String linkedinUrl;
    private String title;
    private String[] emails;
    private String[] phones;
    private String[] locations;
    private String[] admissions;
    private String[] practiceAreas;
    private String[] roles;
}
