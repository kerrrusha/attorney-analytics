package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.case_.Case;
import com.kerrrusha.attorneyanalytics.model.case_.CaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<Case, Long> {
    Long countByCaseStatusName(CaseStatus.CaseStatusName name);
}
