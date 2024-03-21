package com.kerrrusha.attorneyanalytics.service.clients.impl;

import com.kerrrusha.attorneyanalytics.dto.clients.request.ClientCreateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.clients.response.ClientsPageableResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.ClientMapper;
import com.kerrrusha.attorneyanalytics.model.client.Client;
import com.kerrrusha.attorneyanalytics.model.client.ClientEmail;
import com.kerrrusha.attorneyanalytics.model.client.ClientPhone;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.service.clients.ClientsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ClientsServiceImpl implements ClientsService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    @Override
    public ClientsPageableResponseDto findAll(Pageable pageable) {
        return mapToPageableDto(clientRepository.findAllByOrderByCreatedAtDesc(pageable));
    }

    @Override
    @Transactional
    public void create(ClientCreateRequestDto requestDto) {
        Client client = new Client();

        client.setFirstName(requestDto.getFirstName());
        client.setLastName(requestDto.getLastName());
        client.setCreatedAt(LocalDateTime.now());

        Client savedClient = clientRepository.save(client);

        savedClient.setEmails(requestDto.getEmails().stream()
                .map(str -> ClientEmail.builder()
                        .client(savedClient)
                        .value(str)
                        .build())
                .toList());
        savedClient.setPhones(requestDto.getPhones().stream()
                .map(str -> ClientPhone.builder()
                        .client(savedClient)
                        .value(str)
                        .build())
                .toList());

        clientRepository.save(savedClient);
    }

    private ClientsPageableResponseDto mapToPageableDto(Page<Client> page) {
        ClientsPageableResponseDto result = new ClientsPageableResponseDto();

        result.setTotal(page.getTotalElements());
        result.setData(page.stream()
                .map(clientMapper::toDto)
                .toList());

        return result;
    }
}
