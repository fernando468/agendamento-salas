package com.app.backend.mappers;

import com.app.backend.dtos.requests.ReservaRequestDTO;
import com.app.backend.dtos.responses.ReservaResponseDTO;
import com.app.backend.dtos.responses.TotalAgrupadoResponseDTO;
import com.app.backend.entities.Reserva;
import com.app.backend.entities.Sala;
import com.app.backend.entities.Usuario;
import com.app.backend.enums.StatusReserva;

import java.util.List;
import java.util.stream.Collectors;

public final class ReservaMapper {

    private ReservaMapper() { }

    public static Reserva toEntity(ReservaRequestDTO dto, Sala sala, Usuario usuario) {
        Reserva reserva = new Reserva();
        reserva.setHoraInicio(dto.horaInicio());
        reserva.setHoraFim(dto.horaFim());
        reserva.setMotivo(dto.motivo());
        reserva.setData(dto.data());
        reserva.setSala(sala);
        reserva.setUsuario(usuario);
        reserva.setAtivo(true);
        reserva.setStatus(StatusReserva.CONFIRMADA);
        return reserva;
    }

    public static ReservaResponseDTO toResponseDTO(Reserva reserva, Boolean minhaReserva) {
        return new ReservaResponseDTO(
                reserva.getId(),
                SalaMapper.toResponseDTO(reserva.getSala()),
                reserva.getData(),
                reserva.getHoraInicio(),
                reserva.getHoraFim(),
                reserva.getMotivo(),
                reserva.getStatus(),
                reserva.getUsuario().getNome(),
                reserva.getAtivo(),
                minhaReserva
        );
    }

    public static List<ReservaResponseDTO> toResponseDTOList(List<Reserva> reservas, Long usuarioId) {
        if (reservas == null) return null;
        return reservas.stream()
                .map(reserva -> ReservaMapper.toResponseDTO(reserva, usuarioId.equals(reserva.getUsuario().getId())))
                .toList();
    }

    public static Reserva updateEntityFromRequest(Reserva reserva, ReservaRequestDTO dto) {
        reserva.setData(dto.data());
        reserva.setHoraInicio(dto.horaInicio());
        reserva.setHoraFim(dto.horaFim());
        reserva.setMotivo(dto.motivo());
        return reserva;
    }

}
