package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/about-us")
    public AboutUsDto getAboutUs() {
        return dashboardService.collectAboutUsInfo();
    }

    @GetMapping("/latest-closed-cases")
    public List<LatestClosedCaseDto> getLatestClosedCases() {
        return dashboardService.getLatestClosedCases();
    }
}
