package com.kerrrusha.attorneyanalytics.repository.payment;

import com.kerrrusha.attorneyanalytics.model.payment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {
}
