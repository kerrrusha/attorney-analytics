package com.kerrrusha.attorneyanalytics.mapper.payment;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentResponseDto;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentStatus;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toDollars;

@Mapper(config = MapperConfig.class)
public interface PaymentMapper {

    DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Mapping(source = "paymentType", target = "type")
    @Mapping(source = "paymentStatus", target = "status")
    @Mapping(source = "amountInCents", target = "amount")
    PaymentResponseDto toDto(Payment payment);

    default String map(LocalDateTime updatedAt) {
        return updatedAt.format(RESPONSE_FORMATTER);
    }

    default String map(PaymentType paymentType) {
        return paymentType.getName().name();
    }

    default String map(PaymentStatus paymentStatus) {
        return paymentStatus.getName().name();
    }

    default Long map(Long amountInCents) {
        return toDollars(amountInCents);
    }

    @AfterMapping
    default void setAssignedCase(@MappingTarget PaymentResponseDto target, Payment payment) {
        target.setAssignedCase(payment.getLegalCase().getTitle() + " #" + payment.getId());
    }
}
