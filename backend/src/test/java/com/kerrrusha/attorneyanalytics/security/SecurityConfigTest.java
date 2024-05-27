package com.kerrrusha.attorneyanalytics.security;

import com.kerrrusha.attorneyanalytics.config.SecurityConfig;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
class SecurityConfigTest {

    private final SecurityConfig securityConfig = new SecurityConfig(null, null);

    @Test
    void passwordEncoder_encodesSameLength_ok() {
        PasswordEncoder encoder = securityConfig.passwordEncoder();
        final List<String> examplePasswords = List.of(
                "realcooladminpassword123",
                "kfsjdbfk12",
                " "
        );

        Integer prevPasswordLength = null;
        for (String password : examplePasswords) {
            String encodedPassword = encoder.encode(password);
            log.info("Encoded password: {}", encodedPassword);
            if (prevPasswordLength != null) {
                assertEquals(prevPasswordLength, encodedPassword.length());
            }
            prevPasswordLength = encodedPassword.length();
        }
    }
}
