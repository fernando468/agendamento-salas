package com.app.backend.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
        String nome,

        @NotBlank(message = "O email é obrigatório")
        @Email(message = "Informe um email válido")
        @Size(max = 100, message = "O email deve ter no máximo 100 caracteres")
        String email,

        @NotBlank(message = "O repitaEmail é obrigatório")
        @Email(message = "Informe um repitaEmail válido")
        @Size(max = 100, message = "O repitaEmail deve ter no máximo 100 caracteres")
        String repitaEmail,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, max = 16, message = "A senha deve ter no mínimo 6 caracteres")
        String senha,

        @NotBlank(message = "O repitaSenha é obrigatório")
        @Size(min = 6, max = 16, message = "O repitaSenha deve ter no mínimo 6 caracteres")
        String repitaSenha
) {
}
