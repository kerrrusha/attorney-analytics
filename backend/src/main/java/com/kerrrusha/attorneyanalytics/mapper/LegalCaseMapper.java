package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCaseResponseDto;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseType;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(config = MapperConfig.class)
public abstract class LegalCaseMapper {

    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ClientMapper clientMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private PaymentRepository paymentRepository;

    @Mapping(target = "assignedClients", ignore = true)
    @Mapping(target = "assignedAttorneys", ignore = true)
    @Mapping(target = "assignedPayments", ignore = true)
    @Mapping(target = "status", source = "legalCaseStatus")
    @Mapping(target = "type", source = "legalCaseType")
    public abstract LegalCaseResponseDto toDto(LegalCase legalCase);

    protected String map(LocalDateTime dateTime) {
        return dateTime.format(RESPONSE_FORMATTER);
    }

    protected String map(LegalCaseType type) {
        return type.getName();
    }

    protected String map(LegalCaseStatus status) {
        return status.getName().name();
    }

    @AfterMapping
    protected void doPostMapping(@MappingTarget LegalCaseResponseDto target, LegalCase legalCase) {
        target.setAssignedClients(legalCase.getAssignedClients().stream()
                .map(clientMapper::toDto)
                .toList());
        target.setAssignedAttorneys(legalCase.getAssignedAttorneys().stream()
                .map(userMapper::toEmployeeDto)
                .toList());
        target.setAssignedPayments(paymentRepository.findByLegalCase(legalCase).stream()
                .map(paymentMapper::toDto)
                .toList());
    }
}
