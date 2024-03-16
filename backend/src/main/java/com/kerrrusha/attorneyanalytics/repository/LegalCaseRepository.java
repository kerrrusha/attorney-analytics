package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LegalCaseRepository extends JpaRepository<LegalCase, Long> {

    Long countByLegalCaseStatusName(LegalCaseStatus.CaseStatusName name);

    List<LegalCase> findByOrderByCreatedAtDesc(Limit limit);
}
