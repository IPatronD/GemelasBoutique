package com.example.demo.repository;

import com.example.demo.models.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Long> {

    // Buscar rol por nombre
    Optional<Rol> findByNombre(String nombre);

    // Verificar rol repetido
    boolean existsByNombre(String nombre);
}