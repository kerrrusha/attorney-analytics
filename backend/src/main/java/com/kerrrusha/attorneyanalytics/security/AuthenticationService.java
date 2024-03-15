package com.kerrrusha.attorneyanalytics.security;

import com.kerrrusha.attorneyanalytics.dto.auth.JwtAuthenticationResponse;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserLoginRequestDto;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse authenticate(UserLoginRequestDto request) {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getLogin(),
                request.getPassword()
        ));

        UserDetails user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Can't find user by login: " + request.getLogin()));

        String jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }
}
