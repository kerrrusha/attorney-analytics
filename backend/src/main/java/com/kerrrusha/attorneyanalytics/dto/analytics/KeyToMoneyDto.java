package com.kerrrusha.attorneyanalytics.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeyToMoneyDto {

    protected String key;
    protected Long value;
}
