package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.model.user.Location;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.LocationRepository;
import com.kerrrusha.attorneyanalytics.service.UserLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserLocationServiceImpl implements UserLocationService {

    private final LocationRepository locationRepository;

    @Override
    public void update(User user, String[] values) {
        locationRepository.deleteAllByUser(user);

        List<Location> entities = Arrays.stream(values)
                .map(str -> Location.builder()
                        .value(str)
                        .user(user)
                        .build())
                .toList();

        locationRepository.saveAll(entities);
        user.setLocations(entities);
    }
}
