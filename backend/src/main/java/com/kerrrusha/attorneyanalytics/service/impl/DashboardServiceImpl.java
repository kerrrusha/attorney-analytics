package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.dto.AboutUsDto;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.repository.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

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
}
