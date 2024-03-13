package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(config = MapperConfig.class)
public interface UserMapper {

    UserResponseDto toDto(User user);

    default String[] map(Set<Role> value) {
        return value.stream()
                .map(role -> role.getName().name())
                .toArray(String[]::new);
    }
}
