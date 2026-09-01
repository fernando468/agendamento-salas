package com.app.backend.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Sala extends BaseEntity {
    @Column(name = "nome", unique = true, length = 100, nullable = false)
    private String nome;

    @Column(name = "capacidade", nullable = false)
    private Long capacidade;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo;

    @OneToMany(mappedBy = "sala")
    private List<Reserva> listaReserva = new ArrayList<>();

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(Long capacidade) {
        this.capacidade = capacidade;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public List<Reserva> getListaReserva() {
        return listaReserva;
    }

    public void setListaReserva(List<Reserva> listaReserva) {
        this.listaReserva = listaReserva;
    }
}
