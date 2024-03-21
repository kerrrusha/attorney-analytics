package com.kerrrusha.attorneyanalytics.dto.legal_case;

import com.kerrrusha.attorneyanalytics.dto.clients.response.ClientResponseDto;
import com.kerrrusha.attorneyanalytics.dto.payments.PaymentResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.EmployeeResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class LegalCaseResponseDto {

    private Long id;
    private String createdAt;
    private String updatedAt;
    private String title;
    private String description;
    private String status;
    private String type;
    private List<ClientResponseDto> assignedClients;
    private List<EmployeeResponseDto> assignedAttorneys;
    private List<PaymentResponseDto> assignedPayments;
}
