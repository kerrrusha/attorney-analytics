package com.kerrrusha.attorneyanalytics.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private String firstName;
    private String lastName;
    private String profilePhotoUrl;
    private String login;
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
