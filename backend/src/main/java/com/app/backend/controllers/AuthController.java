package com.app.backend.controllers;

import com.app.backend.dtos.requests.LoginRequestDTO;
import com.app.backend.dtos.requests.UsuarioRequestDTO;
import com.app.backend.dtos.responses.AuthResponseDTO;
import com.app.backend.dtos.responses.UsuarioResponseDTO;
import com.app.backend.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponseDTO> registrar(@Valid @RequestBody UsuarioRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrar(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.autenticar(request));
    }
}
