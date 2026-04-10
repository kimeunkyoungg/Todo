package com.back.domain.auth.controller;

import com.back.domain.auth.dto.request.LoginRequest;
import com.back.domain.auth.dto.request.SignupRequest;
import com.back.domain.auth.dto.response.TokenResponse;
import com.back.domain.auth.service.AuthService;
import com.back.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth API", description = "인증 API")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "사용자 로그인")
    @PostMapping("/login")
    public ApiResponse<TokenResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        return ApiResponse.ok(authService.login(request));
    }

    @Operation(summary = "사용자 회원가입")
    @PostMapping("/signup")
    public ApiResponse<Void> signup(
            @Valid @RequestBody SignupRequest request

    ) {
        authService.signup(request);
        return ApiResponse.ok();
    }
}
