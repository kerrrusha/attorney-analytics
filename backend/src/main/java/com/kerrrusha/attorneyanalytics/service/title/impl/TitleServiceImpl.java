package com.kerrrusha.attorneyanalytics.service.title.impl;

import com.kerrrusha.attorneyanalytics.dto.title.TitleResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.TitleMapper;
import com.kerrrusha.attorneyanalytics.model.user.TitleComparator;
import com.kerrrusha.attorneyanalytics.repository.user.TitleRepository;
import com.kerrrusha.attorneyanalytics.service.title.TitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TitleServiceImpl implements TitleService {

    private final TitleRepository titleRepository;
    private final TitleMapper titleMapper;
    private final TitleComparator titleComparator;

    @Override
    public List<TitleResponseDto> findAll() {
        return titleRepository.findAll().stream()
                .sorted(titleComparator)
                .map(titleMapper::toDto)
                .toList();
    }
}
