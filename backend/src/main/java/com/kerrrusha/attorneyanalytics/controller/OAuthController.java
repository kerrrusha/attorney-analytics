package com.kerrrusha.attorneyanalytics.controller;

import com.google.common.net.HttpHeaders;
import com.kerrrusha.attorneyanalytics.dto.oauth.GoogleOAuthLoginRequestDto;
import com.kerrrusha.attorneyanalytics.security.GoogleOAuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.kerrrusha.attorneyanalytics.common.helper.AuthHelper.createAuthCookie;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {

    private final GoogleOAuthService googleOAuthService;

    @PostMapping("/google/login")
    public ResponseEntity<Void> loginGoogle(@Valid @RequestBody GoogleOAuthLoginRequestDto requestBody, HttpServletResponse response) {
        String authToken = googleOAuthService.authenticate(requestBody);
        final ResponseCookie cookie = createAuthCookie(authToken);

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }
}
