package com.app.backend.dtos.requests;

import jakarta.validation.constraints.*;

public record SalaRequestDTO(
        @NotBlank(message = "O campo nome não pode ser nulo")
        @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
        String nome,

        @NotNull(message = "O campo capacidade não pode ser nulo")
        @Min(value = 1, message = "A capacidade mínima é de 1 pessoa")
        @Max(value = 100, message = "A capacidade máxima é de 100 pessoas")
        Long capacidade
) {
}
