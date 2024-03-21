package com.kerrrusha.attorneyanalytics.repository.payment;

import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTypeRepository extends JpaRepository<PaymentType, Long> {
}
