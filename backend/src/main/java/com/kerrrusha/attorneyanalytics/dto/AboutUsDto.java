package com.kerrrusha.attorneyanalytics.dto;

import com.kerrrusha.attorneyanalytics.model.case_.CaseStatus;
import lombok.Data;

import java.util.Map;

@Data
public class AboutUsDto {

    private Long workers;
    private Long clients;
    private Map<CaseStatus.CaseStatusName, Long> caseStatusToAmount;
}
