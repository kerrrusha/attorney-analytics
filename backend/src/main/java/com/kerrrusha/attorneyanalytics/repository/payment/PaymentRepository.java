package com.kerrrusha.attorneyanalytics.repository.payment;

import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Payment> findByLegalCase(LegalCase legalCase);

    Page<Payment> findAllByOrderByUpdatedAtDesc(Pageable pageable);
}
