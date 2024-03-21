package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.payments.request.PaymentCreateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.payments.response.PaymentStatusResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.response.PaymentTypeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.response.PaymentsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.service.payments.PaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/declare")
    public void createPayment(@RequestBody PaymentCreateRequestDto requestDto) {
        paymentsService.createPayment(requestDto);
    }
}
