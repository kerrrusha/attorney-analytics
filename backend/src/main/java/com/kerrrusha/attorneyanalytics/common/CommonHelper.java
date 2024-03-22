package com.kerrrusha.attorneyanalytics.common;

import com.kerrrusha.attorneyanalytics.model.ValueProvider;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.joining;

public class CommonHelper {

    public static final int CENTS_IN_DOLLAR = 100;
    private static final String DELIMITER = ", ";

    @SafeVarargs
    public static <T> List<T> createList(T... elements) {
        List<T> result = new ArrayList<>();
        Collections.addAll(result, elements);
        return result;
    }

    public static Long toDollars(Long amountInCents) {
        return amountInCents / CENTS_IN_DOLLAR;
    }

    public static LocalDateTime getFirstDayOfMonth(LocalDateTime dateTime) {
        return dateTime.withDayOfMonth(1);
    }

    public static LocalDateTime getLastDayOfMonth(LocalDateTime dateTime) {
        return dateTime.plusMonths(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);
    }

    public static Long calculatePaymentsTotal(List<Payment> paymentsList) {
        return paymentsList.stream()
                .mapToLong(Payment::getAmountInCents)
                .sum();
    }

    public static String join(List<? extends ValueProvider> list) {
        return list.stream()
                .map(ValueProvider::getValue)
                .collect(joining(DELIMITER));
    }

    public static List<String> toStringList(List<? extends ValueProvider> list) {
        return list.stream()
                .map(ValueProvider::getValue)
                .toList();
    }

    public static List<String> refine(String[] strings) {
        return Arrays.stream(strings)
                .map(String::toLowerCase)
                .map(String::trim)
                .filter(StringUtils::isNotBlank)
                .distinct()
                .toList();
    }
}
