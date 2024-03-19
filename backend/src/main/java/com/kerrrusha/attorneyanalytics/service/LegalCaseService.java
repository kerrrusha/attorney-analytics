package com.kerrrusha.attorneyanalytics.service;

import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCasePageableResponseDto;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import org.springframework.data.domain.Pageable;

public interface LegalCaseService {

    Long getProfitInDollars(LegalCase legalCase);

    LegalCasePageableResponseDto findAll(Pageable pageable);
}
