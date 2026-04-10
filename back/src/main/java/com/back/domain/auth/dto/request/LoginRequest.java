package com.back.domain.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "사용자 로그인 요청 DTO")
public record LoginRequest(

        @Schema(description = "사용자 이메일", example = "user1@test.com")
        @NotBlank(message = "이메일을 입력해주세요.")
        @Email(message = "유효한 이메일 형식을 입력해주세요.")
        @Size(max = 100)
        String email,

        @Schema(description = "사용자 비밀번호", example = "password1234")
        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Size(min = 8, max = 30, message = "비밀번호는 8자 이상 30자 이하로 입력해주세요.")
        String password
) {
}
