package com.kerrrusha.attorneyanalytics.dto.payments;

import lombok.Data;

import java.util.List;

@Data
public class PaymentsPageableResponseDto {

    private Long total;
    private List<PaymentResponseDto> data;
}
