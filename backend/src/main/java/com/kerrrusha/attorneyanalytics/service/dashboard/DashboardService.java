package com.kerrrusha.attorneyanalytics.service.dashboard;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.StatsByDatesDto;

import java.util.List;

public interface DashboardService {

    AboutUsDto collectInfoAboutUs();

    List<LatestClosedCaseDto> getLatestClosedCases();

    List<AttorneyOfTheMonthDto> getAttorneysOfTheMonth();

    StatsByDatesDto getStatsByDates(String dateFrom, String dateTo);
}
