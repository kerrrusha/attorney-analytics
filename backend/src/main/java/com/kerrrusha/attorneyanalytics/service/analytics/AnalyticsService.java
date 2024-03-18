package com.kerrrusha.attorneyanalytics.service.analytics;

import com.kerrrusha.attorneyanalytics.dto.analytics.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.StatsByDatesDto;

import java.util.List;

public interface AnalyticsService {

    AboutUsDto collectInfoAboutUs();

    List<LatestClosedCaseDto> getLatestClosedCases();

    List<AttorneyOfTheMonthDto> getAttorneysOfTheMonth();

    StatsByDatesDto getStatsByDates(String dateFrom, String dateTo);
}
