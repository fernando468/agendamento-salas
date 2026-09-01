package com.app.backend.controllers;

import com.app.backend.dtos.requests.ReservaRequestDTO;
import com.app.backend.dtos.responses.ReservaResponseDTO;
import com.app.backend.dtos.responses.TotalAgrupadoResponseDTO;
import com.app.backend.services.ReservaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ResponseEntity<ReservaResponseDTO> criar(@Valid @RequestBody ReservaRequestDTO reservaRequestDTO) {
        ReservaResponseDTO reservaResponseDTO = reservaService.criar(reservaRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> atualizarPorId(@PathVariable Long id, @Valid @RequestBody ReservaRequestDTO reservaRequestDTO) {
        ReservaResponseDTO reservaResponseDTO = reservaService.atualizarPorId(id, reservaRequestDTO);
        return ResponseEntity.ok(reservaResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> buscarPorId(@PathVariable Long id) {
        ReservaResponseDTO reservaResponseDTO = reservaService.buscarPorId(id);
        return ResponseEntity.ok(reservaResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<ReservaResponseDTO>> buscarTodos() {
        return ResponseEntity.ok(reservaService.buscarTodos());
    }

    @GetMapping("/minhas-reservas")
    public ResponseEntity<List<ReservaResponseDTO>> buscarTodasReservasDoUsuarioNoDia() {
        return ResponseEntity.ok(reservaService.buscarTodasReservasDoUsuarioNoDia());
    }

    @GetMapping("/totais-reservas")
    public ResponseEntity<TotalAgrupadoResponseDTO> calcularTotaisReservasDoUsuario() {
        return ResponseEntity.ok(reservaService.calcularTotaisReservasDoUsuario());
    }

    @PutMapping("/cancelar/{id}")
    public ResponseEntity<ReservaResponseDTO> cancelarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.cancelarPorId(id));
    }
}
