package com.kerrrusha.attorneyanalytics.controller;

import com.google.common.net.HttpHeaders;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserLoginRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.security.AuthenticationService;
import com.kerrrusha.attorneyanalytics.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static com.kerrrusha.attorneyanalytics.helper.AuthHelper.createAuthCookie;
import static com.kerrrusha.attorneyanalytics.helper.AuthHelper.createLogoutCookie;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Registration and authentication endpoints")
public class AuthController {

    private final UserService userService;
    private final AuthenticationService authenticationService;
    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public void register(@Valid @RequestBody UserRegistrationRequestDto requestDto, HttpServletResponse response) {
        userService.register(requestDto);

        UserLoginRequestDto loginRequestDto = UserLoginRequestDto.builder()
                .login(requestDto.getLogin())
                .password(requestDto.getPassword())
                .build();
        login(loginRequestDto, response);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate a user")
    public void login(@Valid @RequestBody UserLoginRequestDto requestDto, HttpServletResponse response) {
        String authToken = authenticationService.authenticate(requestDto).getToken();
        final ResponseCookie cookie = createAuthCookie(authToken);

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public void performLogout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        final ResponseCookie cookie = createLogoutCookie();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        logoutHandler.logout(request, response, authentication);
    }
}
