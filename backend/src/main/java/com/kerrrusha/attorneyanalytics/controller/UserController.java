package com.kerrrusha.attorneyanalytics.controller;

import com.kerrrusha.attorneyanalytics.dto.user.response.UserFullResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.repository.UserRepository;
import com.kerrrusha.attorneyanalytics.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
    private final UserRepository userRepository;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @GetMapping("/info")
    public UserResponseDto getUserInfo(Principal principal) {
        String email = principal.getName();
        return userService.findByEmail(email);
    }

    @GetMapping("/full-info")
    public UserFullResponseDto getUserFullInfo(Principal principal) {
        String email = principal.getName();
        return userService.findFullByEmail(email);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/authorized")
    public void isAuthorized() {}
}
