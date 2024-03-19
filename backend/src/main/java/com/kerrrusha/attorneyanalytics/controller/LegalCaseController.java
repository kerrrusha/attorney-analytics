package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCasePageableResponseDto;
import com.kerrrusha.attorneyanalytics.service.LegalCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cases")
public class LegalCaseController {

    private final LegalCaseService legalCaseService;

    @GetMapping
    public LegalCasePageableResponseDto getCases(Pageable pageable) {
        return legalCaseService.findAll(pageable);
    }
}
