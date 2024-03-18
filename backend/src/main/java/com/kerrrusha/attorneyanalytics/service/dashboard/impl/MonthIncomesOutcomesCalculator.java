package com.kerrrusha.attorneyanalytics.service.dashboard.impl;

import com.kerrrusha.attorneyanalytics.dto.dashboard.KeyToMoneyDto;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;
import com.kerrrusha.attorneyanalytics.service.dashboard.AbstractIncomesOutcomesCalculator;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;

@Service("month")
public class MonthIncomesOutcomesCalculator extends AbstractIncomesOutcomesCalculator {

    private static final DateTimeFormatter PRE_PROCESS_FORMATTER = DateTimeFormatter.ofPattern("yyyy MM");
    private static final DateTimeFormatter TARGET_FORMATTER = DateTimeFormatter.ofPattern("MMMM yyyy");

    @Override
    protected Comparator<? super Map.Entry<String, List<Payment>>> getSortingComparator() {
        return Map.Entry.comparingByKey();
    }

    @Override
    protected Map<String, List<Payment>> group(List<Payment> payments) {
        return payments.stream()
                .collect(groupingBy(payment -> payment.getUpdatedAt().format(PRE_PROCESS_FORMATTER)));
    }

    @Override
    protected void postProcessKeyToMoneyDto(KeyToMoneyDto keyToMoneyDto) {
        String preProcessYearMonth = keyToMoneyDto.getKey();
        YearMonth yearMonth = YearMonth.parse(preProcessYearMonth, PRE_PROCESS_FORMATTER);
        String targetKey = yearMonth.format(TARGET_FORMATTER);
        keyToMoneyDto.setKey(targetKey);
    };
}
