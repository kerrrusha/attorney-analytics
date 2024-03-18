package com.kerrrusha.attorneyanalytics.dto.analytics;

import lombok.Data;

@Data
public class AttorneyOfTheMonthDto {

    private String attorneyFullName;
    private String title;
    private long casesParticipated;
    private double successfullyClosedRate;
}
