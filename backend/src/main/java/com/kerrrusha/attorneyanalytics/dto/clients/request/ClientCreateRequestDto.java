package com.kerrrusha.attorneyanalytics.dto.clients.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class ClientCreateRequestDto {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private List<String> emails;
    private List<String> phones;
}
