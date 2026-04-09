package com.back.global.exception;

import lombok.Getter;

// 커스텀 예외
@Getter
public class ErrorException extends RuntimeException {

    private final ErrorCode errorCode;

    public ErrorException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
