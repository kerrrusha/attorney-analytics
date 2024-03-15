package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.exception.UserAlreadyExistsException;
import com.kerrrusha.attorneyanalytics.model.user.UserAdmission;
import com.kerrrusha.attorneyanalytics.model.user.UserEmail;
import com.kerrrusha.attorneyanalytics.model.user.UserLocation;
import com.kerrrusha.attorneyanalytics.model.user.UserPhone;
import com.kerrrusha.attorneyanalytics.model.user.UserPracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.repository.AdmissionRepository;
import com.kerrrusha.attorneyanalytics.repository.EmailRepository;
import com.kerrrusha.attorneyanalytics.repository.LocationRepository;
import com.kerrrusha.attorneyanalytics.repository.PhoneRepository;
import com.kerrrusha.attorneyanalytics.repository.PracticeAreaRepository;
import com.kerrrusha.attorneyanalytics.repository.RoleRepository;
import com.kerrrusha.attorneyanalytics.repository.TitleRepository;
import com.kerrrusha.attorneyanalytics.service.UserService;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.mapper.UserMapper;
import com.kerrrusha.attorneyanalytics.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.util.Collections.singleton;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toCollection;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;
    private final EmailRepository emailRepository;
    private final PhoneRepository phoneRepository;
    private final LocationRepository locationRepository;
    private final PracticeAreaRepository practiceAreaRepository;
    private final AdmissionRepository admissionRepository;

    @Override
    public UserResponseDto register(UserRegistrationRequestDto request) {
        if (userRepository.findByLogin(request.getLogin()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with such login: " + request.getLogin());
        }

        User user = new User();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setLogin(request.getLogin());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setProfilePhotoUrl(request.getProfilePhotoUrl());
        Role workerRole = roleRepository.findByName(Role.RoleName.WORKER).orElseThrow();
        user.setRoles(singleton(workerRole));
        User savedUser = userRepository.save(user);

        return userMapper.toDto(savedUser);
    }

    @Override
    @Transactional
    public UserResponseDto update(UserUpdateRequestDto requestDto, String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + login));
        if (!user.getId().equals(requestDto.getUserId())) {
            throw new RuntimeException("User id in request and in database are different");
        }

        if (nonNull(requestDto.getFirstName())) {
            user.setFirstName(requestDto.getFirstName());
        }
        if (isNotBlank(requestDto.getLastName())) {
            user.setLastName(requestDto.getLastName());
        }
        if (nonNull(requestDto.getProfilePhotoUrl())) {
            user.setProfilePhotoUrl(requestDto.getProfilePhotoUrl());
        }
        if (nonNull(requestDto.getBio())) {
            user.setBio(requestDto.getBio());
        }
        if (nonNull(requestDto.getLinkedinUrl())) {
            user.setLinkedinUrl(requestDto.getLinkedinUrl());
        }
        if (nonNull(requestDto.getTitle())) {
            Title title = titleRepository.findByName(requestDto.getTitle())
                    .orElseThrow(() -> new RuntimeException("Can't find title: " + requestDto.getTitle()));
            user.setTitle(title);
        }
        if (nonNull(requestDto.getEmails())) {
            List<UserEmail> emails = Arrays.stream(requestDto.getEmails())
                    .map(str -> new UserEmail(str, user))
                    .collect(toCollection(ArrayList::new));
            user.getEmails().clear();
            emailRepository.deleteAllByUserId(user.getId());
            user.setEmails(emails);
        }
        if (nonNull(requestDto.getPhones())) {
            List<UserPhone> phones = Arrays.stream(requestDto.getPhones())
                    .map(str -> new UserPhone(str, user))
                    .collect(toCollection(ArrayList::new));
            user.getPhones().clear();
            phoneRepository.deleteAllByUserId(user.getId());
            user.setPhones(phones);
        }
        if (nonNull(requestDto.getLocations())) {
            List<UserLocation> locations = Arrays.stream(requestDto.getLocations())
                    .map(str -> new UserLocation(str, user))
                    .collect(toCollection(ArrayList::new));
            user.getLocations().clear();
            locationRepository.deleteAllByUserId(user.getId());
            user.setLocations(locations);
        }
        if (nonNull(requestDto.getAdmissions())) {
            List<UserAdmission> admissions = Arrays.stream(requestDto.getAdmissions())
                    .map(str -> new UserAdmission(str, user))
                    .collect(toCollection(ArrayList::new));
            user.getAdmissions().clear();
            admissionRepository.deleteAllByUserId(user.getId());
            user.setAdmissions(admissions);
        }
        if (nonNull(requestDto.getPracticeAreas())) {
            List<UserPracticeArea> practiceAreas = Arrays.stream(requestDto.getPracticeAreas())
                    .map(str -> new UserPracticeArea(str, user))
                    .collect(toCollection(ArrayList::new));
            user.getPracticeAreas().clear();
            practiceAreaRepository.deleteAllByUserId(user.getId());
            user.setPracticeAreas(practiceAreas);
        }
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserResponseDto findByEmail(String email) {
        User user = findUserByEmail(email);
        return userMapper.toDto(user);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByLogin(email)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + email));
    }
}
