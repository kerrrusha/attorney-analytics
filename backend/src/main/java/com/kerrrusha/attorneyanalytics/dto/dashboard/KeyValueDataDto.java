package com.kerrrusha.attorneyanalytics.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeyValueDataDto {

    private String key;
    private Long value;
}
