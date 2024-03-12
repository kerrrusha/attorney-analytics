package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.model.User;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface UserMapper {
    UserResponseDto toDto(User user);
}
