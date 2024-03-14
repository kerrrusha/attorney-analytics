package com.kerrrusha.attorneyanalytics.service;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserFullResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;

public interface UserService {

    UserResponseDto register(UserRegistrationRequestDto request);

    UserResponseDto findByEmail(String email);

    UserFullResponseDto findFullByEmail(String email);

    UserFullResponseDto update(UserUpdateRequestDto requestDto, String login);
}
