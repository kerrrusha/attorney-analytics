package com.kerrrusha.attorneyanalytics.service.payments;

import com.kerrrusha.attorneyanalytics.dto.payments.request.PaymentCreateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.payments.response.PaymentStatusResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.response.PaymentTypeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.response.PaymentsPageableResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PaymentsService {

    PaymentsPageableResponseDto findAll(Pageable pageable);

    List<PaymentStatusResponseDto> getPaymentStatuses();

    List<PaymentTypeResponseDto> getPaymentTypes();

    void createPayment(PaymentCreateRequestDto requestDto);
}
