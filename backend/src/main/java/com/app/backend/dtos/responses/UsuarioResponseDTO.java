package com.app.backend.dtos.responses;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email
) {
}
