package com.kerrrusha.attorneyanalytics.service.analytics.impl;

import com.kerrrusha.attorneyanalytics.common.Vector2;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.service.LegalCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toDollars;

@Service
@RequiredArgsConstructor
public class LegalCaseServiceImpl implements LegalCaseService {

    private final PaymentRepository paymentRepository;

    @Override
    public Long getProfitInDollars(LegalCase legalCase) {
        return paymentRepository.findByLegalCase(legalCase).stream()
                .map(payment -> new Vector2<>(payment.getAmountInCents(), payment.getPaymentType().getName()))
                .peek(amountToType -> amountToType.setFirst(toDollars(amountToType.getFirst())))
                .peek(amountToType -> {
                    if (amountToType.getSecond().equals(PaymentType.PaymentTypeName.OUTCOME)) {
                        amountToType.setFirst(amountToType.getFirst() * -1);
                    }
                })
                .mapToLong(Vector2::getFirst)
                .sum();
    }
}
