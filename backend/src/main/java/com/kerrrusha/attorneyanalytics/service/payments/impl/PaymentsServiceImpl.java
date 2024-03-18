package com.kerrrusha.attorneyanalytics.service.payments.impl;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.service.payments.PaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toDollars;

@Service
@RequiredArgsConstructor
public class PaymentsServiceImpl implements PaymentsService {

    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");

    private final PaymentRepository paymentRepository;

    @Override
    public PaymentsPageableResponseDto getPayments(Pageable pageable) {
        return mapToPaymentPageableDto(paymentRepository.findAllByOrderByUpdatedAtDesc(pageable));
    }

    private PaymentsPageableResponseDto mapToPaymentPageableDto(Page<Payment> payments) {
        PaymentsPageableResponseDto result = new PaymentsPageableResponseDto();

        result.setTotal(payments.getTotalElements());
        result.setData(payments.stream()
                .map(this::mapToPaymentDto)
                .toList());

        return result;
    }

    private PaymentsPageableResponseDto.PaymentsPageableData mapToPaymentDto(Payment payment) {
        var result = new PaymentsPageableResponseDto.PaymentsPageableData();

        result.setUpdatedAt(payment.getUpdatedAt().format(RESPONSE_FORMATTER));
        result.setType(payment.getPaymentType().getName().name());
        result.setDescription(payment.getDescription());
        result.setAssignedCase(payment.getLegalCase().getTitle() + " #" + payment.getId());
        result.setAmount(toDollars(payment.getAmountInCents()));
        result.setStatus(payment.getPaymentStatus().getName().name());

        return result;
    }
}
