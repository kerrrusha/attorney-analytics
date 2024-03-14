package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EmailRepositoryTest {

    private static final long ID = 12345L;
    private static final String FIRST_NAME = "Testfirst";
    private static final String LAST_NAME = "Testlast";
    private static final String LOGIN = "login@login.com";
    private static final String PASSWORD = "fjicy3975y09483--U(c8090";
    private static final String EMAIL = "mail@mail.com";

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void deleteAllByUser() {
        User user = User.builder()
                .id(ID)
                .firstName(FIRST_NAME)
                .lastName(LAST_NAME)
                .login(LOGIN)
                .password(PASSWORD)
                .build();
        userRepository.save(user);

        assertEquals(user.getLogin(), userRepository.findByLogin(user.getLogin()).orElseThrow().getLogin());

        Email email = Email.builder()
                .value(EMAIL)
                .user(user)
                .build();
        emailRepository.save(email);

        user.setEmails(List.of(email));
        userRepository.save(user);

        assertEquals(List.of(email), userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());
    }
}