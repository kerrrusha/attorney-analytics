package com.kerrrusha.attorneyanalytics.service.analytics;

import com.kerrrusha.attorneyanalytics.dto.analytics.IncomesOutcomesDto;
import com.kerrrusha.attorneyanalytics.dto.analytics.KeyToMoneyDto;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.model.payment.PaymentType;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.calculatePaymentsTotal;
import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toDollars;
import static java.util.Comparator.reverseOrder;

public abstract class AbstractIncomesOutcomesCalculator {

    protected Comparator<? super Map.Entry<String, List<Payment>>> SORT_BY_MONEY_DESC =
            Comparator.comparing(paymentsGrouped -> calculatePaymentsTotal(paymentsGrouped.getValue()), reverseOrder());

    public IncomesOutcomesDto calculate(List<Payment> payments) {
        IncomesOutcomesDto result = new IncomesOutcomesDto();
        result.setIncomes(getIncomes(payments));
        result.setOutcomes(getOutcomes(payments));
        return result;
    }
    private List<KeyToMoneyDto> getIncomes(List<Payment> payments) {
        return map(sort(group(filterByType(payments, PaymentType.PaymentTypeName.INCOME))));
    }

    private List<KeyToMoneyDto> getOutcomes(List<Payment> payments) {
        return map(sort(group(filterByType(payments, PaymentType.PaymentTypeName.OUTCOME))));
    }

    private List<KeyToMoneyDto> map(List<Map.Entry<String, List<Payment>>> sorted) {
        return sorted.stream()
                .map(this::mapToKeyToMoneyDto)
                .peek(this::postProcessKeyToMoneyDto)
                .toList();
    }

    private KeyToMoneyDto mapToKeyToMoneyDto(Map.Entry<String, List<Payment>> entry) {
        return new KeyToMoneyDto(
                entry.getKey(),
                entry.getValue().stream()
                        .mapToLong(payment -> toDollars(payment.getAmountInCents()))
                        .sum()
        );
    }

    private List<Map.Entry<String, List<Payment>>> sort(Map<String, List<Payment>> grouped) {
        List<Map.Entry<String, List<Payment>>> sortedGroups = new ArrayList<>(grouped.entrySet());
        sortedGroups.sort(getSortingComparator());
        return sortedGroups;
    }

    private List<Payment> filterByType(List<Payment> payments, PaymentType.PaymentTypeName paymentTypeName) {
        return payments.stream()
                .filter(payment -> payment.getPaymentType().getName().equals(paymentTypeName))
                .toList();
    }

    protected abstract Comparator<? super Map.Entry<String, List<Payment>>> getSortingComparator();

    protected abstract Map<String, List<Payment>> group(List<Payment> payments);

    protected void postProcessKeyToMoneyDto(KeyToMoneyDto keyToMoneyDto) {
    }
}
