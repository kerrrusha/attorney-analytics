package com.kerrrusha.attorneyanalytics.dto.analytics;

import lombok.Data;

@Data
public class StatsByDatesDto {

    private IncomesOutcomesDto caseTypeIncomesOutcomes;
    private IncomesOutcomesDto clientIncomesOutcomes;
    private IncomesOutcomesDto monthIncomesOutcomes;
}
