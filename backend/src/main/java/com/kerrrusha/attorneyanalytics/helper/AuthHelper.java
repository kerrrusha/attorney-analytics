package com.kerrrusha.attorneyanalytics.helper;

import org.springframework.http.ResponseCookie;

public class AuthHelper {

    public static final String AUTH_TOKEN = "AUTH-TOKEN";

    public static ResponseCookie createAuthCookie(String authToken) {
        return createCookie(authToken, 7 * 24 * 3600);
    }

    public static ResponseCookie createLogoutCookie() {
        return createCookie("", 0);
    }

    private static ResponseCookie createCookie(String token, long maxAge) {
        return ResponseCookie.from(AUTH_TOKEN, token)
                .httpOnly(true)
                .maxAge(maxAge)
                .path("/")
                .secure(false)
                .build();
    }
}
