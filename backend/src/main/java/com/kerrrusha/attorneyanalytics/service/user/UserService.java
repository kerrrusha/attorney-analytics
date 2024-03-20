package com.kerrrusha.attorneyanalytics.service.user;

import com.kerrrusha.attorneyanalytics.dto.user.request.FireEmployeeRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.HireEmployeeRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.EmployeeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UsersGroupedByTitleDto;

import java.util.List;

public interface UserService {

    UserResponseDto register(UserRegistrationRequestDto request);

    void hireEmployee(HireEmployeeRequestDto requestDto);

    void fireEmployee(FireEmployeeRequestDto requestDto);

    UserResponseDto findByEmail(String email);

    UserResponseDto update(UserUpdateRequestDto requestDto, String login);

    List<UsersGroupedByTitleDto> getGroupedByTitle();

    EmployeeResponseDto findByFullName(String fullName);

    List<UserResponseDto> findByLastName(String lastName);
}
