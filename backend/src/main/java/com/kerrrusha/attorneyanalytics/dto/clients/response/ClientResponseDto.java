package com.kerrrusha.attorneyanalytics.dto.clients.response;

import lombok.Data;

@Data
public class ClientResponseDto {

    private String createdAt;
    private String fullName;
    private Long totalCases;
    private String emails;
    private String phones;
}
