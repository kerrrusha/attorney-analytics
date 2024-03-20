package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.title.TitleResponseDto;
import com.kerrrusha.attorneyanalytics.service.title.TitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/titles")
public class TitleController {

    private final TitleService titleService;

    @GetMapping
    public List<TitleResponseDto> findAll() {
        return titleService.findAll();
    }
}
