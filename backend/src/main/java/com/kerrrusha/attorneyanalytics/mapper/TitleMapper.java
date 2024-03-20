package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.title.TitleResponseDto;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface TitleMapper {

    TitleResponseDto toDto(Title title);
}
