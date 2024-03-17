package com.kerrrusha.attorneyanalytics.dto.dashboard;

import lombok.Data;

@Data
public class AttorneyOfTheMonthDto {

    private String attorneyFullName;
    private String title;
    private long casesParticipated;
    private double successfullyClosedRate;
}
