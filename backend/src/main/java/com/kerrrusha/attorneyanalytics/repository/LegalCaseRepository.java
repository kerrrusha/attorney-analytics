package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LegalCaseRepository extends JpaRepository<LegalCase, Long> {
    Long countByLegalCaseStatusName(LegalCaseStatus.CaseStatusName name);
}
