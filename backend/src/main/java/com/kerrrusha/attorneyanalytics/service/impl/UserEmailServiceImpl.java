package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.EmailRepository;
import com.kerrrusha.attorneyanalytics.service.UserEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserEmailServiceImpl implements UserEmailService {

    private final EmailRepository emailRepository;

    @Override
    public void update(User user, String[] values) {
        emailRepository.deleteAllByUser(user);

        List<Email> emails = Arrays.stream(values)
                .map(str -> Email.builder()
                        .value(str)
                        .user(user)
                        .build())
                .toList();

        emailRepository.saveAll(emails);
        user.setEmails(emails);
    }
}
