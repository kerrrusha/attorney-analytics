package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.service.payments.PaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentsController {

    private final PaymentsService paymentsService;

    @GetMapping
    public PaymentsPageableResponseDto getPayments(Pageable pageable) {
        return paymentsService.getPayments(pageable);
    }
}
