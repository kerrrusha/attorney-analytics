package com.kerrrusha.attorneyanalytics.service.legal_case;

import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCasePageableResponseDto;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCaseResponseDto;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LegalCaseService {

    Long getProfitInDollars(LegalCase legalCase);

    LegalCasePageableResponseDto findAll(Pageable pageable);

    LegalCaseResponseDto findById(Long caseId);

    List<LegalCaseResponseDto> findByTitle(String title);
}
