package com.kerrrusha.attorneyanalytics.service.payments.impl;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.PaymentMapper;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.service.payments.PaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentsServiceImpl implements PaymentsService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Override
    public PaymentsPageableResponseDto findAll(Pageable pageable) {
        return mapToPaymentPageableDto(paymentRepository.findAllByOrderByUpdatedAtDesc(pageable));
    }

    private PaymentsPageableResponseDto mapToPaymentPageableDto(Page<Payment> payments) {
        PaymentsPageableResponseDto result = new PaymentsPageableResponseDto();

        result.setTotal(payments.getTotalElements());
        result.setData(payments.stream()
                .map(paymentMapper::toDto)
                .toList());

        return result;
    }
}
