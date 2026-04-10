package com.back.global.exception;

import lombok.Getter;

// 에러 코드 enum
@Getter
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "잘못된 입력값입니다."),
    INTERNAL_SERVER_ERROR(500, "서버 오류가 발생했습니다."),

    // Auth
    UNAUTHORIZED(401, "인증이 필요합니다."),
    FORBIDDEN(403, "접근 권한이 없습니다."),
    INVALID_TOKEN(401, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(401, "만료된 토큰입니다."),

    // User
    USER_NOT_FOUND(404, "존재하지 않는 사용자입니다."),
    DUPLICATE_EMAIL(409, "이미 사용 중인 이메일입니다."),
    INVALID_PASSWORD(401, "비밀번호가 올바르지 않습니다."),

    // Workspace
    WORKSPACE_NOT_FOUND(404, "워크스페이스를 찾을 수 없습니다."),
    WORKSPACE_ACCESS_DENIED(403, "워크스페이스 접근 권한이 없습니다."),
    ALREADY_WORKSPACE_MEMBER(409, "이미 워크스페이스 멤버입니다."),

    // Todo
    TODO_NOT_FOUND(404, "할 일을 찾을 수 없습니다."),
    TODO_ACCESS_DENIED(403, "할 일 접근 권한이 없습니다.");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
