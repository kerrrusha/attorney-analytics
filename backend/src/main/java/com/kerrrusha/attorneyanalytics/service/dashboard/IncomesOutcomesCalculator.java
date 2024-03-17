package com.kerrrusha.attorneyanalytics.service.dashboard;

import com.kerrrusha.attorneyanalytics.dto.dashboard.IncomesOutcomesDto;
import com.kerrrusha.attorneyanalytics.model.payment.Payment;

import java.util.List;

public interface IncomesOutcomesCalculator {

    IncomesOutcomesDto calculate(List<Payment> payments);
}
