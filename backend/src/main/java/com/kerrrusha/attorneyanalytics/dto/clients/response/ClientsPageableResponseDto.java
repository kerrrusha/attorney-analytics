package com.kerrrusha.attorneyanalytics.dto.clients.response;

import lombok.Data;

import java.util.List;

@Data
public class ClientsPageableResponseDto {

    private Long total;
    private List<ClientResponseDto> data;
}
