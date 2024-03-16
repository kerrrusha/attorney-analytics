package com.kerrrusha.attorneyanalytics.dto.dashboard;

import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import lombok.Data;

import java.util.Map;

@Data
public class AboutUsDto {

    private Long workers;
    private Long clients;
    private Map<LegalCaseStatus.CaseStatusName, Long> caseStatusToAmount;
}
