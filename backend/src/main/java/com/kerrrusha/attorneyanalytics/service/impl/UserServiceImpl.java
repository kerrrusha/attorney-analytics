package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserFullResponseDto;
import com.kerrrusha.attorneyanalytics.exception.UserAlreadyExistsException;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.repository.RoleRepository;
import com.kerrrusha.attorneyanalytics.repository.TitleRepository;
import com.kerrrusha.attorneyanalytics.service.UserAdmissionService;
import com.kerrrusha.attorneyanalytics.service.UserEmailService;
import com.kerrrusha.attorneyanalytics.service.UserLocationService;
import com.kerrrusha.attorneyanalytics.service.UserPhoneService;
import com.kerrrusha.attorneyanalytics.service.UserPracticeAreaService;
import com.kerrrusha.attorneyanalytics.service.UserService;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.UserMapper;
import com.kerrrusha.attorneyanalytics.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.Collections.singleton;
import static org.apache.commons.lang3.ArrayUtils.isNotEmpty;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;
    private final UserEmailService userEmailService;
    private final UserPhoneService userPhoneService;
    private final UserLocationService userLocationService;
    private final UserAdmissionService userAdmissionService;
    private final UserPracticeAreaService userPracticeAreaService;

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
    public UserFullResponseDto update(UserUpdateRequestDto requestDto, String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + login));
        if (!user.getId().equals(requestDto.getUserId())) {
            throw new RuntimeException("User id in request and in database are different");
        }
        if (isNotBlank(requestDto.getFirstName())) {
            user.setFirstName(requestDto.getFirstName());
        }
        if (isNotBlank(requestDto.getLastName())) {
            user.setLastName(requestDto.getLastName());
        }
        if (isNotBlank(requestDto.getProfilePhotoUrl())) {
            user.setProfilePhotoUrl(requestDto.getProfilePhotoUrl());
        }
        if (isNotBlank(requestDto.getBio())) {
            user.setBio(requestDto.getBio());
        }
        if (isNotBlank(requestDto.getLinkedinUrl())) {
            user.setLinkedinUrl(requestDto.getLinkedinUrl());
        }
        if (isNotBlank(requestDto.getTitle())) {
            Title title = titleRepository.findByName(requestDto.getTitle())
                    .orElseThrow(() -> new RuntimeException("Can't find title: " + requestDto.getTitle()));
            user.setTitle(title);
        }
        if (isNotEmpty(requestDto.getEmails())) {
            userEmailService.update(user, requestDto.getEmails());
        }
        if (isNotEmpty(requestDto.getPhones())) {
            userPhoneService.update(user, requestDto.getPhones());
        }
        if (isNotEmpty(requestDto.getLocations())) {
            userLocationService.update(user, requestDto.getLocations());
        }
        if (isNotEmpty(requestDto.getAdmissions())) {
            userAdmissionService.update(user, requestDto.getAdmissions());
        }
        if (isNotEmpty(requestDto.getPracticeAreas())) {
            userPracticeAreaService.update(user, requestDto.getPracticeAreas());
        }
        return userMapper.toFullDto(userRepository.save(user));
    }

    @Override
    public UserResponseDto findByEmail(String email) {
        User user = findUserByEmail(email);
        return userMapper.toDto(user);
    }

    @Override
    public UserFullResponseDto findFullByEmail(String email) {
        User user = findUserByEmail(email);
        return userMapper.toFullDto(user);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByLogin(email)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + email));
    }
}
