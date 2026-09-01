package com.app.backend.config;

import com.app.backend.entities.Usuario;
import com.app.backend.services.CustomUserDetailsService;
import com.app.backend.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService customUserDetailsService) {
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        if (!jwtService.isTokenValido(token)) {
            writeErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized",
                    "Token inválido ou expirado.",
                    List.of());
            return;
        }

        String email = jwtService.extrairEmail(token);
        Usuario usuario = (Usuario) customUserDetailsService.loadUserByUsername(email);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                usuario,
                null,
                usuario.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

    private void writeErrorResponse(
            HttpServletResponse response,
            HttpServletRequest request,
            int status,
            String error,
            String message,
            List<String> details
    ) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String detailsJson = details.isEmpty()
                ? "[]"
                : details.stream()
                .map(this::escapeJson)
                .map(value -> "\"" + value + "\"")
                .collect(Collectors.joining(",", "[", "]"));

        String payload = String.format(
                "{\"timestamp\":\"%s\",\"status\":%d,\"error\":\"%s\",\"message\":\"%s\",\"path\":\"%s\",\"details\":%s}",
                LocalDateTime.now(),
                status,
                escapeJson(error),
                escapeJson(message),
                escapeJson(request.getRequestURI()),
                detailsJson
        );

        response.getWriter().write(payload);
    }

    private String escapeJson(String value) {
        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
