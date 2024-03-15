package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.config.MapperConfig;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.model.user.Admission;
import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.Location;
import com.kerrrusha.attorneyanalytics.model.user.Phone;
import com.kerrrusha.attorneyanalytics.model.user.PracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(config = MapperConfig.class)
public interface UserMapper {

    UserResponseDto toDto(User user);

    default String[] map(Set<Role> value) {
        return value.stream()
                .map(role -> role.getName().name())
                .toArray(String[]::new);
    }

    default String map(Title title) {
        return title.getName();
    }

    default String[] mapLocations(List<Location> locations) {
        return locations.stream()
                .map(Location::getValue)
                .toArray(String[]::new);
    }

    default String[] mapEmails(List<Email> emails) {
        return emails.stream()
                .map(Email::getValue)
                .toArray(String[]::new);
    }

    default String[] mapPhones(List<Phone> phones) {
        return phones.stream()
                .map(Phone::getValue)
                .toArray(String[]::new);
    }

    default String[] mapAdmissions(List<Admission> admissions) {
        return admissions.stream()
                .map(Admission::getValue)
                .toArray(String[]::new);
    }

    default String[] mapPracticeAreas(List<PracticeArea> practiceAreas) {
        return practiceAreas.stream()
                .map(PracticeArea::getValue)
                .toArray(String[]::new);
    }
}
