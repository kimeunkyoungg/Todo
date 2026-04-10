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
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public void signup(SignupRequest request) {
        validateDuplicateEmail(request.email());
        userRepository.save(buildUser(request));
    }

    public TokenResponse login(LoginRequest request) {
        CustomUserDetails userDetails = authenticate(request.email(), request.password());
        return issueToken(userDetails);
    }

    public void logout(String accessToken) {
        // 블랙리스트 미적용 — 클라이언트에서 토큰 삭제로 처리
        // Redis 도입 시 여기에 추가: tokenBlacklistService.addToBlacklist(accessToken)
    }

    // ───────────────────────── 내부 메서드 ─────────────────────────

    private void validateDuplicateEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new ErrorException(ErrorCode.DUPLICATE_EMAIL);
        }
    }

    private User buildUser(SignupRequest request) {
        return User.builder()
                .email(request.email())
                .name(request.name())
                .password(passwordEncoder.encode(request.password()))
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
        } catch (InternalAuthenticationServiceException e) {
            if (e.getCause() instanceof ErrorException cause) {
                throw cause;
            }
            throw new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR);
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
