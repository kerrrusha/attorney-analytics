package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentStatusResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentTypeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.service.payments.PaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
@PreAuthorize("hasAuthority('ADMIN')")
public class PaymentsController {

    private final PaymentsService paymentsService;

    @GetMapping
    public PaymentsPageableResponseDto getPayments(Pageable pageable) {
        return paymentsService.findAll(pageable);
    }

    @GetMapping("/statuses")
    public List<PaymentStatusResponseDto> getPaymentStatuses() {
        return paymentsService.getPaymentStatuses();
    }

    @GetMapping("/types")
    public List<PaymentTypeResponseDto> getPaymentTypes() {
        return paymentsService.getPaymentTypes();
    }
}
