package com.kerrrusha.attorneyanalytics.dto.analytics;

import lombok.Data;

@Data
public class LatestClosedCaseDto {

    private String closedDate;
    private String title;
    private String status;
    private String clients;
    private String assignedAttorneys;
}
