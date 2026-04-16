package com.back.domain.user.controller;

import com.back.domain.user.dto.response.UserResponse;
import com.back.domain.user.service.UserService;
import com.back.global.response.ApiResponse;
import com.back.global.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserResponse> getMyInfo(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ){
        return ApiResponse.ok(userService.getUserInfo(customUserDetails.getId()));
    }
}
