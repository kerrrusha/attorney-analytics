package com.kerrrusha.attorneyanalytics.dto.clients;

import lombok.Data;

import java.util.List;

@Data
public class ClientsPageableResponseDto {

    private Long total;
    private List<ClientResponseDto> data;
}
