package com.back.global.exception;

import lombok.Getter;

// 에러 응답 포맷
@Getter
public class ErrorResponse {

    private final String message;

    private ErrorResponse(String message) {
        this.message = message;
    }

    public static ErrorResponse of(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.getMessage());
    }

    public static ErrorResponse of(ErrorCode errorCode, String message) {
        return new ErrorResponse(message);
    }
}
