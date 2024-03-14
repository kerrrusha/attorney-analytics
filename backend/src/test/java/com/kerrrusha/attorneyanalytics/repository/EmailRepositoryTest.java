package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

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
    private UserRepository userRepository;

    @Test
    void user_setEmails_ok() {
        User user = insertUser();

        List<Email> expected = createList(new Email(EMAIL));
        user.setEmails(expected);
        userRepository.save(user);

        List<Email> actual = userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails();

        assertIterableEquals(expected, actual);
    }

    @Test
    void email_deleteAllByUserId_ok() {
        User user = insertUser();

        List<Email> prevEmails = createList(new Email(EMAIL));
        user.setEmails(prevEmails);
        userRepository.save(user);

        assertIterableEquals(prevEmails, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());

        List<Email> expected = emptyList();
        user.setEmails(expected);
        userRepository.save(user);

        assertIterableEquals(expected, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());
    }

    @Test
    void user_updateEmails_ok() {
        User user = insertUser();
        List<Email> prevEmails = createList(
                new Email("user_updateEmails_ok@test.com")
        );
        user.setEmails(prevEmails);
        userRepository.save(user);

        assertIterableEquals(prevEmails, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());

        List<Email> newEmails = createList(
                new Email("user_updateEmails_ok@test.com"),
                new Email("user_123_updateEmails_ok@test.com")
        );
        user.setEmails(newEmails);
        userRepository.save(user);

        assertIterableEquals(newEmails, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());
    }

    @SafeVarargs
    private static <T> List<T> createList(T... elements) {
        List<T> result = new ArrayList<>();
        Collections.addAll(result, elements);
        return result;
    }

    private User insertUser() {
        User user = User.builder()
                .id(ID)
                .firstName(FIRST_NAME)
                .lastName(LAST_NAME)
                .login(LOGIN)
                .password(PASSWORD)
                .build();
        userRepository.save(user);

        return userRepository.findByLogin(user.getLogin()).orElseThrow();
    }
}