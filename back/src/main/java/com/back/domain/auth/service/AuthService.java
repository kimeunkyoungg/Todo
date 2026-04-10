package com.back.domain.auth.service;

import com.back.domain.auth.dto.request.LoginRequest;
import com.back.domain.auth.dto.request.SignupRequest;
import com.back.domain.auth.dto.response.TokenResponse;
import com.back.domain.user.entity.User;
import com.back.domain.user.repository.UserRepository;
import com.back.global.exception.ErrorCode;
import com.back.global.exception.ErrorException;
import com.back.global.security.CustomUserDetails;
import com.back.global.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public void signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ErrorException(ErrorCode.DUPLICATE_EMAIL);
        }
        User user = buildUser(request);
        userRepository.save(user);
    }

    public TokenResponse login(LoginRequest request) {
        CustomUserDetails userDetails = authenticate(request.email(), request.password());
        return issueToken(userDetails);
    }

    private User buildUser(SignupRequest request) {
        return User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .name(request.name())
                .build();
    }

    private CustomUserDetails authenticate(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            return (CustomUserDetails) authentication.getPrincipal();
        } catch (BadCredentialsException e) {
            throw new ErrorException(ErrorCode.INVALID_PASSWORD);
        }
    }

    private TokenResponse issueToken(CustomUserDetails userDetails) {
        String accessToken = jwtProvider.createAccessToken(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getRole()
        );

        String refreshToken = jwtProvider.createRefreshToken(userDetails.getUsername());
        return TokenResponse.of(accessToken, refreshToken);
    }



}
