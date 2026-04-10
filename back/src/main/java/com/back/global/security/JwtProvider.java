package com.back.global.security;

import com.back.domain.user.entity.UserSystemRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
@Slf4j
public class JwtProvider {

    private static final String CLAIM_ROLE = "role";

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expiration")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration")
    private long refreshTokenExpiration;

    // === 토큰 생성 ==

    public String createAccessToken(String email, UserSystemRole role) {
        return buildToken(email, role.name(), accessTokenExpiration);
    }

    public String createRefreshToken(String email) {
        return buildToken(email, null, refreshTokenExpiration);
    }

    private String buildToken(String email, String role, long expiration) {
        Date now = new Date();

        JwtBuilder builder = Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration))
                .signWith(getSigningKey());

        if (role != null) {
            builder.claim(CLAIM_ROLE, role);
        }

        return builder.compact();
    }


    // === 토큰 검증 ===
    public boolean validateToken(String token) {
        try {
            getClaim(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("만료된 JWT: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("지원하지 않는 JWT: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.warn("잘못된 형식의 JWT: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("빈 JWT 클레임: {}", e.getMessage());
        }
        return false;
    }

    // === 클레임 추출 ===

    public String getEmail(String token) {
        return getClaim(token).getSubject();
    }

    public UserSystemRole getRole(String token) {
        String role = getClaim(token).get(CLAIM_ROLE, String.class);
        return UserSystemRole.valueOf(role);
    }

    // === 내부 메서드 ===

    private Claims getClaim(String Token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(Token)
                .getPayload();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
