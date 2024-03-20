package com.kerrrusha.attorneyanalytics.dto.user.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequestDto {
    @Email
    private String login;

    @NotBlank
    @Size(min = 3, max = 255, message = "Password should be at least 3 symbols length")
    @Schema(description = "Password", example = "my_1secret1_password", minLength = 3, maxLength = 255, pattern = "^[a-zA-Z0-9]*$")
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String profilePhotoUrl;

    private Long titleId;
}
