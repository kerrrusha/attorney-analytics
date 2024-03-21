package com.kerrrusha.attorneyanalytics.service.payments;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentStatusResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentTypeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PaymentsService {

    PaymentsPageableResponseDto findAll(Pageable pageable);

    List<PaymentStatusResponseDto> getPaymentStatuses();

    List<PaymentTypeResponseDto> getPaymentTypes();
}
