package com.kerrrusha.attorneyanalytics.dto.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class HireEmployeeRequestDto {

    @Email
    @NotBlank
    private String login;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private Long titleId;
}
