package com.app.backend.dtos.responses;

import com.app.backend.enums.StatusReserva;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservaResponseDTO(
        Long id,
        SalaResponseDTO sala,
        LocalDate data,
        LocalTime horaInicio,
        LocalTime horaFim,
        String motivo,
        StatusReserva statusReserva,
        String nomeQuemReservou,
        Boolean ativo,
        Boolean minhaReserva
) {
}
