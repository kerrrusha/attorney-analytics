package com.kerrrusha.attorneyanalytics.service.analytics.impl;

import com.kerrrusha.attorneyanalytics.dto.analytics.AboutUsDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.LatestClosedCaseDto;
import com.kerrrusha.attorneyanalytics.model.FullNameProvider;
import com.kerrrusha.attorneyanalytics.model.client.Client;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseStatus;
import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCaseType;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentStatus;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.model.user.UserTitleComparator;
import com.kerrrusha.attorneyanalytics.repository.client.ClientRepository;
import com.kerrrusha.attorneyanalytics.repository.legal_case.LegalCaseRepository;
import com.kerrrusha.attorneyanalytics.repository.payment.PaymentRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.analytics.AbstractIncomesOutcomesCalculator;
import com.kerrrusha.attorneyanalytics.service.legal_case.impl.LegalCaseServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static java.util.Collections.singletonList;
import static java.util.stream.Collectors.joining;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AnalyticsServiceImplTest {

    private static final DateTimeFormatter LATEST_CLOSED_CASE_DATETIME_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final String LATEST_CLOSED_CASE_FULLNAME_SEPARATOR = ", ";
    private static final Long EXAMPLE_OUTCOME = 10000L;
    private static final Long EXAMPLE_INCOME = 20000L;

    @Mock
    private UserRepository userRepository;
    @Mock
    private ClientRepository clientRepository;
    @Mock
    private LegalCaseRepository legalCaseRepository;
    @Mock
    private PaymentRepository paymentRepository;
    @Mock
    private AbstractIncomesOutcomesCalculator monthIncomesOutcomesCalculator;
    @Mock
    private AbstractIncomesOutcomesCalculator caseTypeOutcomesCalculator;
    @Mock
    private AbstractIncomesOutcomesCalculator clientIncomesOutcomesCalculator;
    @Mock
    private UserTitleComparator userTitleComparator;
    @Mock
    private LegalCaseServiceImpl legalCaseService;

    @InjectMocks
    private AnalyticsServiceImpl analyticsService;

    private LegalCase exampleValidLegalCase;
    private List<User> exampleUsers;
    private List<Client> exampleClients;
    private List<LegalCase> exampleLegalCases;
    private List<Payment> exampleValidPayments;

    @BeforeEach
    public void init() {
        exampleUsers = List.of(
                User.builder().id(1L).firstName("example firstName 1").build(),
                User.builder().id(2L).firstName("example firstName 2").build(),
                User.builder().id(3L).firstName("example firstName 3").build()
        );
        exampleClients = List.of(
                Client.builder().id(1L).firstName("example firstName 1").build(),
                Client.builder().id(2L).firstName("example firstName 2").build(),
                Client.builder().id(3L).firstName("example firstName 3").build()
        );

        exampleValidLegalCase = LegalCase.builder()
                .id(1L)
                .title("example title 1")
                .assignedAttorneys(exampleUsers)
                .assignedClients(exampleClients)
                .description("example description 1")
                .legalCaseStatus(LegalCaseStatus.builder().name(LegalCaseStatus.CaseStatusName.SUCCESS).build())
                .legalCaseType(LegalCaseType.builder().name("Legal Consultation").build())
                .createdAt(LocalDateTime.of(2024, 5, 10, 0, 0, 0))
                .updatedAt(LocalDateTime.of(2024, 5, 12, 0, 0, 0))
                .build();
        exampleValidPayments = List.of(
                Payment.builder()
                        .id(1L)
                        .legalCase(exampleValidLegalCase)
                        .createdAt(LocalDateTime.of(2024, 5, 11, 0, 0, 0))
                        .updatedAt(LocalDateTime.of(2024, 5, 11, 1, 0, 0))
                        .amountInCents(EXAMPLE_OUTCOME)
                        .paymentStatus(PaymentStatus.builder().name(PaymentStatus.PaymentStatusName.SUCCESS).build())
                        .paymentType(PaymentType.builder().name(PaymentType.PaymentTypeName.OUTCOME).build())
                        .build(),
                Payment.builder()
                        .id(1L)
                        .createdAt(LocalDateTime.of(2024, 5, 12, 0, 0, 0))
                        .updatedAt(LocalDateTime.of(2024, 5, 12, 1, 0, 0))
                        .legalCase(exampleValidLegalCase)
                        .amountInCents(EXAMPLE_INCOME)
                        .paymentStatus(PaymentStatus.builder().name(PaymentStatus.PaymentStatusName.SUCCESS).build())
                        .paymentType(PaymentType.builder().name(PaymentType.PaymentTypeName.INCOME).build())
                        .build()
        );

        exampleLegalCases = List.of(
                exampleValidLegalCase,
                LegalCase.builder().id(2L).title("example title 2").build(),
                LegalCase.builder().id(3L).title("example title 3").build()
        );
    }

    @Test
    void collectInfoAboutUs_ok() {
        Long exampleCasesCount = (long) exampleLegalCases.size();
        Long exampleUsersCount = (long) exampleUsers.size();
        Long exampleClientsCount = (long) exampleClients.size();

        when(legalCaseRepository.countByLegalCaseStatusName(any())).thenReturn(exampleCasesCount);
        when(userRepository.count()).thenReturn(exampleUsersCount);
        when(clientRepository.count()).thenReturn(exampleClientsCount);

        AboutUsDto actual = analyticsService.collectInfoAboutUs();

        for (Long count : actual.getCaseStatusToAmount().values()) {
            assertEquals(exampleCasesCount, count);
        }
        assertEquals(exampleUsersCount, actual.getWorkers());
        assertEquals(exampleClientsCount, actual.getClients());
    }

    @Test
    void getLatestClosedCases_ok() {
        when(legalCaseRepository.findByOrderByCreatedAtDesc(any())).thenReturn(singletonList(exampleValidLegalCase));
        when(legalCaseService.getProfitInDollars(exampleValidLegalCase)).thenReturn(EXAMPLE_INCOME - EXAMPLE_OUTCOME);

        List<LatestClosedCaseDto> expected = singletonList(LatestClosedCaseDto.builder()
                .closedDate(exampleValidLegalCase.getUpdatedAt().format(LATEST_CLOSED_CASE_DATETIME_FORMATTER))
                .title(exampleValidLegalCase.getTitle())
                .status(exampleValidLegalCase.getLegalCaseStatus().getName().name())
                .profit(legalCaseService.getProfitInDollars(exampleValidLegalCase))
                .assignedAttorneys(exampleValidLegalCase.getAssignedAttorneys()
                        .stream()
                        .map(FullNameProvider::getFullName)
                        .collect(joining(LATEST_CLOSED_CASE_FULLNAME_SEPARATOR)))
                .clients(exampleValidLegalCase.getAssignedClients()
                        .stream()
                        .map(FullNameProvider::getFullName)
                        .collect(joining(LATEST_CLOSED_CASE_FULLNAME_SEPARATOR)))
                .build());

        assertEquals(expected, analyticsService.getLatestClosedCases());
    }

    @Test
    void getAttorneysOfTheMonth() {
    }

    @Test
    void getStatsByDates() {
    }
}