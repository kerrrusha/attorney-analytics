package com.kerrrusha.attorneyanalytics.dto.legal_case;

import lombok.Data;

import java.util.List;

@Data
public class LegalCasePageableResponseDto {

    private Long total;
    private List<LegalCaseResponseDto> data;
}
