package com.back.global.security;

import com.back.domain.user.entity.User;
import com.back.domain.user.entity.UserSystemRole;
import lombok.Getter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long id;
    private final String email;
    private final String password;
    private final UserSystemRole role;

    // 로그인 시 - DB에서 조회한 User 엔티티로 생성
    public CustomUserDetails(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.role = user.getRole();
    }

    // 이후 요청 시 - JWT 클레임으로 생성 (DB 조회 없도록 함)
    public CustomUserDetails(Long id, String email, UserSystemRole role) {
        this.id = id;
        this.email = email;
        this.password = null;
        this.role = role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
