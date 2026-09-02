package com.app.backend.controllers;

import com.app.backend.dtos.requests.SalaRequestDTO;
import com.app.backend.dtos.responses.SalaResponseDTO;
import com.app.backend.handler.NotFoundException;
import com.app.backend.services.SalaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salas")
public class SalaController {
    private final SalaService salaService;

    public SalaController(SalaService salaService) {
        this.salaService = salaService;
    }

    @PostMapping
    public ResponseEntity<SalaResponseDTO> criar(@Valid @RequestBody SalaRequestDTO salaRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.salaService.criar(salaRequestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalaResponseDTO> atualizarPorId(@PathVariable Long id, @Valid @RequestBody SalaRequestDTO salaRequestDTO) throws NotFoundException {
        return ResponseEntity.ok(this.salaService.atualizarPorId(id, salaRequestDTO));
    }

    @GetMapping("/ativas")
    public ResponseEntity<List<SalaResponseDTO>> listarTodosAtivas() {
        return ResponseEntity.ok(this.salaService.listarTodosAtivas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalaResponseDTO> buscarPorId(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(this.salaService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPorId(@PathVariable Long id) throws NotFoundException {
        this.salaService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }

}
