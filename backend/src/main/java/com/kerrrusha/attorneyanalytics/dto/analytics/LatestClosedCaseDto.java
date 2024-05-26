package com.kerrrusha.attorneyanalytics.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LatestClosedCaseDto {
    private String closedDate;
    private String title;
    private String status;
    private Long profit;
    private String clients;
    private String assignedAttorneys;
}
