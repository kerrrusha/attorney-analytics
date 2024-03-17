package com.kerrrusha.attorneyanalytics.model;

import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.Locale;

public interface MoneyAmountFormattedProvider {

    Long getAmountInCents();

    default String getAmountInCentsFormatted() {
        NumberFormat format = NumberFormat.getNumberInstance(Locale.US);

        DecimalFormatSymbols symbols = ((java.text.DecimalFormat) format).getDecimalFormatSymbols();
        symbols.setGroupingSeparator(' ');

        ((java.text.DecimalFormat) format).setDecimalFormatSymbols(symbols);

        return format.format(getAmountInCents()) + "$";
    }
}
