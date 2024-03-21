package com.kerrrusha.attorneyanalytics.mapper.payment;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentStatusResponseDto;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentStatus;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface PaymentStatusMapper {

    PaymentStatusResponseDto toDto(PaymentStatus entity);
}
