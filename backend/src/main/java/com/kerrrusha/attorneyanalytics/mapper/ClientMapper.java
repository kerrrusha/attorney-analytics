package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.clients.response.ClientResponseDto;
import com.kerrrusha.attorneyanalytics.model.client.Client;
import com.kerrrusha.attorneyanalytics.model.client.ClientEmail;
import com.kerrrusha.attorneyanalytics.model.client.ClientPhone;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.join;

@Mapper(config = MapperConfig.class)
public abstract class ClientMapper {

    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Autowired
    private LegalCaseRepository legalCaseRepository;

    public abstract ClientResponseDto toDto(Client client);

    protected String mapCreatedAt(LocalDateTime createdAt) {
        return createdAt.format(RESPONSE_FORMATTER);
    }

    protected String mapEmails(List<ClientEmail> emails) {
        return join(emails);
    }

    protected String mapPhones(List<ClientPhone> phones) {
        return join(phones);
    }

    @AfterMapping
    protected void setTotalCases(@MappingTarget ClientResponseDto target, Client client) {
        target.setTotalCases(legalCaseRepository.countByAssignedClientId(client.getId()));
    }
}
