package com.kerrrusha.attorneyanalytics.service.legal_case.impl;

import com.kerrrusha.attorneyanalytics.common.Vector2;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCasePageableResponseDto;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCaseResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.LegalCaseMapper;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.service.legal_case.LegalCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toDollars;

@Service
@RequiredArgsConstructor
public class LegalCaseServiceImpl implements LegalCaseService {

    private final LegalCaseRepository legalCaseRepository;
    private final PaymentRepository paymentRepository;
    private final LegalCaseMapper legalCaseMapper;

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

    @Override
    public LegalCaseResponseDto findById(Long caseId) {
        LegalCase legalCase = legalCaseRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Can't find legal case by id: " + caseId));
        return legalCaseMapper.toDto(legalCase);
    }

    @Override
    public List<LegalCaseResponseDto> findByTitle(String title) {
        return legalCaseRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(legalCaseMapper::toDto)
                .toList();
    }

    private LegalCasePageableResponseDto mapToPageableDto(Page<LegalCase> page) {
        LegalCasePageableResponseDto result = new LegalCasePageableResponseDto();

        result.setTotal(page.getTotalElements());
        result.setData(page.stream()
                .map(legalCaseMapper::toDto)
                .toList());

        return result;
    }
}
