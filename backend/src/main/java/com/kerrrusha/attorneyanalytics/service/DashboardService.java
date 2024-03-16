package com.kerrrusha.attorneyanalytics.service;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;

import java.util.List;

public interface DashboardService {

    AboutUsDto collectAboutUsInfo();

    List<LatestClosedCaseDto> getLatestClosedCases();
}
