package com.kerrrusha.attorneyanalytics.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.dto.oauth.GoogleOAuthLoginRequestDto;
import com.kerrrusha.attorneyanalytics.repository.user.RoleRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;

import static java.util.Collections.singleton;

@Slf4j
@Service
public class GoogleOAuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final GoogleIdTokenVerifier verifier;
    private final RandomPasswordGenerator randomPasswordGenerator;

    public GoogleOAuthService(
            @Value("${google.oauth.client-id}") String clientId,
            RoleRepository roleRepository,
            UserRepository userRepository,
            JwtService jwtService,
            RandomPasswordGenerator randomPasswordGenerator) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.randomPasswordGenerator = randomPasswordGenerator;

        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public String authenticate(GoogleOAuthLoginRequestDto requestBody) {
        User user = verifyIDToken(requestBody.getIdToken());
        user = createOrGetUser(user);
        return jwtService.generateToken(user, false);
    }

    @Transactional
    protected User createOrGetUser(User user) {
        User existingUser = userRepository.findByLogin(user.getLogin()).orElse(null);
        if (existingUser != null) {
            return existingUser;
        }
        Role workerRole = roleRepository.findByName(Role.RoleName.WORKER).orElseThrow();
        user.setRoles(singleton(workerRole));
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        return user;
    }

    @SneakyThrows
    private User verifyIDToken(String idToken) {
        GoogleIdToken idTokenObj = verifier.verify(idToken);
        GoogleIdToken.Payload payload = idTokenObj.getPayload();

        String firstName = (String) payload.get("given_name");
        String lastName = (String) payload.get("family_name");
        String email = payload.getEmail();
        String profilePhotoUrl = (String) payload.get("picture");
        String tempPassword = randomPasswordGenerator.generatePassword();

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setProfilePhotoUrl(profilePhotoUrl);
        user.setLogin(email);
        user.setPassword(tempPassword);

        return user;
    }
}
