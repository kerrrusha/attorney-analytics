package com.kerrrusha.attorneyanalytics.repository.legal_case;

import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LegalCaseStatusRepository extends JpaRepository<LegalCaseStatus, Long> {

    Optional<LegalCaseStatus> findByName(LegalCaseStatus.CaseStatusName name);
}
