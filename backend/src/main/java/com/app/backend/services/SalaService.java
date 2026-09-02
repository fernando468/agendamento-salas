package com.app.backend.services;

import com.app.backend.dtos.requests.SalaRequestDTO;
import com.app.backend.dtos.responses.SalaResponseDTO;
import com.app.backend.entities.Sala;
import com.app.backend.handler.NotFoundException;
import com.app.backend.mappers.SalaMapper;
import com.app.backend.repositories.SalaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaService {
    private final SalaRepository salaRepository;

    public SalaService(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    @Transactional
    public SalaResponseDTO criar(SalaRequestDTO salaRequestDTO) {
        Sala sala = SalaMapper.toEntity(salaRequestDTO);
        Sala salaSalva = salaRepository.save(sala);
        return SalaMapper.toResponseDTO(salaSalva);
    }

    @Transactional
    public SalaResponseDTO atualizarPorId(Long id, SalaRequestDTO salaRequestDTO) throws NotFoundException {
        Sala existingSala = findById(id);
        Sala sala = SalaMapper.updateEntityFromRequest(existingSala, salaRequestDTO);
        Sala updatedSala = salaRepository.save(sala);
        return SalaMapper.toResponseDTO(updatedSala);
    }

    public List<SalaResponseDTO> listarTodosAtivas() {
        List<Sala> salas = salaRepository.findByAtivoTrue();
        return SalaMapper.toResponseDTOList(salas);
    }

    public SalaResponseDTO buscarPorId(Long id) throws NotFoundException {
        Sala sala = findById(id);
        return SalaMapper.toResponseDTO(sala);
    }

    public Sala findById(Long id) throws NotFoundException {
        return salaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Sala não encontrada com o ID: " + id));
    }

    @Transactional
    public void deletarPorId(Long id) throws NotFoundException {
        Sala sala = findById(id);
        if (sala.getListaReserva().isEmpty()) {
            salaRepository.delete(sala);
            return;
        }
        sala.setAtivo(false);
        salaRepository.save(sala);
    }

}
