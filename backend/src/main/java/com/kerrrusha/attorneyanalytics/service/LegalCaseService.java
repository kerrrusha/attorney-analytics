package com.kerrrusha.attorneyanalytics.service;

import com.kerrrusha.attorneyanalytics.model.legal_case.LegalCase;

public interface LegalCaseService {

    Long getProfitInDollars(LegalCase legalCase);
}
