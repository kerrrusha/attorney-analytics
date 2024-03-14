package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.model.user.PracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.PracticeAreaRepository;
import com.kerrrusha.attorneyanalytics.service.UserPracticeAreaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPracticeAreaServiceImpl implements UserPracticeAreaService {

    private final PracticeAreaRepository practiceAreaRepository;

    @Override
    public void update(User user, String[] values) {
        practiceAreaRepository.deleteAllByUser(user);

        List<PracticeArea> entities = Arrays.stream(values)
                .map(str -> PracticeArea.builder()
                        .value(str)
                        .user(user)
                        .build())
                .toList();

        practiceAreaRepository.saveAll(entities);
        user.setPracticeAreas(entities);
    }
}
