package com.kerrrusha.attorneyanalytics.service.analytics.impl;

import com.kerrrusha.attorneyanalytics.common.Vector2;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCasePageableResponseDto;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCaseResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.ClientMapper;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.service.LegalCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toDollars;

@Service
@RequiredArgsConstructor
public class LegalCaseServiceImpl implements LegalCaseService {

    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");

    private final LegalCaseRepository legalCaseRepository;
    private final PaymentRepository paymentRepository;
    private final ClientMapper clientMapper;

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

    @Override
    public LegalCasePageableResponseDto findAll(Pageable pageable) {
        return mapToPageableDto(legalCaseRepository.findAllByOrderByUpdatedAtDesc(pageable));
    }

    private LegalCasePageableResponseDto mapToPageableDto(Page<LegalCase> page) {
        LegalCasePageableResponseDto result = new LegalCasePageableResponseDto();

        result.setTotal(page.getTotalElements());
        result.setData(page.stream()
                .map(this::mapToLegalCaseDto)
                .toList());

        return result;
    }

    private LegalCaseResponseDto mapToLegalCaseDto(LegalCase legalCase) {
        var result = new LegalCaseResponseDto();

        result.setId(legalCase.getId());
        result.setCreatedAt(legalCase.getCreatedAt().format(RESPONSE_FORMATTER));
        result.setUpdatedAt(legalCase.getUpdatedAt().format(RESPONSE_FORMATTER));
        result.setTitle(legalCase.getTitle());
        result.setDescription(legalCase.getDescription());
        result.setStatus(legalCase.getLegalCaseStatus().getName().name());
        result.setType(legalCase.getLegalCaseType().getName());
        result.setAssignedClients(legalCase.getAssignedClients().stream()
                .map(clientMapper::toDto)
                .toList());

        return result;
    }
}
