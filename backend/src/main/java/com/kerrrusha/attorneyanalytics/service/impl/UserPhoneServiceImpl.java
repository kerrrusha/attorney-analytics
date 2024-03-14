package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.model.user.Phone;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.PhoneRepository;
import com.kerrrusha.attorneyanalytics.service.UserPhoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPhoneServiceImpl implements UserPhoneService {

    private final PhoneRepository phoneRepository;

    @Override
    public void update(User user, String[] values) {
        phoneRepository.deleteAllByUser(user);

        List<Phone> phones = Arrays.stream(values)
                .map(str -> Phone.builder()
                        .value(str)
                        .user(user)
                        .build())
                .toList();

        phoneRepository.saveAll(phones);
        user.setPhones(phones);
    }
}
