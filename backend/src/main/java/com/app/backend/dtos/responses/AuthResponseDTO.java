package com.app.backend.dtos.responses;

public record AuthResponseDTO(
        String token,
        String tipo,
        String email,
        String nome
) {
}
