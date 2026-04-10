package com.back.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String JWT_SCHEME_NAME = "JWT";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info().title("Todo API")
                .description("Todo API 명세서")
                .version("v1.0"));
    }

    private SecurityRequirement securityRequirement() {
        return new SecurityRequirement().addList(JWT_SCHEME_NAME);
    }

    private Components securityComponents() {
        return new Components()
                .addSecuritySchemes(JWT_SCHEME_NAME, new SecurityScheme()
                        .name(JWT_SCHEME_NAME)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT"));
    }
}
