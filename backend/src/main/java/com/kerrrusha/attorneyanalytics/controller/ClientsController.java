package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.clients.ClientsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.service.clients.ClientsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clients")
public class ClientsController {

    private final ClientsService clientsService;

    @GetMapping
    public ClientsPageableResponseDto getPayments(Pageable pageable) {
        return clientsService.findAll(pageable);
    }
}
