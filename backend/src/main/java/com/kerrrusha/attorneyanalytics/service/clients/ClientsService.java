package com.kerrrusha.attorneyanalytics.service.clients;

import com.kerrrusha.attorneyanalytics.dto.clients.request.ClientCreateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.clients.response.ClientsPageableResponseDto;
import org.springframework.data.domain.Pageable;

public interface ClientsService {

    ClientsPageableResponseDto findAll(Pageable pageable);

    void create(ClientCreateRequestDto requestDto);
}
