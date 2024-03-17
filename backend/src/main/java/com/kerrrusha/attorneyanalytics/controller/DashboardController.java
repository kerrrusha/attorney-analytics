package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.StatsByDatesDto;
import com.kerrrusha.attorneyanalytics.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/about-us")
    public AboutUsDto getAboutUs() {
        return dashboardService.collectInfoAboutUs();
    }

    @GetMapping("/latest-closed-cases")
    public List<LatestClosedCaseDto> getLatestClosedCases() {
        return dashboardService.getLatestClosedCases();
    }

    @GetMapping("/attorneys-of-the-month")
    public List<AttorneyOfTheMonthDto> getAttorneysOfTheMonth() {
        return dashboardService.getAttorneysOfTheMonth();
    }

    @GetMapping("/stats-by-dates")
    public StatsByDatesDto getStatsByDates(@RequestParam("dateFrom") String dateFrom, @RequestParam("dateTo") String dateTo) {
        return dashboardService.getStatsByDates(dateFrom, dateTo);
    }
}
