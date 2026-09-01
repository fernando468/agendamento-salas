package com.app.backend.repositories;

import com.app.backend.dtos.responses.TotalAgrupadoResponseDTO;
import com.app.backend.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("""
        SELECT r
        FROM Reserva r
        WHERE r.data = :data
        AND r.horaInicio < :horaFim
        AND r.horaFim > :horaInicio
        AND r.ativo = true
    """)
    Optional<Reserva> reservaNaDataEHorario(LocalDate data, LocalTime horaInicio, LocalTime horaFim);

    @Query("""
        SELECT r
        FROM Reserva r
        WHERE r.data = :dataAtual
        AND r.usuario.id = :usuarioId
    """)
    List<Reserva> buscarTodasReservasDoDiaPorUsuarioId(LocalDate dataAtual, Long usuarioId);

    @Query(value = """
        SELECT
            SUM(CASE WHEN r.status = 'CONFIRMADA' THEN 1 ELSE 0 END) AS totalConfirmada,
            SUM(CASE WHEN r.status = 'CANCELADA' THEN 1 ELSE 0 END) AS totalCancelada
        FROM reserva r
        WHERE r.usuario_id = :usuarioId
    """, nativeQuery = true)
    TotalAgrupadoResponseDTO calcularTotalDeReservaPorUsuarioId(Long usuarioId);

    List<Reserva> findAllByOrderByCriadoEmDesc();
}
