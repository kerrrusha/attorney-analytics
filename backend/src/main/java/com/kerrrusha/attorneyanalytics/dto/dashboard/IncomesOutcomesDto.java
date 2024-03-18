package com.kerrrusha.attorneyanalytics.dto.dashboard;

import lombok.Data;

import java.util.List;

@Data
public class IncomesOutcomesDto {

    private List<KeyToMoneyDto> incomes;
    private List<KeyToMoneyDto> outcomes;
}
