package com.kerrrusha.attorneyanalytics.dto.clients;

import lombok.Data;

import java.util.List;

@Data
public class ClientsPageableResponseDto {

    private Long total;
    private List<ClientsPageableData> data;

    @Data
    public static class ClientsPageableData {
        private String createdAt;
        private String fullName;
        private Long totalCases;
        private String emails;
        private String phones;
    }
}
