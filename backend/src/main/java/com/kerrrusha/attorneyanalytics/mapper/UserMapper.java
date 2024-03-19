package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.user.response.EmployeeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.model.user.UserAdmission;
import com.kerrrusha.attorneyanalytics.model.user.UserEmail;
import com.kerrrusha.attorneyanalytics.model.user.UserLocation;
import com.kerrrusha.attorneyanalytics.model.user.UserPhone;
import com.kerrrusha.attorneyanalytics.model.user.UserPracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(config = MapperConfig.class)
public interface UserMapper {

    EmployeeResponseDto toEmployeeDto(User user);

    UserResponseDto toDto(User user);

    default String[] map(Set<Role> value) {
        return value.stream()
                .map(role -> role.getName().name())
                .toArray(String[]::new);
    }

    default String map(Title title) {
        return title.getName();
    }

    default String[] mapLocations(List<UserLocation> userLocations) {
        return userLocations.stream()
                .map(UserLocation::getValue)
                .toArray(String[]::new);
    }

    default String[] mapEmails(List<UserEmail> userEmails) {
        return userEmails.stream()
                .map(UserEmail::getValue)
                .toArray(String[]::new);
    }

    default String[] mapPhones(List<UserPhone> userPhones) {
        return userPhones.stream()
                .map(UserPhone::getValue)
                .toArray(String[]::new);
    }

    default String[] mapAdmissions(List<UserAdmission> userAdmissions) {
        return userAdmissions.stream()
                .map(UserAdmission::getValue)
                .toArray(String[]::new);
    }

    default String[] mapPracticeAreas(List<UserPracticeArea> userPracticeAreas) {
        return userPracticeAreas.stream()
                .map(UserPracticeArea::getValue)
                .toArray(String[]::new);
    }
}
