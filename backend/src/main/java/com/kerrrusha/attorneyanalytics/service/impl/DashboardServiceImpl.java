package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.repository.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.joining;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private static final int LATEST_CLOSED_CASES_LIMIT = 5;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final String SPACE = " ";
    private static final String SEPARATOR = ", ";

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final LegalCaseRepository legalCaseRepository;

    @Override
    public AboutUsDto collectAboutUsInfo() {
        AboutUsDto result = new AboutUsDto();

        result.setCaseStatusToAmount(Arrays.stream(LegalCaseStatus.CaseStatusName.values())
                .collect(Collectors.toMap(Function.identity(), legalCaseRepository::countByLegalCaseStatusName)));
        result.setWorkers(userRepository.count());
        result.setClients(clientRepository.count());

        return result;
    }

    @Override
    public List<LatestClosedCaseDto> getLatestClosedCases() {
        return legalCaseRepository.findByOrderByCreatedAtDesc(Limit.of(LATEST_CLOSED_CASES_LIMIT)).stream()
                .map(this::mapToLatestClosedCaseDto)
                .toList();
    }

    private LatestClosedCaseDto mapToLatestClosedCaseDto(LegalCase legalCase) {
        LatestClosedCaseDto result = new LatestClosedCaseDto();

        result.setClosedDate(legalCase.getUpdatedAt().format(formatter));
        result.setTitle(legalCase.getTitle());
        result.setStatus(legalCase.getLegalCaseStatus().getName().name());
        result.setAssignedAttorneys(legalCase.getAssignedAttorneys()
                .stream()
                .map(user -> user.getFirstName() + SPACE + user.getLastName())
                .collect(joining(SEPARATOR)));
        result.setClients(legalCase.getAssignedClients()
                .stream()
                .map(client -> client.getFirstName() + SPACE + client.getLastName())
                .collect(joining(SEPARATOR)));

        return result;
    }
}
