package com.kerrrusha.attorneyanalytics.mapper.payment;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentTypeResponseDto;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface PaymentTypeMapper {

    PaymentTypeResponseDto toDto(PaymentType entity);
}
