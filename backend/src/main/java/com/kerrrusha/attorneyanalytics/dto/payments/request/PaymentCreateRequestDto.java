package com.kerrrusha.attorneyanalytics.dto.payments.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PaymentCreateRequestDto {

    @NotBlank
    private String description;

    @Positive
    private Long amountInCents;

    @Positive
    private Long statusId;

    @Positive
    private Long typeId;

    @Positive
    private Long assignedLegalCaseId;
}
