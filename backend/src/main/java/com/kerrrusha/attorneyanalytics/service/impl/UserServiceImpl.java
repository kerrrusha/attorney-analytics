package com.kerrrusha.attorneyanalytics.service.impl;

import com.kerrrusha.attorneyanalytics.exception.UserAlreadyExistsException;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.repository.RoleRepository;
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

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

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
    public UserResponseDto findByEmail(String email) {
        User user = userRepository.findByLogin(email)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + email));
        return userMapper.toDto(user);
    }
}
