package com.kerrrusha.attorneyanalytics.service.clients;

import com.kerrrusha.attorneyanalytics.dto.clients.ClientsPageableResponseDto;
import org.springframework.data.domain.Pageable;

public interface ClientsService {

    ClientsPageableResponseDto findAll(Pageable pageable);
}
