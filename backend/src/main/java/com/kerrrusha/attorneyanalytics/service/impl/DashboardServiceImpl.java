package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.model.FullNameProvider;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.joining;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private static final int LATEST_CLOSED_CASES_LIMIT = 5;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final String SEPARATOR = ", ";

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final LegalCaseRepository legalCaseRepository;

    @Override
    public AboutUsDto collectInfoAboutUs() {
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

    @Override
    public List<AttorneyOfTheMonthDto> getAttorneysOfTheMonth() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime firstDayOfCurrentMonth = currentDateTime.withDayOfMonth(1);
        LocalDateTime lastDayOfLastMonth = firstDayOfCurrentMonth.minusDays(1);
        LocalDateTime firstDayOfLastMonth = lastDayOfLastMonth.withDayOfMonth(1);
        LocalDateTime startOfLastMonth = firstDayOfLastMonth.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfLastMonth = lastDayOfLastMonth.withHour(23).withMinute(59).withSecond(59);

        List<LegalCase> lastMonthCases = legalCaseRepository.findByUpdatedAtBetween(startOfLastMonth, endOfLastMonth);
        List<LegalCase> lastMonthSuccessCases = lastMonthCases.stream()
                .filter(e -> e.getLegalCaseStatus().getName().equals(LegalCaseStatus.CaseStatusName.SUCCESS))
                .toList();

        Map<User, Long> attorneyToCasesAmountMap = lastMonthCases.stream()
                .flatMap(e -> e.getAssignedAttorneys().stream())
                .collect(
                    Collectors.groupingBy(e -> e, Collectors.counting())
                );
        Map<User, Long> attorneyToSuccessCasesAmountMap = lastMonthSuccessCases.stream()
                .flatMap(e -> e.getAssignedAttorneys().stream())
                .collect(
                        Collectors.groupingBy(e -> e, Collectors.counting())
                );

        Map<User, Double> attorneyToSuccessfullyClosedRateMap = new HashMap<>();
        for (User attorney : attorneyToCasesAmountMap.keySet()) {
            long totalCases = attorneyToCasesAmountMap.getOrDefault(attorney, 0L);
            long successCases = attorneyToSuccessCasesAmountMap.getOrDefault(attorney, 0L);

            double successRate = totalCases == 0 ? 0 : (double) successCases / totalCases;
            attorneyToSuccessfullyClosedRateMap.put(attorney, successRate);
        }

        return attorneyToSuccessfullyClosedRateMap.keySet().stream()
                .map(user -> {
                    AttorneyOfTheMonthDto result = new AttorneyOfTheMonthDto();

                    result.setAttorneyFullName(user.getFullName());
                    result.setTitle(user.getTitle().getName());
                    result.setCasesParticipated(attorneyToCasesAmountMap.get(user));
                    result.setSuccessfullyClosedRate(attorneyToSuccessfullyClosedRateMap.get(user));

                    return result;
                })
                .sorted(Comparator.comparingDouble(AttorneyOfTheMonthDto::getSuccessfullyClosedRate).reversed())
                .toList();
    }

    private LatestClosedCaseDto mapToLatestClosedCaseDto(LegalCase legalCase) {
        LatestClosedCaseDto result = new LatestClosedCaseDto();

        result.setClosedDate(legalCase.getUpdatedAt().format(formatter));
        result.setTitle(legalCase.getTitle());
        result.setStatus(legalCase.getLegalCaseStatus().getName().name());
        result.setAssignedAttorneys(legalCase.getAssignedAttorneys()
                .stream()
                .map(FullNameProvider::getFullName)
                .collect(joining(SEPARATOR)));
        result.setClients(legalCase.getAssignedClients()
                .stream()
                .map(FullNameProvider::getFullName)
                .collect(joining(SEPARATOR)));

        return result;
    }
}
