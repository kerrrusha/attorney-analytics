package com.kerrrusha.attorneyanalytics.service.analytics.impl;

import com.kerrrusha.attorneyanalytics.dto.analytics.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.IncomesOutcomesDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.StatsByDatesDto;
import com.kerrrusha.attorneyanalytics.model.FullNameProvider;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.LegalCaseService;
import com.kerrrusha.attorneyanalytics.service.analytics.AbstractIncomesOutcomesCalculator;
import com.kerrrusha.attorneyanalytics.service.analytics.AnalyticsService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.getFirstDayOfMonth;
import static com.kerrrusha.attorneyanalytics.common.CommonHelper.getLastDayOfMonth;
import static java.util.stream.Collectors.joining;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private static final int LATEST_CLOSED_CASES_LIMIT = 5;
    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final DateTimeFormatter REACT_DATETIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final String SEPARATOR = ", ";

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final LegalCaseRepository legalCaseRepository;
    private final PaymentRepository paymentRepository;

    private final AbstractIncomesOutcomesCalculator monthIncomesOutcomesCalculator;
    private final AbstractIncomesOutcomesCalculator caseTypeOutcomesCalculator;
    private final AbstractIncomesOutcomesCalculator clientIncomesOutcomesCalculator;

    private final LegalCaseService legalCaseService;

    public AnalyticsServiceImpl(UserRepository userRepository, ClientRepository clientRepository,
                                LegalCaseRepository legalCaseRepository, PaymentRepository paymentRepository,
                                @Qualifier("month") AbstractIncomesOutcomesCalculator monthIncomesOutcomesCalculator,
                                @Qualifier("caseType") AbstractIncomesOutcomesCalculator caseTypeOutcomesCalculator,
                                @Qualifier("client") AbstractIncomesOutcomesCalculator clientIncomesOutcomesCalculator, LegalCaseService legalCaseService) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.legalCaseRepository = legalCaseRepository;
        this.paymentRepository = paymentRepository;
        this.monthIncomesOutcomesCalculator = monthIncomesOutcomesCalculator;
        this.caseTypeOutcomesCalculator = caseTypeOutcomesCalculator;
        this.clientIncomesOutcomesCalculator = clientIncomesOutcomesCalculator;
        this.legalCaseService = legalCaseService;
    }

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
        LocalDateTime firstDayOfCurrentMonth = getFirstDayOfMonth(currentDateTime);
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
                .sorted(Comparator.comparing(AttorneyOfTheMonthDto::getAttorneyFullName))
                .sorted(Comparator.comparingDouble(AttorneyOfTheMonthDto::getSuccessfullyClosedRate).reversed())
                .toList();
    }

    @Override
    public StatsByDatesDto getStatsByDates(String dateFromStr, String dateToStr) {
        LocalDateTime dateFrom = LocalDate.parse(dateFromStr, REACT_DATETIME_FORMATTER).atStartOfDay();
        LocalDateTime dateFromFirstDayOfMonth = getFirstDayOfMonth(dateFrom);
        LocalDateTime dateTo = LocalDate.parse(dateToStr, REACT_DATETIME_FORMATTER).atStartOfDay();
        LocalDateTime dateToLastDayOfMonth = getLastDayOfMonth(dateTo);
        StatsByDatesDto result = new StatsByDatesDto();

        List<Payment> monthPayments = paymentRepository.findByCreatedAtBetween(dateFromFirstDayOfMonth, dateToLastDayOfMonth);
        IncomesOutcomesDto monthIncomesOutcomes = monthIncomesOutcomesCalculator.calculate(monthPayments);
        result.setMonthIncomesOutcomes(monthIncomesOutcomes);

        List<Payment> rangePayments = paymentRepository.findByCreatedAtBetween(dateFrom, dateTo);
        IncomesOutcomesDto caseTypeIncomesOutcomes = caseTypeOutcomesCalculator.calculate(rangePayments);
        result.setCaseTypeIncomesOutcomes(caseTypeIncomesOutcomes);

        IncomesOutcomesDto clientIncomesOutcomes = clientIncomesOutcomesCalculator.calculate(rangePayments);
        result.setClientIncomesOutcomes(clientIncomesOutcomes);

        return result;
    }

    private LatestClosedCaseDto mapToLatestClosedCaseDto(LegalCase legalCase) {
        LatestClosedCaseDto result = new LatestClosedCaseDto();

        result.setClosedDate(legalCase.getUpdatedAt().format(RESPONSE_FORMATTER));
        result.setTitle(legalCase.getTitle());
        result.setStatus(legalCase.getLegalCaseStatus().getName().name());
        result.setProfit(legalCaseService.getProfitInDollars(legalCase));
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
