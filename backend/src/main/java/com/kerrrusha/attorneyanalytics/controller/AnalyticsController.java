package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.analytics.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.StatsByDatesDto;
import com.kerrrusha.attorneyanalytics.service.analytics.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/about-us")
    public AboutUsDto getAboutUs() {
        return analyticsService.collectInfoAboutUs();
    }

    @GetMapping("/latest-closed-cases")
    public List<LatestClosedCaseDto> getLatestClosedCases() {
        return analyticsService.getLatestClosedCases();
    }

    @GetMapping("/attorneys-of-the-month")
    public List<AttorneyOfTheMonthDto> getAttorneysOfTheMonth() {
        return analyticsService.getAttorneysOfTheMonth();
    }

    @GetMapping("/stats-by-dates")
    public StatsByDatesDto getStatsByDates(@RequestParam("dateFrom") String dateFrom, @RequestParam("dateTo") String dateTo) {
        return analyticsService.getStatsByDates(dateFrom, dateTo);
    }
}
