package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserFullResponseDto;
import com.kerrrusha.attorneyanalytics.exception.UserAlreadyExistsException;
import com.kerrrusha.attorneyanalytics.model.user.Admission;
import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.Location;
import com.kerrrusha.attorneyanalytics.model.user.Phone;
import com.kerrrusha.attorneyanalytics.model.user.PracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.repository.RoleRepository;
import com.kerrrusha.attorneyanalytics.repository.TitleRepository;
import com.kerrrusha.attorneyanalytics.service.UserService;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.UserMapper;
import com.kerrrusha.attorneyanalytics.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

        List<Email> expected = new ArrayList<>();
        Email email = new Email("mail@mail.com", user);
        expected.add(email);
        user.setEmails(expected);

        User savedUser = userRepository.save(user);
        List<Email> actual = savedUser.getEmails();

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
            List<Email> emails = Arrays.stream(requestDto.getEmails())
                    .map(emailStr -> new Email(emailStr, user))
                    .collect(toCollection(ArrayList::new));
            user.setEmails(emails);
        }
        if (nonNull(requestDto.getPhones())) {
            List<Phone> phones = Arrays.stream(requestDto.getPhones())
                    .map(Phone::new)
                    .collect(toCollection(ArrayList::new));
            user.setPhones(phones);
        }
        if (nonNull(requestDto.getLocations())) {
            List<Location> locations = Arrays.stream(requestDto.getLocations())
                    .map(Location::new)
                    .collect(toCollection(ArrayList::new));
            user.setLocations(locations);
        }
        if (nonNull(requestDto.getAdmissions())) {
            List<Admission> admissions = Arrays.stream(requestDto.getAdmissions())
                    .map(Admission::new)
                    .collect(toCollection(ArrayList::new));
            user.setAdmissions(admissions);
        }
        if (nonNull(requestDto.getPracticeAreas())) {
            List<PracticeArea> practiceAreas = Arrays.stream(requestDto.getPracticeAreas())
                    .map(PracticeArea::new)
                    .collect(toCollection(ArrayList::new));
            user.setPracticeAreas(practiceAreas);
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
