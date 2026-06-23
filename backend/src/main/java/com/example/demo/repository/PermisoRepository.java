package com.example.demo.repository;

import com.example.demo.models.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermisoRepository extends JpaRepository<Permiso, Long> {

    // Buscar permiso por nombre
    Optional<Permiso> findByNombre(String nombre);

    // Verificar permiso repetido
    boolean existsByNombre(String nombre);
}