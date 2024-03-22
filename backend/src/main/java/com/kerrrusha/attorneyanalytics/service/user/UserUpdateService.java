package com.kerrrusha.attorneyanalytics.service.user;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;

public interface UserUpdateService {
    UserResponseDto update(UserUpdateRequestDto requestDto, String updatedByLogin);
}
