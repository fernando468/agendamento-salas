package com.app.backend.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservaRequestDTO(
        @NotNull(message = "O campo data não pode ser nulo")
        LocalDate data,

        @NotNull(message = "O campo horaInicio não pode ser nulo")
        LocalTime horaInicio,

        @NotNull(message = "O campo horaFim não pode ser nulo")
        LocalTime horaFim,

        @NotBlank(message = "O campo motivo não pode ser nulo")
        @Size(max = 100, message = "O campo motivo não pode ter mais de 100 caracteres")
        String motivo,

        @NotNull(message = "O campo salaId não pode ser nulo")
        Long salaId
) {
}
