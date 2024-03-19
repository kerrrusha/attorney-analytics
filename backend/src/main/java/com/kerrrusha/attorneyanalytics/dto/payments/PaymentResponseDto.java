package com.kerrrusha.attorneyanalytics.dto.payments;

import lombok.Data;

@Data
public class PaymentResponseDto {

    private String updatedAt;
    private String type;
    private String description;
    private String assignedCase;
    private Long amount;
    private String status;
}
