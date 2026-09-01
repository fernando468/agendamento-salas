package com.app.backend.mappers;

import com.app.backend.dtos.requests.SalaRequestDTO;
import com.app.backend.dtos.responses.SalaResponseDTO;
import com.app.backend.entities.Sala;
import jakarta.annotation.Nullable;

import java.util.List;

public final class SalaMapper {

    private SalaMapper() { }

    public static Sala toEntity(SalaRequestDTO dto){
        if (dto == null) return null;
        Sala sala = new Sala();
        sala.setNome(dto.nome());
        sala.setCapacidade(dto.capacidade());
        sala.setAtivo(true);
        return sala;
    }

    public static SalaResponseDTO toResponseDTO(Sala sala){
        if (sala == null) return null;
        return new SalaResponseDTO(sala.getId(), sala.getNome(), sala.getCapacidade());
    }

    public static SalaResponseDTO toResponseDto(Sala sala){
        return toResponseDTO(sala);
    }

    public static List<SalaResponseDTO> toResponseDTOList(List<Sala> salas){
        if (salas == null) return null;
        return salas.stream()
                .map(SalaMapper::toResponseDTO)
                .toList();
    }

    public static List<SalaResponseDTO> toResponseDtoList(List<Sala> salas){
        return toResponseDTOList(salas);
    }

    public static Sala updateEntityFromRequest(Sala sala, SalaRequestDTO dto){
        if (sala == null || dto == null) return null;
        sala.setNome(dto.nome());
        sala.setCapacidade(dto.capacidade());
        return sala;
    }
}
