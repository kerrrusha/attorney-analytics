package com.kerrrusha.attorneyanalytics.service.clients.impl;

import com.kerrrusha.attorneyanalytics.dto.clients.ClientsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.model.client.Client;
import com.kerrrusha.attorneyanalytics.model.client.ClientEmail;
import com.kerrrusha.attorneyanalytics.model.client.ClientPhone;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.service.clients.ClientsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

import static java.util.stream.Collectors.joining;

@Service
@RequiredArgsConstructor
public class ClientsServiceImpl implements ClientsService {

    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final String SEPARATOR = ", ";

    private final ClientRepository clientRepository;
    private final LegalCaseRepository legalCaseRepository;

    @Override
    public ClientsPageableResponseDto findAll(Pageable pageable) {
        return mapToPageableDto(clientRepository.findAllByOrderByCreatedAtDesc(pageable));
    }

    private ClientsPageableResponseDto mapToPageableDto(Page<Client> page) {
        ClientsPageableResponseDto result = new ClientsPageableResponseDto();

        result.setTotal(page.getTotalElements());
        result.setData(page.stream()
                .map(this::mapToClientDto)
                .toList());

        return result;
    }

    private ClientsPageableResponseDto.ClientsPageableData mapToClientDto(Client client) {
        var result = new ClientsPageableResponseDto.ClientsPageableData();

        result.setCreatedAt(client.getCreatedAt().format(RESPONSE_FORMATTER));
        result.setFullName(client.getFullName());
        result.setEmails(client.getEmails().stream()
                .map(ClientEmail::getValue)
                .collect(joining(SEPARATOR)));
        result.setPhones(client.getPhones().stream()
                .map(ClientPhone::getValue)
                .collect(joining(SEPARATOR)));
        result.setTotalCases(legalCaseRepository.countByAssignedClientId(client.getId()));

        return result;
    }
}
