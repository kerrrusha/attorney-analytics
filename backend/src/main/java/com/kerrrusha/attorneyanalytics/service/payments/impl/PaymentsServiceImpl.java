package com.kerrrusha.attorneyanalytics.service.payments.impl;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentStatusResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentTypeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.payment.PaymentMapper;
import com.kerrrusha.attorneyanalytics.mapper.payment.PaymentStatusMapper;
import com.kerrrusha.attorneyanalytics.mapper.payment.PaymentTypeMapper;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentStatusRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentTypeRepository;
import com.kerrrusha.attorneyanalytics.service.payments.PaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentsServiceImpl implements PaymentsService {

    private final PaymentRepository paymentRepository;
    private final PaymentStatusRepository paymentStatusRepository;
    private final PaymentTypeRepository paymentTypeRepository;
    private final PaymentMapper paymentMapper;
    private final PaymentStatusMapper paymentStatusMapper;
    private final PaymentTypeMapper paymentTypeMapper;

    @Override
    public PaymentsPageableResponseDto findAll(Pageable pageable) {
        return mapToPaymentPageableDto(paymentRepository.findAllByOrderByUpdatedAtDesc(pageable));
    }

    @Override
    public List<PaymentStatusResponseDto> getPaymentStatuses() {
        return paymentStatusRepository.findAll().stream()
                .map(paymentStatusMapper::toDto)
                .toList();
    }

    @Override
    public List<PaymentTypeResponseDto> getPaymentTypes() {
        return paymentTypeRepository.findAll().stream()
                .map(paymentTypeMapper::toDto)
                .toList();
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
