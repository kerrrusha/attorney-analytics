package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.UserEmail;
import com.kerrrusha.attorneyanalytics.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static com.kerrrusha.attorneyanalytics.common.helper.CommonHelper.createList;
import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@Slf4j
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserEmailRepositoryTest {

    private static final long ID = 12345L;
    private static final String FIRST_NAME = "Testfirst";
    private static final String LAST_NAME = "Testlast";
    private static final String LOGIN = "login@login.com";
    private static final String PASSWORD = "fjicy3975y09483--U(c8090";
    private static final String EMAIL = "mail@mail.com";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEmailRepository emailRepository;

    @Test
    void user_setEmails_ok() {
        User user = insertUser();

        UserEmail expectedUserEmail = new UserEmail(EMAIL, user);
        List<UserEmail> expected = createList(expectedUserEmail);
        user.setEmails(new ArrayList<>(expected));
        userRepository.save(user);

        List<UserEmail> actual = userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails();
        assertEquals(1, actual.size());
        UserEmail actualUserEmail = actual.get(0);

        log.info("Expected: {}", expectedUserEmail.getValue());
        log.info("Actual: {}", actualUserEmail.getValue());

        assertIterableEquals(expected, actual);
    }

    @Test
    void email_deleteAllByUserId_ok() {
        User user = insertUser();

        List<UserEmail> prevUserEmails = createList(new UserEmail(EMAIL, user));
        user.setEmails(prevUserEmails);
        userRepository.save(user);

        assertIterableEquals(prevUserEmails, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());

        List<UserEmail> expected = emptyList();
        user.setEmails(expected);
        userRepository.save(user);

        assertIterableEquals(expected, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());
    }

    @Test
    void user_updateEmails_ok() {
        User user = insertUser();
        List<UserEmail> prevUserEmails = createList(
                new UserEmail("user_updateEmails_ok@test.com", user)
        );
        user.setEmails(prevUserEmails);
        userRepository.save(user);

        assertIterableEquals(prevUserEmails, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());

        List<UserEmail> newUserEmails = createList(
                new UserEmail("user_updateEmails_ok@test.com", user),
                new UserEmail("user_123_updateEmails_ok@test.com", user)
        );
        user.getEmails().clear();
        emailRepository.deleteAllByUserId(user.getId());
        user.setEmails(newUserEmails);
        userRepository.save(user);

        assertIterableEquals(newUserEmails, userRepository.findByLogin(user.getLogin()).orElseThrow().getEmails());
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

    private User getUserFromDB(User detached) {
        return userRepository.findByLogin(detached.getLogin()).orElseThrow();
    }
}
