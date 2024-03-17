package com.kerrrusha.attorneyanalytics.service.dashboard.impl;

import com.kerrrusha.attorneyanalytics.dto.dashboard.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.AttorneyOfTheMonthDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.IncomesOutcomesDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.KeyValueDataDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.dto.dashboard.StatsByDatesDto;
import com.kerrrusha.attorneyanalytics.model.FullNameProvider;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    private static final DateTimeFormatter RESPONSE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final DateTimeFormatter REACT_DATETIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final String SEPARATOR = ", ";
    private static final String SPACE = " ";
    private static final int CENTS_IN_DOLLAR = 100;

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final LegalCaseRepository legalCaseRepository;
    private final PaymentRepository paymentRepository;

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

        IncomesOutcomesDto monthIncomesOutcomes = new IncomesOutcomesDto();
        List<Payment> monthPayments = paymentRepository.findByCreatedAtBetween(dateFromFirstDayOfMonth, dateToLastDayOfMonth);
        monthIncomesOutcomes.setIncomes(groupByKeyOrderByKey(getMonthIncomes(monthPayments)));
        monthIncomesOutcomes.setOutcomes(groupByKeyOrderByKey(getMonthOutcomes(monthPayments)));
        result.setMonthIncomesOutcomes(monthIncomesOutcomes);

        IncomesOutcomesDto caseTypeIncomesOutcomes = new IncomesOutcomesDto();
        List<Payment> rangePayments = paymentRepository.findByCreatedAtBetween(dateFrom, dateTo);
        caseTypeIncomesOutcomes.setIncomes(groupByKeyOrderByValue(getCaseTypeIncomes(rangePayments)));
        caseTypeIncomesOutcomes.setOutcomes(groupByKeyOrderByValue(getCaseTypeOutcomes(rangePayments)));
        result.setCaseTypeIncomesOutcomes(caseTypeIncomesOutcomes);

        IncomesOutcomesDto clientIncomesOutcomes = new IncomesOutcomesDto();
        clientIncomesOutcomes.setIncomes(groupByKeyOrderByValue(getClientIncomes(rangePayments)));
        clientIncomesOutcomes.setOutcomes(groupByKeyOrderByValue(getClientOutcomes(rangePayments)));
        result.setClientIncomesOutcomes(clientIncomesOutcomes);

        return result;
    }

    private List<KeyValueDataDto> groupByKeyOrderByKey(List<KeyValueDataDto> keyValues) {
        return groupByKeyOrderBy(keyValues,
                Comparator.comparing(KeyValueDataDto::getKey));
    }

    private List<KeyValueDataDto> groupByKeyOrderByValue(List<KeyValueDataDto> keyValues) {
        return groupByKeyOrderBy(keyValues,
                Comparator.comparing(KeyValueDataDto::getValue));
    }

    private List<KeyValueDataDto> groupByKeyOrderBy(List<KeyValueDataDto> keyValues,
                                                       Comparator<KeyValueDataDto> sortingComparator) {
        Map<String, Long> keyValueMap = new HashMap<>();

        for (KeyValueDataDto keyValue : keyValues) {
            String key = keyValue.getKey();
            Long value = keyValue.getValue();

            keyValueMap.merge(key, value, Long::sum);
        }

        List<KeyValueDataDto> groupedKeyValues = new ArrayList<>();
        for (Map.Entry<String, Long> entry : keyValueMap.entrySet()) {
            groupedKeyValues.add(new KeyValueDataDto(entry.getKey(), entry.getValue()));
        }

        return groupedKeyValues.stream()
                .sorted(sortingComparator)
                .toList();
    }

    private List<KeyValueDataDto> getClientIncomes(List<Payment> payments) {
        return getKeyValuesDataByPaymentType(
                payments,
                PaymentType.PaymentTypeName.INCOME,
                e -> e.getLegalCase().getAssignedClients().stream()
                        .map(FullNameProvider::getFullName)
                        .collect(joining(SEPARATOR)));
    }

    private List<KeyValueDataDto> getClientOutcomes(List<Payment> payments) {
        return getKeyValuesDataByPaymentType(
                payments,
                PaymentType.PaymentTypeName.OUTCOME,
                e -> e.getLegalCase().getAssignedClients().stream()
                        .map(FullNameProvider::getFullName)
                        .collect(joining(SEPARATOR)));
    }

    private List<KeyValueDataDto> getCaseTypeIncomes(List<Payment> payments) {
        return getKeyValuesDataByPaymentType(
                payments,
                PaymentType.PaymentTypeName.INCOME,
                e -> e.getLegalCase().getLegalCaseType().getName());
    }

    private List<KeyValueDataDto> getCaseTypeOutcomes(List<Payment> payments) {
        return getKeyValuesDataByPaymentType(
                payments,
                PaymentType.PaymentTypeName.OUTCOME,
                e -> e.getLegalCase().getLegalCaseType().getName());
    }

    private List<KeyValueDataDto> getMonthIncomes(List<Payment> payments) {
        return getKeyValuesDataByPaymentType(
                payments,
                PaymentType.PaymentTypeName.INCOME,
                e -> e.getUpdatedAt().getMonth().name() + SPACE + e.getUpdatedAt().getYear());
    }

    private List<KeyValueDataDto> getMonthOutcomes(List<Payment> payments) {
        return getKeyValuesDataByPaymentType(
                payments,
                PaymentType.PaymentTypeName.OUTCOME,
                e -> e.getUpdatedAt().getMonth().name() + SPACE + e.getUpdatedAt().getYear());
    }

    private List<KeyValueDataDto> getKeyValuesDataByPaymentType(
            List<Payment> payments,
            PaymentType.PaymentTypeName typeName,
            Function<Payment, String> getKey) {
        return payments.stream()
                .filter(e -> e.getPaymentType().getName().equals(typeName))
                .map(e -> new KeyValueDataDto(getKey.apply(e), toDollars(e.getAmountInCents())))
                .toList();
    }

    private Long toDollars(Long amountInCents) {
        return amountInCents / CENTS_IN_DOLLAR;
    }

    private LocalDateTime getFirstDayOfMonth(LocalDateTime dateTime) {
        return dateTime.withDayOfMonth(1);
    }

    private LocalDateTime getLastDayOfMonth(LocalDateTime dateTime) {
        return dateTime.plusMonths(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);
    }

    private LatestClosedCaseDto mapToLatestClosedCaseDto(LegalCase legalCase) {
        LatestClosedCaseDto result = new LatestClosedCaseDto();

        result.setClosedDate(legalCase.getUpdatedAt().format(RESPONSE_FORMATTER));
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
