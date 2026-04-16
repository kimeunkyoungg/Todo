package com.back.domain.user.dto.response;

import com.back.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "사용자 응답 DTO")
public record UserResponse(
        @Schema(description = "사용자 이메일")
        String email,

        @Schema(description = "사용자 이름")
        String name
) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getEmail(), user.getName());
    }
}
