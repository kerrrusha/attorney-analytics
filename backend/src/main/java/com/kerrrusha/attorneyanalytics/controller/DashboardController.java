package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.AboutUsDto;
import com.kerrrusha.attorneyanalytics.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/about-us")
    public AboutUsDto getAboutUs() {
        return dashboardService.collectAboutUsInfo();
    }
}
