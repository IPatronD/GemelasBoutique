package com.example.demo.repository;

import com.example.demo.models.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long> {

    // Buscar método de pago por nombre
    Optional<MetodoPago> findByNombre(String nombre);

    // Verificar nombre repetido
    boolean existsByNombre(String nombre);
}