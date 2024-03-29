package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.user.request.FireEmployeeRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.HireEmployeeRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.EmployeeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UsersGroupedByTitleDto;
import com.kerrrusha.attorneyanalytics.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/info")
    public UserResponseDto getCurrentUserInfo(Principal principal) {
        String email = principal.getName();
        return userService.findByEmail(email);
    }

    @PostMapping("/update")
    public UserResponseDto updateUser(@RequestBody UserUpdateRequestDto requestDto, Principal principal) {
        String login = principal.getName();
        return userService.update(requestDto, login);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/authorized")
    public void isAuthorized() {}

    @GetMapping("/grouped-by-title")
    public List<UsersGroupedByTitleDto> getGroupedByTitle() {
        return userService.getGroupedByTitle();
    }

    @GetMapping("/{fullName}")
    public EmployeeResponseDto getEmployee(@PathVariable String fullName) {
        return userService.findByFullName(fullName);
    }

    @PostMapping("/hire")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void hireEmployee(@RequestBody HireEmployeeRequestDto requestDto) {
        userService.hireEmployee(requestDto);
    }

    @PostMapping("/fire")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void fireEmployee(@RequestBody FireEmployeeRequestDto requestDto) {
        userService.fireEmployee(requestDto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/search/lastName/{lastName}")
    public List<UserResponseDto> searchByLastName(@PathVariable String lastName) {
        return userService.findByLastName(lastName);
    }
}
