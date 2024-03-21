package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCasePageableResponseDto;
import com.kerrrusha.attorneyanalytics.dto.legal_case.LegalCaseResponseDto;
import com.kerrrusha.attorneyanalytics.service.legal_case.LegalCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cases")
public class LegalCaseController {

    private final LegalCaseService legalCaseService;

    @GetMapping
    public LegalCasePageableResponseDto getCases(Pageable pageable) {
        return legalCaseService.findAll(pageable);
    }

    @GetMapping("/{caseId}")
    public LegalCaseResponseDto getCase(@PathVariable Long caseId) {
        return legalCaseService.findById(caseId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/search/title/{title}")
    public List<LegalCaseResponseDto> searchByTitle(@PathVariable String title) {
        return legalCaseService.findByTitle(title);
    }
}
