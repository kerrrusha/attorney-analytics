package com.kerrrusha.attorneyanalytics.service.analytics.impl;

import com.kerrrusha.attorneyanalytics.model.FullNameProvider;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.service.analytics.AbstractIncomesOutcomesCalculator;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.joining;

@Service("client")
public class ClientIncomesOutcomesCalculator extends AbstractIncomesOutcomesCalculator {

    private static final String DELIMITER = ",";

    @Override
    protected Comparator<? super Map.Entry<String, List<Payment>>> getSortingComparator() {
        return SORT_BY_MONEY_DESC;
    }

    @Override
    protected Map<String, List<Payment>> group(List<Payment> payments) {
        return payments.stream()
                .collect(groupingBy(payment -> payment.getLegalCase().getAssignedClients().stream()
                        .map(FullNameProvider::getFullName)
                        .collect(joining(DELIMITER))));
    }
}
