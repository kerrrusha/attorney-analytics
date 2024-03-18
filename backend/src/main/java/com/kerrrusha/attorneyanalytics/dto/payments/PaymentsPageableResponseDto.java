package com.kerrrusha.attorneyanalytics.dto.payments;

import lombok.Data;

import java.util.List;

@Data
public class PaymentsPageableResponseDto {

    private Long total;
    private List<PaymentsPageableData> data;

    @Data
    public static class PaymentsPageableData {
        private String updatedAt;
        private String type;
        private String description;
        private String assignedCase;
        private Long amount;
        private String status;
    }
}
