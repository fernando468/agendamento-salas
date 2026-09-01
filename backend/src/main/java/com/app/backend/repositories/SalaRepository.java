package com.app.backend.repositories;

import com.app.backend.entities.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {
    List<Sala> findByAtivoTrue();
}
