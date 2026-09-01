package com.app.backend.controllers;

import com.app.backend.entities.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();

        return ResponseEntity.ok(Map.of(
                "id", usuario.getId(),
                "nome", usuario.getNome(),
                "email", usuario.getEmail()
        ));
    }
}
