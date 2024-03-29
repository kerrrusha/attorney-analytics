package com.kerrrusha.attorneyanalytics.model.payment;

import com.kerrrusha.attorneyanalytics.model.MoneyAmountFormattedProvider;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("deleted=false")
@SQLDelete(sql = "UPDATE payment SET deleted = true WHERE id=?")
public class Payment implements MoneyAmountFormattedProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private String description;

    @ManyToOne
    @JoinColumn(name = "legal_case_id")
    private LegalCase legalCase;

    @Column(nullable = false)
    private Long amountInCents;

    @ManyToOne
    @JoinColumn(name = "payment_status_id")
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "payment_type_id")
    private PaymentType paymentType;

    @Column(nullable = false)
    private boolean deleted = false;
}
