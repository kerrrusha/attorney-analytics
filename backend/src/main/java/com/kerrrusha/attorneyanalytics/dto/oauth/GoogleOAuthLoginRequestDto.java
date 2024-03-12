package com.kerrrusha.attorneyanalytics.dto.oauth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleOAuthLoginRequestDto {
    @NotBlank
    private String idToken;
}
