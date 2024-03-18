package com.kerrrusha.attorneyanalytics.service.payments;

import com.kerrrusha.attorneyanalytics.dto.payments.PaymentsPageableResponseDto;
import org.springframework.data.domain.Pageable;

public interface PaymentsService {

    PaymentsPageableResponseDto getPayments(Pageable pageable);
}
