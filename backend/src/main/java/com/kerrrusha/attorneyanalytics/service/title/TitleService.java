package com.kerrrusha.attorneyanalytics.service.title;

import com.kerrrusha.attorneyanalytics.dto.title.TitleResponseDto;

import java.util.List;

public interface TitleService {

    List<TitleResponseDto> findAll();
}
