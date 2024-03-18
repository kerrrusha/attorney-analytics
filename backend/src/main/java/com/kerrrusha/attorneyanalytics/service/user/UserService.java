package com.kerrrusha.attorneyanalytics.service.user;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;

public interface UserService {

    UserResponseDto register(UserRegistrationRequestDto request);

    UserResponseDto findByEmail(String email);

    UserResponseDto update(UserUpdateRequestDto requestDto, String login);
}