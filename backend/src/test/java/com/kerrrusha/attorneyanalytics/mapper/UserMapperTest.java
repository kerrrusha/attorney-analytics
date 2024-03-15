package com.kerrrusha.attorneyanalytics.mapper;

import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.model.user.Admission;
import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.Location;
import com.kerrrusha.attorneyanalytics.model.user.Phone;
import com.kerrrusha.attorneyanalytics.model.user.PracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.apache.commons.lang3.ArrayUtils.toArray;

@SpringBootTest
class UserMapperTest {

    private static final long ID = 12345L;
    private static final String FIRST_NAME = "Testfirst";
    private static final String LAST_NAME = "Testlast";
    private static final String LOGIN = "login@login.com";
    private static final String PASSWORD = "fjicy3975y09483--U(c8090";
    private static final String PROFILE_PHOTO_URL = "https://cdn.com/photo.jpg";
    private static final String LINKEDIN_URL = "https://linkedin.com/in/example";
    private static final String BIO = "Very cool and long bio about how smart and cool I am";
    private static final String TITLE = "CEO";
    private static final String LOCATION = "Los Angeles, CA";
    private static final String EMAIL = "mail@mail.com";
    private static final String PHONE = "+380123456789";
    private static final String ADMISSION = "California";
    private static final String PRACTICE_AREA = "IT";

    @Autowired
    private UserMapper userMapper;

    @Test
    void toFullDto() {
        User user = User.builder()
                .id(ID)
                .firstName(FIRST_NAME)
                .lastName(LAST_NAME)
                .login(LOGIN)
                .password(PASSWORD)
                .profilePhotoUrl(PROFILE_PHOTO_URL)
                .linkedinUrl(LINKEDIN_URL)
                .bio(BIO)
                .title(Title.builder().name(TITLE).build())
                .locations(List.of(Location.builder().value(LOCATION).build()))
                .emails(List.of(Email.builder().value(EMAIL).build()))
                .phones(List.of(Phone.builder().value(PHONE).build()))
                .admissions(List.of(Admission.builder().value(ADMISSION).build()))
                .practiceAreas(List.of(PracticeArea.builder().value(PRACTICE_AREA).build()))
                .build();
        UserResponseDto expected = UserResponseDto.builder()
                .id(ID)
                .firstName(FIRST_NAME)
                .lastName(LAST_NAME)
                .login(LOGIN)
                .profilePhotoUrl(PROFILE_PHOTO_URL)
                .linkedinUrl(LINKEDIN_URL)
                .bio(BIO)
                .title(TITLE)
                .locations(toArray(LOCATION))
                .emails(toArray(EMAIL))
                .phones(toArray(PHONE))
                .admissions(toArray(ADMISSION))
                .practiceAreas(toArray(PRACTICE_AREA))
                .build();

        UserResponseDto actual = userMapper.toDto(user);
        assertEquals(expected, actual);
    }
}
