package com.kerrrusha.attorneyanalytics.dto.user.response;

public record UserResponseDto(
        String id,
        String login,
        String firstName,
        String lastName,
        String profilePhotoUrl) {
}
