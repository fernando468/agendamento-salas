package com.app.backend.services;

import com.app.backend.dtos.requests.ReservaRequestDTO;
import com.app.backend.dtos.responses.ReservaResponseDTO;
import com.app.backend.dtos.responses.TotalAgrupadoResponseDTO;
import com.app.backend.entities.Reserva;
import com.app.backend.entities.Sala;
import com.app.backend.entities.Usuario;
import com.app.backend.enums.StatusReserva;
import com.app.backend.handler.ConflictException;
import com.app.backend.handler.NotFoundException;
import com.app.backend.handler.UnauthorizedException;
import com.app.backend.mappers.ReservaMapper;
import com.app.backend.repositories.ReservaRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;
    private final AuthService authService;
    private final SalaService salaService;

    public ReservaService(ReservaRepository reservaRepository, AuthService authService, SalaService salaService) {
        this.reservaRepository = reservaRepository;
        this.authService = authService;
        this.salaService = salaService;
    }

    @Transactional
    public ReservaResponseDTO criar(ReservaRequestDTO reservaRequestDTO) throws NotFoundException, UnauthorizedException, ConflictException {
        verificarSePermiteCriarReserva(reservaRequestDTO);
        Usuario usuarioLogado = authService.getUsuarioAutenticado();
        Sala sala = salaService.findById(reservaRequestDTO.salaId());

        Reserva reserva = ReservaMapper.toEntity(reservaRequestDTO, sala, usuarioLogado);
        Reserva reservaSalva = reservaRepository.save(reserva);
        Boolean minhaReserva = isMinhaReserva(reserva);
        return ReservaMapper.toResponseDTO(reservaSalva, minhaReserva);
    }

    public Boolean isPermiteCriarReserva(ReservaRequestDTO reservaRequestDTO) {
        Optional<Reserva> reserva = reservaRepository.reservaNaDataEHorario(
                reservaRequestDTO.data(),
                reservaRequestDTO.horaInicio(),
                reservaRequestDTO.horaFim()
        );
        return reserva.isEmpty() || reserva.get().getId().equals(reservaRequestDTO.salaId());
    }

    @Transactional
    public ReservaResponseDTO atualizarPorId(Long id, ReservaRequestDTO reservaRequestDTO) throws NotFoundException, ConflictException, UnauthorizedException {
        verificarSePermiteAlterarReserva(reservaRequestDTO);
        Reserva reservaExistente = findById(id);
        Reserva reserva = ReservaMapper.updateEntityFromRequest(reservaExistente, reservaRequestDTO);
        Reserva reservaAtualizada = reservaRepository.save(reserva);
        Boolean minhaReserva = isMinhaReserva(reserva);
        return ReservaMapper.toResponseDTO(reservaAtualizada, minhaReserva);
    }

    private void verificarSePermiteCriarReserva(ReservaRequestDTO reservaRequestDTO) throws ConflictException {
        Boolean permiteCriarReserva = isPermiteCriarReserva(reservaRequestDTO);
        if (permiteCriarReserva) {
            return;
        }
        throw new ConflictException("Não é possível criar a reserva. Já existe uma reserva para a mesma data e horário.");
    }

    private void verificarSePermiteAlterarReserva(ReservaRequestDTO reservaRequestDTO) throws ConflictException {
        Boolean permiteAtualizarReserva = isPermiteAlterarReserva(reservaRequestDTO);
        if (permiteAtualizarReserva) {
            return;
        }
        throw new ConflictException("Não é possível atualizar a reserva. Já existe uma reserva para a mesma data e horário.");
    }

    public Boolean isPermiteAlterarReserva(ReservaRequestDTO reservaRequestDTO) {
        Optional<Reserva> reserva = reservaRepository.reservaNaDataEHorario(
                reservaRequestDTO.data(),
                reservaRequestDTO.horaInicio(),
                reservaRequestDTO.horaFim()
        );
        return reserva.isEmpty() || reserva.get().getId().equals(reservaRequestDTO.salaId());
    }

    private Reserva findById(Long id) throws NotFoundException {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Reserva não encontrada com o ID: " + id));
    }

    public ReservaResponseDTO buscarPorId(Long id) throws NotFoundException, UnauthorizedException {
        Reserva reserva = findById(id);
        Boolean minhaReserva = isMinhaReserva(reserva);
        return ReservaMapper.toResponseDTO(reserva, minhaReserva);
    }

    public List<ReservaResponseDTO> buscarTodos() throws UnauthorizedException {
        List<Reserva> reservas = reservaRepository.findAllByOrderByCriadoEmDesc();
        return ReservaMapper.toResponseDTOList(reservas, authService.getUsuarioAutenticado().getId());
    }

    @Transactional
    public ReservaResponseDTO cancelarPorId(Long id) throws NotFoundException, UnauthorizedException {
        Reserva reserva = findById(id);
        reserva.setAtivo(false);
        reserva.setStatus(StatusReserva.CANCELADA);
        reservaRepository.save(reserva);
        return ReservaMapper.toResponseDTO(reserva, isMinhaReserva(reserva));
    }

    public Boolean isMinhaReserva(Reserva reserva) throws UnauthorizedException {
        return authService.getUsuarioAutenticado().getId().equals(reserva.getUsuario().getId());
    }

    public List<ReservaResponseDTO> buscarTodasReservasDoUsuarioNoDia() throws UnauthorizedException {
        Long usuarioId = authService.getUsuarioAutenticado().getId();
        List<Reserva> listaReserva = reservaRepository.buscarTodasReservasDoDiaPorUsuarioId(LocalDate.now(), usuarioId);
        return ReservaMapper.toResponseDTOList(listaReserva, usuarioId);
    }

    public TotalAgrupadoResponseDTO calcularTotaisReservasDoUsuario() throws UnauthorizedException {
        Long usuarioId = authService.getUsuarioAutenticado().getId();

        return reservaRepository.calcularTotalDeReservaPorUsuarioId(usuarioId);
    }
}
