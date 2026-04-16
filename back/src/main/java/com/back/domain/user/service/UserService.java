package com.back.domain.user.service;

import com.back.domain.user.dto.response.UserResponse;
import com.back.domain.user.repository.UserRepository;
import com.back.global.exception.ErrorCode;
import com.back.global.exception.ErrorException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getUserInfo(Long userId) {
        return userRepository.findById(userId)
                .map(UserResponse::from)
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));
    }
}
