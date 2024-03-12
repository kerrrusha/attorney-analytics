package com.kerrrusha.attorneyanalytics.config;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
class SecurityConfigTest {

    private final SecurityConfig securityConfig = new SecurityConfig(null, null, null);

    @Test
    void passwordEncoder() {
        PasswordEncoder encoder = securityConfig.passwordEncoder();
        final String examplePassword = "realcooladminpassword123";

        String encodedPassword = encoder.encode(examplePassword);
        assertNotNull(encodedPassword);
        log.info("Encoded password: {}", encodedPassword);
    }
}