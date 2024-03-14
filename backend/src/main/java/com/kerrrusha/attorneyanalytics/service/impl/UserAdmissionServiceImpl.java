package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.model.user.Admission;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.AdmissionRepository;
import com.kerrrusha.attorneyanalytics.service.UserAdmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAdmissionServiceImpl implements UserAdmissionService {

    private final AdmissionRepository admissionRepository;

    @Override
    public void update(User user, String[] values) {
        admissionRepository.deleteAllByUser(user);

        List<Admission> entities = Arrays.stream(values)
                .map(str -> Admission.builder()
                        .value(str)
                        .user(user)
                        .build())
                .toList();

        admissionRepository.saveAll(entities);
        user.setAdmissions(entities);
    }
}
